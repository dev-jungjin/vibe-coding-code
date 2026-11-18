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
  const [password, setPassword] = useState("");
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
        body: JSON.stringify({ title, content, password }),
      });
      const payload = (await response.json()) as { error?: string };

      if (response.status === 401 || response.status === 403) {
        setError(payload.error ?? "비밀번호가 올바르지 않습니다.");
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
      <div className="field">
        <label htmlFor="password">작성 시 정한 비밀번호</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="current-password"
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
