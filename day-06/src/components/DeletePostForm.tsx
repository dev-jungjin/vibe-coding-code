"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type DeletePostFormProps = {
  postId: string;
};

export function DeletePostForm({ postId }: DeletePostFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
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
    <form className="card stack" onSubmit={onSubmit}>
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
  );
}
