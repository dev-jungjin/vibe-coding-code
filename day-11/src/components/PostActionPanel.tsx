"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PostActionPanelProps = {
  postId: string;
  canManage: boolean;
  isAuthenticated: boolean;
};

/**
 * Client Component.
 * 수정/삭제 버튼은 작성자 본인에게만 보여 줍니다.
 * 숨기는 것은 UX 이고, 실제 권한 검사는 서버 API 가 수행합니다.
 */
export function PostActionPanel({ postId, canManage, isAuthenticated }: PostActionPanelProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onDelete() {
    setError(null);
    setPending(true);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      const payload = (await response.json()) as { error?: string };

      if (response.status === 401) {
        setError(payload.error ?? "로그인이 필요합니다.");
        return;
      }

      if (response.status === 403) {
        setError(payload.error ?? "본인이 작성한 글만 삭제할 수 있습니다.");
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
        {canManage ? (
          <Link href={`/posts/${postId}/edit`} className="btn btn-primary">
            수정하기
          </Link>
        ) : (
          <button className="btn btn-primary" type="button" disabled>
            수정하기
          </button>
        )}
        <Link href="/" className="btn btn-ghost">
          목록으로
        </Link>
      </div>
      {canManage ? (
        <div className="card stack">
          <h2 className="page-title" style={{ fontSize: "18px" }}>
            글 삭제
          </h2>
          <p className="helper">이 글의 작성자 본인만 삭제할 수 있습니다. 서버가 세션의 사용자 ID 를 다시 검사합니다.</p>
          {error ? <p className="error-text">{error}</p> : null}
          <div className="form-actions">
            <button className="btn btn-danger" type="button" onClick={() => void onDelete()} disabled={pending}>
              {pending ? "삭제 중..." : "삭제하기"}
            </button>
          </div>
        </div>
      ) : (
        <p className="helper">
          {isAuthenticated
            ? "다른 사용자가 작성한 글이라 수정·삭제 버튼이 비활성화되어 있습니다."
            : "로그인하면 본인이 작성한 글만 수정·삭제할 수 있습니다."}
        </p>
      )}
    </div>
  );
}
