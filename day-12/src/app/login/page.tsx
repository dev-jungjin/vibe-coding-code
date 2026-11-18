import { AuthForm } from "@/components/AuthForm";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  const nextPath = next?.startsWith("/") ? next : "/mypage";

  return (
    <div className="stack">
      <section className="page-hero">
        <div>
          <span className="badge">Day 09</span>
          <h1>로그인</h1>
          <p>Supabase Auth 세션을 쿠키에 저장하고, 보호된 페이지로 이동합니다.</p>
        </div>
      </section>
      <AuthForm mode="login" nextPath={nextPath} />
    </div>
  );
}
