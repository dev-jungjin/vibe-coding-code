import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthSetupNotice } from "@/components/SetupNotice";
import { formatDateTime } from "@/lib/format";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function MyPage() {
  if (!isSupabaseConfigured()) {
    return <AuthSetupNotice />;
  }

  const supabase = await createClient();
  if (!supabase) {
    return <AuthSetupNotice />;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/mypage");
  }

  return (
    <div className="stack">
      <section className="page-hero">
        <div>
          <span className="badge">보호된 페이지</span>
          <h1>마이페이지</h1>
          <p>이 페이지는 로그인한 사용자만 볼 수 있습니다. 미로그인 사용자는 `/login` 으로 보내집니다.</p>
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
          <span className="badge badge-muted">로그인 시각</span>
          <span>{user.last_sign_in_at ? formatDateTime(user.last_sign_in_at) : "-"}</span>
        </div>
        <div className="form-actions">
          <Link href="/" className="btn btn-primary">
            게시판으로
          </Link>
        </div>
      </section>
    </div>
  );
}
