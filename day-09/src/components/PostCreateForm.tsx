"use client";

/**
 * Client Component.
 * 폼 입력과 fetch 는 브라우저에서 처리하고, 성공 후 router.refresh() 로
 * 서버에서 가져온 목록을 전체 새로고침 없이 다시 렌더링합니다.
 */
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function PostCreateForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [password, setPassword] = useState("");
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
        body: JSON.stringify({ title, content, authorName, password }),
      });
      const payload = (await response.json()) as { id?: string; error?: string };

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
        <label htmlFor="authorName">작성자 이름</label>
        <input
          id="authorName"
          name="authorName"
          value={authorName}
          onChange={(event) => setAuthorName(event.target.value)}
          required
          maxLength={40}
          placeholder="홍길동"
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
          placeholder="배운 점, 막혔던 점, 다음에 시도할 것을 적어 보세요."
        />
      </div>
      <div className="field">
        <label htmlFor="password">수정/삭제 확인 비밀번호</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={4}
          maxLength={64}
          autoComplete="new-password"
          placeholder="4자 이상"
        />
        <p className="helper">이 비밀번호는 서버에 해시로만 저장되며, 수정과 삭제 시 본인 확인에 사용됩니다.</p>
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
