"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostForm, type PostFormValues } from "@/components/PostForm";
import type { Post } from "@/types/post";

type PostEditorProps = {
  post: Post;
};

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  async function handleUpdate(values: PostFormValues) {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      throw new Error(payload.error ?? "글을 수정하지 못했습니다.");
    }

    setMode("view");
    router.refresh();
  }

  async function handleDelete() {
    const confirmed = window.confirm("이 글을 삭제할까요? 삭제 후에는 목록에서 사라집니다.");
    if (!confirmed) {
      return;
    }

    setError("");
    setDeleting(true);

    const response = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(payload.error ?? "글을 삭제하지 못했습니다.");
      setDeleting(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  if (mode === "edit") {
    return (
      <section className="rounded-card border border-neutral-200 bg-white p-5 md:p-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold text-primary-dark">글 수정</h2>
          <button
            type="button"
            onClick={() => setMode("view")}
            className="text-sm font-bold text-neutral-600 hover:text-primary-dark"
          >
            취소
          </button>
        </div>
        <PostForm submitLabel="수정 내용 저장" initialPost={post} onSubmit={handleUpdate} />
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("edit")}
          className="rounded-pill bg-primary-dark px-4 py-2.5 text-sm font-bold text-white hover:bg-[#12171f]"
        >
          수정하기
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-pill border border-neutral-300 bg-white px-4 py-2.5 text-sm font-bold text-primary-dark hover:bg-neutral-50 disabled:opacity-60"
        >
          {deleting ? "삭제하는 중..." : "삭제하기"}
        </button>
      </div>
      {error ? (
        <p className="text-sm font-semibold text-[#9b2c2c]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
