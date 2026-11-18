import { NextResponse } from "next/server";
import { createPost, listPosts } from "@/lib/mockStore";
import { parseCreatePostInput } from "@/lib/validatePost";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ posts: listPosts() });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "올바른 JSON 본문이 필요합니다." },
      { status: 400 },
    );
  }

  const parsed = parseCreatePostInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const post = createPost(parsed.data);
  return NextResponse.json({ post }, { status: 201 });
}
