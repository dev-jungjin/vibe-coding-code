"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDateTime } from "@/lib/format";
import type { PublicPostJson } from "@/lib/post-dto";

type AdminPostTableProps = {
  posts: PublicPostJson[];
};

export function AdminPostTable({ posts }: AdminPostTableProps) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function toggleHidden(post: PublicPostJson) {
    setError(null);
    setPendingId(post.id);
    try {
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: !post.isHidden }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "숨김 상태를 바꾸지 못했습니다.");
        return;
      }
      router.refresh();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setPendingId(null);
    }
  }

  async function forceDelete(post: PublicPostJson) {
    if (!window.confirm(`"${post.title}" 글을 강제 삭제할까요?`)) {
      return;
    }
    setError(null);
    setPendingId(post.id);
    try {
      const response = await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "강제 삭제에 실패했습니다.");
        return;
      }
      router.refresh();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setPendingId(null);
    }
  }

  if (posts.length === 0) {
    return <p className="helper">아직 등록된 글이 없습니다.</p>;
  }

  return (
    <div className="stack">
      {error ? <p className="error-text">{error}</p> : null}
      <div className="stack">
        {posts.map((post) => (
          <article key={post.id} className="card stack">
            <div className="meta-row">
              {post.isHidden ? <span className="badge badge-danger">숨김</span> : <span className="badge">공개</span>}
              <span>{formatDateTime(post.createdAt)}</span>
              <span>조회 {post.viewCount}</span>
            </div>
            <h2 className="page-title" style={{ fontSize: "18px", margin: 0 }}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <div className="meta-row">
              <span>{post.authorName}</span>
              {post.authorEmail ? <span>{post.authorEmail}</span> : null}
            </div>
            <div className="form-actions">
              <button
                className="btn btn-ghost"
                type="button"
                disabled={pendingId === post.id}
                onClick={() => void toggleHidden(post)}
              >
                {post.isHidden ? "공개하기" : "숨기기"}
              </button>
              <button
                className="btn btn-danger"
                type="button"
                disabled={pendingId === post.id}
                onClick={() => void forceDelete(post)}
              >
                강제 삭제
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
