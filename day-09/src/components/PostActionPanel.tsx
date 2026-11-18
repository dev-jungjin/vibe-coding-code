"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PostActionPanelProps = {
  postId: string;
};

/**
 * Client Component.
 * 수정 이동과 삭제 확인처럼 사용자 입력이 필요한 동작만 담당합니다.
 * 삭제 성공 후 router.refresh() 를 호출해 목록 Server Component 를 즉시 갱신합니다.
 */
export function PostActionPanel({ postId }: PostActionPanelProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onDelete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const payload = (await response.json()) as { error?: string };

      if (response.status === 401 || response.status === 403) {
        setError(payload.error ?? "비밀번호가 올바르지 않습니다.");
        return;
      }

      if (!response.ok) {
        setError(payload.error ?? "글을 삭제하지 못했습니다.");
        return;
      }

      router.refresh();
      router.push("/");
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="stack">
      <div className="form-actions">
        <Link href={`/posts/${postId}/edit`} className="btn btn-primary">
          수정하기
        </Link>
        <Link href="/" className="btn btn-ghost">
          목록으로
        </Link>
      </div>
      <form className="card stack" onSubmit={onDelete}>
        <h2 className="page-title" style={{ fontSize: "18px" }}>
          글 삭제
        </h2>
        <p className="helper">작성 시 정한 비밀번호가 일치할 때만 삭제됩니다.</p>
        <div className="field">
          <label htmlFor="delete-password">비밀번호</label>
          <input
            id="delete-password"
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
          <button className="btn btn-danger" type="submit" disabled={pending}>
            {pending ? "삭제 중..." : "삭제하기"}
          </button>
        </div>
      </form>
    </div>
  );
}
