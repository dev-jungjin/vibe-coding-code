import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthSetupNotice } from "@/components/SetupNotice";
import { getCurrentUserProfile, isAdmin } from "@/lib/auth";
import { formatDateTime } from "@/lib/format";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function MyPage() {
  if (!isSupabaseConfigured()) {
    return <AuthSetupNotice />;
  }

  const auth = await getCurrentUserProfile();
  if (!auth) {
    redirect("/login?next=/mypage");
  }

  const { user, profile } = auth;

  return (
    <div className="stack">
      <section className="page-hero">
        <div>
          <span className="badge">보호된 페이지</span>
          <h1>마이페이지</h1>
          <p>로그인 세션과 역할(Role) 정보를 확인합니다.</p>
        </div>
      </section>
      <section className="card stack">
        <h2 className="page-title" style={{ fontSize: "18px" }}>
          세션 정보
        </h2>
        <div className="meta-row">
          <span className="badge badge-muted">email</span>
          <span>{user.email}</span>
        </div>
        <div className="meta-row">
          <span className="badge badge-muted">user id</span>
          <span>{user.id}</span>
        </div>
        <div className="meta-row">
          <span className="badge badge-muted">role</span>
          <span>{profile?.role ?? "프로필 없음"}</span>
        </div>
        <div className="meta-row">
          <span className="badge badge-muted">로그인 시각</span>
          <span>{user.last_sign_in_at ? formatDateTime(user.last_sign_in_at) : "-"}</span>
        </div>
        <div className="form-actions">
          <Link href="/" className="btn btn-primary">
            게시판으로
          </Link>
          {isAdmin(profile) ? (
            <Link href="/admin" className="btn btn-ghost">
              관리자 페이지
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
