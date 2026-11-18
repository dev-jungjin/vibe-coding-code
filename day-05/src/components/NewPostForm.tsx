"use client";

import { useRouter } from "next/navigation";
import { PostForm, type PostFormValues } from "@/components/PostForm";

export function NewPostForm() {
  const router = useRouter();

  async function handleSubmit(values: PostFormValues) {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as { post?: { id: string }; error?: string };

    if (!response.ok || !payload.post) {
      throw new Error(payload.error ?? "글을 저장하지 못했습니다.");
    }

    router.push(`/posts/${payload.post.id}`);
    router.refresh();
  }

  return <PostForm submitLabel="글 등록하기" onSubmit={handleSubmit} />;
}
