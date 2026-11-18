import { AuthForm } from "@/components/AuthForm";

export const dynamic = "force-dynamic";

export default function SignupPage() {
  return (
    <div className="stack">
      <section className="page-hero">
        <div>
          <span className="badge">Day 09</span>
          <h1>회원가입</h1>
          <p>이메일과 비밀번호로 계정을 만듭니다. 수업에서는 이메일 확인을 꺼 두면 바로 로그인할 수 있습니다.</p>
        </div>
      </section>
      <AuthForm mode="signup" nextPath="/mypage" />
    </div>
  );
}
