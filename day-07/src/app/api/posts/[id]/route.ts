import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { deletePostWithIntegrity } from "@/lib/board-transaction";
import { verifyPassword } from "@/lib/password";
import { publicPostSelect, toPublicPostJson } from "@/lib/post-dto";
import { getPrismaOrNull } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function databaseUnavailable() {
  return NextResponse.json(
    { error: "DATABASE_URL 이 없거나 데이터베이스에 연결할 수 없습니다." },
    { status: 503 },
  );
}

function isNotFound(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025";
}

async function readJsonBody(request: Request): Promise<Record<string, unknown>> {
  try {
    return (await request.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const prisma = getPrismaOrNull();
  if (!prisma) {
    return databaseUnavailable();
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      select: publicPostSelect,
    });

    if (!post) {
      return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json(toPublicPostJson(post));
  } catch (error) {
    console.error("[GET /api/posts/:id]", error);
    return databaseUnavailable();
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const prisma = getPrismaOrNull();
  if (!prisma) {
    return databaseUnavailable();
  }

  try {
    const body = await readJsonBody(request);
    const password = String(body.password ?? "");
    const title = body.title === undefined ? undefined : String(body.title).trim();
    const content = body.content === undefined ? undefined : String(body.content).trim();

    if (!password) {
      return NextResponse.json({ error: "비밀번호가 필요합니다." }, { status: 401 });
    }

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 });
    }

    if (!verifyPassword(password, existing.passwordHash)) {
      return NextResponse.json({ error: "비밀번호가 일치하지 않습니다." }, { status: 403 });
    }

    if ((title !== undefined && !title) || (content !== undefined && !content)) {
      return NextResponse.json({ error: "제목과 본문은 비울 수 없습니다." }, { status: 400 });
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(content !== undefined ? { content } : {}),
      },
      select: publicPostSelect,
    });

    revalidatePath("/");
    revalidatePath(`/posts/${id}`);
    revalidatePath(`/posts/${id}/edit`);
    return NextResponse.json(toPublicPostJson(post));
  } catch (error) {
    if (isNotFound(error)) {
      return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 });
    }
    console.error("[PATCH /api/posts/:id]", error);
    return NextResponse.json({ error: "글을 수정하지 못했습니다." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const prisma = getPrismaOrNull();
  if (!prisma) {
    return databaseUnavailable();
  }

  try {
    const body = await readJsonBody(request);
    const password = String(body.password ?? "");

    if (!password) {
      return NextResponse.json({ error: "비밀번호가 필요합니다." }, { status: 401 });
    }

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 });
    }

    if (!verifyPassword(password, existing.passwordHash)) {
      return NextResponse.json({ error: "비밀번호가 일치하지 않습니다." }, { status: 403 });
    }

    await deletePostWithIntegrity(prisma, existing);
    revalidatePath("/");
    revalidatePath(`/posts/${id}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (isNotFound(error)) {
      return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 });
    }
    console.error("[DELETE /api/posts/:id]", error);
    return NextResponse.json({ error: "글을 삭제하지 못했습니다." }, { status: 500 });
  }
}
