import Link from "next/link";
import { AdminPostTable } from "@/components/AdminPostTable";
import { AuthSetupNotice, DatabaseSetupNotice } from "@/components/SetupNotice";
import { getCurrentUserProfile, isAdmin } from "@/lib/auth";
import { publicPostSelect, toPublicPostJson } from "@/lib/post-dto";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { safeQuery } from "@/lib/safe-db";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return <AuthSetupNotice />;
  }

  const auth = await getCurrentUserProfile();
  if (!auth) {
    return (
      <section className="card stack">
        <span className="badge">로그인이 필요합니다</span>
        <h1 className="page-title">관리자 페이지는 로그인 후 이용하세요</h1>
        <div className="form-actions">
          <Link href="/login?next=/admin" className="btn btn-primary">
            로그인
          </Link>
        </div>
      </section>
    );
  }

  if (!isAdmin(auth.profile)) {
    return (
      <section className="card stack">
        <span className="badge badge-danger">접근 거부</span>
        <h1 className="page-title">일반 사용자(USER)는 관리자 페이지를 볼 수 없습니다</h1>
        <p className="helper">
          현재 계정 {auth.user.email} 의 역할은 {auth.profile?.role ?? "미등록"} 입니다.
          관리자 실습을 하려면 Prisma Studio 또는 SQL 로 해당 이메일의
          <code> UserProfile.role </code> 을 <code>ADMIN</code> 으로 바꾸세요.
        </p>
        <div className="form-actions">
          <Link href="/" className="btn btn-ghost">
            목록으로
          </Link>
        </div>
      </section>
    );
  }

  const { data: posts, error } = await safeQuery(
    (prisma) =>
      prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        select: publicPostSelect,
      }),
    [],
  );

  if (error) {
    return <DatabaseSetupNotice />;
  }

  return (
    <div className="stack">
      <section className="page-hero">
        <div>
          <span className="badge">ADMIN</span>
          <h1>글 관리</h1>
          <p>
            숨겨진 글을 포함한 모든 게시글을 보고, 강제 숨김 또는 삭제할 수 있습니다.
            이 권한은 작성자 여부와 무관합니다.
          </p>
        </div>
      </section>
      <AdminPostTable posts={posts.map(toPublicPostJson)} />
    </div>
  );
}
