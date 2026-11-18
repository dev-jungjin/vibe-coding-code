import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createPostWithIntegrity, SimulatedTransactionError } from "@/lib/board-transaction";
import { hashPassword } from "@/lib/password";
import { toPublicPostJson } from "@/lib/post-dto";
import { getPrismaOrNull } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const prisma = getPrismaOrNull();
  if (!prisma) {
    return NextResponse.json(
      { error: "DATABASE_URL 이 없거나 데이터베이스에 연결할 수 없습니다." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const title = String(body.title ?? "").trim();
    const content = String(body.content ?? "").trim();
    const authorName = String(body.authorName ?? "").trim();
    const simulateError = Boolean(body.simulateError);

    if (!title || !content || !authorName) {
      return NextResponse.json(
        { error: "title, content, authorName 은 필수입니다." },
        { status: 400 },
      );
    }

    const before = await prisma.boardStat.findUnique({ where: { id: "singleton" } });

    const post = await createPostWithIntegrity(
      prisma,
      {
        title,
        content,
        authorName,
        passwordHash: hashPassword("transaction-lab"),
      },
      { simulateError },
    );

    const after = await prisma.boardStat.findUnique({ where: { id: "singleton" } });
    revalidatePath("/");
    revalidatePath("/transaction-lab");

    return NextResponse.json({
      ok: true,
      rolledBack: false,
      post: toPublicPostJson(post),
      before,
      after,
    });
  } catch (error) {
    if (error instanceof SimulatedTransactionError) {
      const after = await prisma.boardStat.findUnique({ where: { id: "singleton" } });
      revalidatePath("/");
      revalidatePath("/transaction-lab");
      return NextResponse.json({
        ok: false,
        rolledBack: true,
        message: "트랜잭션 중간 오류를 시뮬레이션했습니다. 글, 통계, 감사 로그가 모두 롤백되어야 합니다.",
        after,
      });
    }

    console.error("[POST /api/transaction-demo]", error);
    return NextResponse.json({ error: "트랜잭션 실습을 실행하지 못했습니다." }, { status: 500 });
  }
}
