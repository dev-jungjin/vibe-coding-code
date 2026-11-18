import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/password";
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

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const title = String(body.title ?? "").trim();
    const content = String(body.content ?? "").trim();
    const authorName = String(body.authorName ?? "").trim();
    const password = String(body.password ?? "");

    if (!title || !content || !authorName || !password) {
      return NextResponse.json(
        { error: "제목, 본문, 작성자 이름, 비밀번호는 필수입니다." },
        { status: 400 },
      );
    }

    if (password.length < 4) {
      return NextResponse.json({ error: "비밀번호는 4자 이상이어야 합니다." }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorName,
        passwordHash: hashPassword(password),
      },
      select: publicPostSelect,
    });

    revalidatePath("/");
    revalidatePath(`/posts/${post.id}`);
    return NextResponse.json(toPublicPostJson(post), { status: 201 });
  } catch (error) {
    console.error("[POST /api/posts]", error);
    return NextResponse.json({ error: "글을 저장하지 못했습니다." }, { status: 500 });
  }
}
