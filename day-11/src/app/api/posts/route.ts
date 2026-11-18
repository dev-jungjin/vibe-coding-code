import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createPostWithIntegrity } from "@/lib/board-transaction";
import { publicPostSelect, toPublicPostJson } from "@/lib/post-dto";
import { getPrismaOrNull } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function databaseUnavailable() {
  return NextResponse.json(
    { error: "DATABASE_URL 이 없거나 데이터베이스에 연결할 수 없습니다." },
    { status: 503 },
  );
}

export async function GET() {
  const prisma = getPrismaOrNull();
  if (!prisma) {
    return databaseUnavailable();
  }

  try {
    const posts = await prisma.post.findMany({
      where: { isHidden: false },
      orderBy: { createdAt: "desc" },
      select: publicPostSelect,
    });
    return NextResponse.json(posts.map(toPublicPostJson));
  } catch (error) {
    console.error("[GET /api/posts]", error);
    return databaseUnavailable();
  }
}

export async function POST(request: Request) {
  const prisma = getPrismaOrNull();
  if (!prisma) {
    return databaseUnavailable();
  }

  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const title = String(body.title ?? "").trim();
    const content = String(body.content ?? "").trim();
    const authorName = String(body.authorName ?? "").trim() || user.email || "익명";

    if (!title || !content) {
      return NextResponse.json(
        { error: "제목과 본문은 필수입니다." },
        { status: 400 },
      );
    }

    const post = await createPostWithIntegrity(prisma, {
      title,
      content,
      authorName,
      authorId: user.id,
      authorEmail: user.email ?? null,
    });

    revalidatePath("/");
    revalidatePath(`/posts/${post.id}`);
    return NextResponse.json(toPublicPostJson(post), { status: 201 });
  } catch (error) {
    console.error("[POST /api/posts]", error);
    return NextResponse.json({ error: "글을 저장하지 못했습니다." }, { status: 500 });
  }
}
