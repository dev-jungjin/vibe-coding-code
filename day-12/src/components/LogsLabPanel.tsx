"use client";

import { useState } from "react";

type CallResult = {
  status: number;
  body: string;
};

export function LogsLabPanel() {
  const [health, setHealth] = useState<CallResult | null>(null);
  const [debug, setDebug] = useState<CallResult | null>(null);
  const [pending, setPending] = useState<"health" | "debug" | null>(null);

  async function call(path: string, key: "health" | "debug") {
    setPending(key);
    try {
      const response = await fetch(path, { cache: "no-store" });
      const body = await response.text();
      const result = { status: response.status, body };
      if (key === "health") {
        setHealth(result);
      } else {
        setDebug(result);
      }
    } finally {
      setPending(null);
    }
  }

  return (
    <section className="card stack">
      <h2 className="page-title" style={{ fontSize: "18px" }}>
        로그 발생 실험
      </h2>
      <p className="helper">
        버튼을 누른 뒤 터미널 또는 <code>logs/app.log</code> 에서 JSON 한 줄을 찾습니다.
        프로덕션(Vercel)에서는 파일 대신 Runtime Logs 의 같은 JSON 을 확인합니다.
      </p>
      <div className="form-actions">
        <button
          className="btn btn-primary"
          type="button"
          disabled={pending !== null}
          onClick={() => void call("/api/health", "health")}
        >
          {pending === "health" ? "호출 중..." : "GET /api/health"}
        </button>
        <button
          className="btn btn-danger"
          type="button"
          disabled={pending !== null}
          onClick={() => void call("/api/debug-error", "debug")}
        >
          {pending === "debug" ? "호출 중..." : "GET /api/debug-error"}
        </button>
      </div>
      {health ? (
        <pre className="code-block">{`/api/health  →  ${health.status}\n${health.body}`}</pre>
      ) : null}
      {debug ? (
        <pre className="code-block">{`/api/debug-error  →  ${debug.status}\n${debug.body}`}</pre>
      ) : null}
    </section>
  );
}
