import { NextResponse } from "next/server";
import { deletePost, getPost, updatePost } from "@/lib/mockStore";
import { parseUpdatePostInput } from "@/lib/validatePost";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const post = getPost(id);

  if (!post) {
    return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "올바른 JSON 본문이 필요합니다." },
      { status: 400 },
    );
  }

  const parsed = parseUpdatePostInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const post = updatePost(id, parsed.data);
  if (!post) {
    return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const removed = deletePost(id);

  if (!removed) {
    return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
