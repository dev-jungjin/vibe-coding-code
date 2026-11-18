import Link from "next/link";
import { AuthLogoutButton } from "@/components/AuthLogoutButton";
import { getCurrentUserProfile, isAdmin } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function AuthNav() {
  if (!isSupabaseConfigured()) {
    return (
      <Link href="/login" className="nav-link">
        로그인
      </Link>
    );
  }

  const auth = await getCurrentUserProfile();

  if (!auth?.user) {
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
      {isAdmin(auth.profile) ? (
        <Link href="/admin" className="nav-link">
          관리자
        </Link>
      ) : null}
      <Link href="/mypage" className="nav-link">
        {auth.user.email ?? "마이페이지"}
      </Link>
      <AuthLogoutButton />
    </>
  );
}
