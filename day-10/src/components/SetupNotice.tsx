type SetupNoticeProps = {
  title: string;
  children: React.ReactNode;
};

export function SetupNotice({ title, children }: SetupNoticeProps) {
  return (
    <section className="card setup-notice">
      <span className="badge">설정 필요</span>
      <h2>{title}</h2>
      <div className="muted">{children}</div>
    </section>
  );
}

export function DatabaseSetupNotice() {
  return (
    <SetupNotice title="데이터베이스가 아직 연결되지 않았습니다">
      <p className="helper">
        <code>.env.example</code> 을 복사해 <code>.env</code> 를 만든 뒤, Supabase
        PostgreSQL 연결 문자열을 넣고 스키마를 반영하세요. 환경 변수가 없어도
        이 프로젝트는 빌드가 실패하지 않도록 구성되어 있습니다.
      </p>
      <pre className="code-block">{`cp .env.example .env
npx prisma db push
npm run dev`}</pre>
    </SetupNotice>
  );
}


export function AuthSetupNotice() {
  return (
    <SetupNotice title="Supabase Auth 가 아직 연결되지 않았습니다">
      <p className="helper">
        <code>.env.example</code> 을 참고해 <code>NEXT_PUBLIC_SUPABASE_URL</code> 과
        <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> 를 <code>.env</code> 에 넣은 뒤
        개발 서버를 다시 시작하세요.
      </p>
      <pre className="code-block">{`NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_ANON_KEY"`}</pre>
    </SetupNotice>
  );
}
