import Link from "next/link";
import { AuthLogoutButton } from "@/components/AuthLogoutButton";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function AuthNav() {
  if (!isSupabaseConfigured()) {
    return (
      <Link href="/login" className="nav-link">
        로그인
      </Link>
    );
  }

  const supabase = await createClient();
  if (!supabase) {
    return (
      <Link href="/login" className="nav-link">
        로그인
      </Link>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <>
        <Link href="/login" className="nav-link">
          로그인
        </Link>
        <Link href="/signup" className="nav-link">
          회원가입
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/mypage" className="nav-link">
        {user.email ?? "마이페이지"}
      </Link>
      <AuthLogoutButton />
    </>
  );
}
