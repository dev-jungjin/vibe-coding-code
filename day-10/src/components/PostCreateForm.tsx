"use client";

/**
 * Client Component.
 * 로그인한 사용자의 세션 쿠키가 API 로 전달되어 작성자 ID 가 글에 붙습니다.
 * 성공 후 router.refresh() 로 목록 Server Component 를 즉시 갱신합니다.
 */

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type PostCreateFormProps = {
  defaultAuthorName?: string;
};

export function PostCreateForm({ defaultAuthorName = "" }: PostCreateFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState(defaultAuthorName);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, authorName }),
      });
      const payload = (await response.json()) as { id?: string; error?: string };

      if (response.status === 401) {
        setError(payload.error ?? "로그인이 필요합니다.");
        router.push("/login?next=/posts/new");
        return;
      }

      if (!response.ok) {
        setError(payload.error ?? "글을 저장하지 못했습니다.");
        return;
      }

      if (payload.id) {
        router.refresh();
        router.push(`/posts/${payload.id}`);
        return;
      }

      setError("저장은 되었지만 글 주소를 받지 못했습니다.");
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
          placeholder="오늘의 학습 기록"
        />
      </div>
      <div className="field">
        <label htmlFor="authorName">표시 이름</label>
        <input
          id="authorName"
          name="authorName"
          value={authorName}
          onChange={(event) => setAuthorName(event.target.value)}
          maxLength={40}
          placeholder="화면에 보여 줄 이름"
        />
        <p className="helper">비워 두면 로그인 이메일이 표시 이름으로 사용됩니다. 실제 소유권은 서버의 사용자 ID 로 검사합니다.</p>
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
          placeholder="배운 점, 막혔던 점, 다음에 시도할 것을 적어 보세요."
        />
      </div>
      {error ? <p className="error-text">{error}</p> : null}
      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? "저장 중..." : "글 등록"}
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => router.push("/")}
          disabled={pending}
        >
          취소
        </button>
      </div>
    </form>
  );
}
