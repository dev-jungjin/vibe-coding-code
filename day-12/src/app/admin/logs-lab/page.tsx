import { LogsLabPanel } from "@/components/LogsLabPanel";

export const dynamic = "force-dynamic";

export default function LogsLabPage() {
  return (
    <div className="stack">
      <section className="page-hero">
        <div>
          <span className="badge">Day 12</span>
          <h1>로그에서 원인 찾기</h1>
          <p>
            구조화 JSON 로그는 로컬에서는 <code>logs/app.log</code> 에 쌓이고, Vercel 배포 후에는
            Runtime Logs 의 표준 출력으로 나타납니다. 비밀번호와 토큰은 로그에 남기지 않습니다.
          </p>
        </div>
      </section>

      <section className="card stack">
        <h2 className="page-title" style={{ fontSize: "18px" }}>
          로그 규칙
        </h2>
        <ul className="stack" style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            한 줄은 하나의 JSON 입니다. 필드는 <code>timestamp</code>, <code>level</code>,
            <code>action</code>, <code>userId</code>, <code>path</code>, <code>durationMs</code>,
            <code>meta</code> 입니다.
          </li>
          <li>
            로컬(<code>NODE_ENV !== "production"</code>)에서는 <code>logs/app.log</code> 에도
            같은 줄을 덧붙입니다.
          </li>
          <li>
            <code>password</code>, <code>token</code>, <code>authorization</code> 같은 민감 필드는
            <code>[REDACTED]</code> 로 가립니다.
          </li>
        </ul>
      </section>

      <LogsLabPanel />

      <section className="card stack">
        <h2 className="page-title" style={{ fontSize: "18px" }}>
          로컬에서 추적하는 방법
        </h2>
        <ol className="stack" style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>위에서 의도적 오류 버튼을 누릅니다. 화면에는 500 응답이 보여야 합니다.</li>
          <li>
            프로젝트 폴더의 <code>logs/app.log</code> 를 열거나, 개발 서버 터미널에서
            <code>debug.error</code> 를 검색합니다.
          </li>
          <li>
            같은 시각의 <code>debug.error.start</code> (warn) 와 <code>debug.error</code> (error)
            가 쌍으로 있는지 확인합니다.
          </li>
        </ol>
      </section>

      <section className="card stack">
        <h2 className="page-title" style={{ fontSize: "18px" }}>
          Vercel Runtime Logs 에서 찾는 방법
        </h2>
        <ol className="stack" style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>이 폴더를 Root Directory 로 지정해 Vercel 에 배포합니다.</li>
          <li>Vercel 프로젝트의 <strong>Logs</strong> (Runtime Logs) 화면을 엽니다.</li>
          <li>배포된 주소에서 <code>/api/debug-error</code> 를 호출합니다.</li>
          <li>
            검색창에 <code>debug.error</code> 또는 <code>"action":"debug.error"</code> 를 입력해
            해당 요청의 JSON 로그와 <code>durationMs</code> 를 찾습니다.
          </li>
        </ol>
      </section>
    </div>
  );
}
