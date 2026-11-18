"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type EditPostFormProps = {
  postId: string;
  defaultTitle: string;
  defaultContent: string;
};

export function EditPostForm({ postId, defaultTitle, defaultContent }: EditPostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const payload = (await response.json()) as { error?: string };

      if (response.status === 401) {
        setError(payload.error ?? "로그인이 필요합니다.");
        return;
      }

      if (response.status === 403) {
        setError(payload.error ?? "본인이 작성한 글만 수정할 수 있습니다.");
        return;
      }

      if (!response.ok) {
        setError(payload.error ?? "글을 수정하지 못했습니다.");
        return;
      }

      router.refresh();
      router.push(`/posts/${postId}`);
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="card stack" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="title">제목</label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          maxLength={120}
        />
      </div>
      <div className="field">
        <label htmlFor="content">본문</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
          maxLength={8000}
        />
      </div>
      {error ? <p className="error-text">{error}</p> : null}
      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? "수정 중..." : "수정 저장"}
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => router.push(`/posts/${postId}`)}
          disabled={pending}
        >
          취소
        </button>
      </div>
    </form>
  );
}
