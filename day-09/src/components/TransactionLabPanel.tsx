"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type TransactionLabPanelProps = {
  initialTotalPosts: number;
  initialPostCount: number;
};

type DemoResult = {
  ok: boolean;
  rolledBack?: boolean;
  message?: string;
  error?: string;
  after?: { totalPosts: number; totalViews: number } | null;
};

export function TransactionLabPanel({
  initialTotalPosts,
  initialPostCount,
}: TransactionLabPanelProps) {
  const router = useRouter();
  const [title, setTitle] = useState("트랜잭션 실습 글");
  const [content, setContent] = useState("이 글은 $transaction 실습용입니다.");
  const [authorName, setAuthorName] = useState("실습생");
  const [pending, setPending] = useState<"commit" | "rollback" | null>(null);
  const [result, setResult] = useState<DemoResult | null>(null);

  async function run(simulateError: boolean) {
    setResult(null);
    setPending(simulateError ? "rollback" : "commit");

    try {
      const response = await fetch("/api/transaction-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, authorName, simulateError }),
      });
      const payload = (await response.json()) as DemoResult;

      if (!response.ok && payload.error) {
        setResult({ ok: false, error: payload.error });
        return;
      }

      setResult(payload);
      router.refresh();
    } catch {
      setResult({ ok: false, error: "네트워크 오류가 발생했습니다." });
    } finally {
      setPending(null);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="card stack" onSubmit={onSubmit}>
      <h2 className="page-title" style={{ fontSize: "18px" }}>
        커밋 vs 롤백
      </h2>
      <p className="helper">
        현재 통계 글 수는 {initialTotalPosts} 건, 실제 글 수는 {initialPostCount} 건입니다.
        두 값이 같아야 데이터가 꼬이지 않은 상태입니다.
      </p>
      <div className="field">
        <label htmlFor="lab-title">제목</label>
        <input
          id="lab-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="lab-author">작성자</label>
        <input
          id="lab-author"
          value={authorName}
          onChange={(event) => setAuthorName(event.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="lab-content">본문</label>
        <textarea
          id="lab-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
        />
      </div>
      <div className="form-actions">
        <button
          className="btn btn-primary"
          type="button"
          disabled={pending !== null}
          onClick={() => void run(false)}
        >
          {pending === "commit" ? "커밋 중..." : "정상 커밋"}
        </button>
        <button
          className="btn btn-danger"
          type="button"
          disabled={pending !== null}
          onClick={() => void run(true)}
        >
          {pending === "rollback" ? "롤백 시험 중..." : "중간 오류 시뮬레이션"}
        </button>
      </div>
      {result ? (
        <div className="card" style={{ background: "#f4f5fb" }}>
          {result.error ? <p className="error-text">{result.error}</p> : null}
          {result.rolledBack ? (
            <p>
              결과: <strong>전체 롤백</strong>. 통계와 글 수가 실행 전과 같아야 합니다.
              {result.after ? ` 현재 통계 글 수: ${result.after.totalPosts}` : ""}
            </p>
          ) : null}
          {result.ok ? (
            <p>
              결과: <strong>정상 커밋</strong>. 글, 통계, 감사 로그가 함께 저장되었습니다.
              {result.after ? ` 현재 통계 글 수: ${result.after.totalPosts}` : ""}
            </p>
          ) : null}
          {result.message ? <p className="helper">{result.message}</p> : null}
        </div>
      ) : null}
    </form>
  );
}
