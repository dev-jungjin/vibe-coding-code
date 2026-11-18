import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSessionUser, requireAdmin } from "@/lib/auth";
import { log } from "@/lib/logger";
import { deletePostWithIntegrity } from "@/lib/board-transaction";
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

export async function PATCH(request: Request, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const admin = await requireAdmin();
  if (!admin) {
    log({ level: "warn", action: "admin.post.hide.forbidden", path: "/api/admin/posts/[id]", userId: user.id });
    return NextResponse.json({ error: "관리자만 글을 숨기거나 공개할 수 있습니다." }, { status: 403 });
  }

  const prisma = getPrismaOrNull();
  if (!prisma) {
    return databaseUnavailable();
  }

  const { id } = await context.params;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 });
    }

    const nextHidden = body.isHidden === undefined ? !existing.isHidden : Boolean(body.isHidden);
    const post = await prisma.post.update({
      where: { id },
      data: { isHidden: nextHidden },
      select: publicPostSelect,
    });

    await prisma.postAuditLog.create({
      data: {
        postId: post.id,
        action: nextHidden ? "HIDE" : "UNHIDE",
        summary: `Admin ${admin.user.email ?? admin.user.id} set isHidden=${nextHidden} on "${post.title}"`,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath(`/posts/${id}`);
    log({
      level: "info",
      action: nextHidden ? "admin.post.hide" : "admin.post.unhide",
      path: `/api/admin/posts/${id}`,
      userId: admin.user.id,
      meta: { postId: id, isHidden: nextHidden },
    });
    return NextResponse.json(toPublicPostJson(post));
  } catch (error) {
    console.error("[PATCH /api/admin/posts/:id]", error);
    return NextResponse.json({ error: "글을 변경하지 못했습니다." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const admin = await requireAdmin();
  if (!admin) {
    log({ level: "warn", action: "admin.post.force_delete.forbidden", path: "/api/admin/posts/[id]", userId: user.id });
    return NextResponse.json({ error: "관리자만 글을 강제 삭제할 수 있습니다." }, { status: 403 });
  }

  const prisma = getPrismaOrNull();
  if (!prisma) {
    return databaseUnavailable();
  }

  const { id } = await context.params;

  try {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 });
    }

    await deletePostWithIntegrity(prisma, existing);
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath(`/posts/${id}`);
    log({
      level: "info",
      action: "admin.post.force_delete",
      path: `/api/admin/posts/${id}`,
      userId: admin.user.id,
      meta: { postId: id },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[DELETE /api/admin/posts/:id]", error);
    return NextResponse.json({ error: "글을 삭제하지 못했습니다." }, { status: 500 });
  }
}
