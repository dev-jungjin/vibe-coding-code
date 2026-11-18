"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { AuthSetupNotice } from "@/components/SetupNotice";

type AuthFormProps = {
  mode: "login" | "signup";
  nextPath?: string;
};

export function AuthForm({ mode, nextPath = "/mypage" }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (!isSupabaseConfigured()) {
    return <AuthSetupNotice />;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setPending(true);

    try {
      const supabase = createClient();
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) {
          setError(signUpError.message);
          return;
        }
        setMessage("회원가입이 완료되었습니다. 이메일 확인이 켜져 있으면 받은 편지함을 확인해 주세요. 바로 로그인할 수 있으면 마이페이지로 이동합니다.");
        router.refresh();
        router.push(nextPath);
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.refresh();
      router.push(nextPath);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "인증 요청에 실패했습니다.");
    } finally {
      setPending(false);
    }
  }

  const isSignup = mode === "signup";

  return (
    <form className="card stack" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
          placeholder="you@example.com"
        />
      </div>
      <div className="field">
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
          autoComplete={isSignup ? "new-password" : "current-password"}
          placeholder="6자 이상"
        />
      </div>
      {error ? <p className="error-text">{error}</p> : null}
      {message ? <p className="helper">{message}</p> : null}
      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? "처리 중..." : isSignup ? "회원가입" : "로그인"}
        </button>
        {isSignup ? (
          <Link href="/login" className="btn btn-ghost">
            이미 계정이 있습니다
          </Link>
        ) : (
          <Link href="/signup" className="btn btn-ghost">
            회원가입
          </Link>
        )}
      </div>
    </form>
  );
}
