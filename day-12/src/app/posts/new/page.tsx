import Link from "next/link";
import { PostCreateForm } from "@/components/PostCreateForm";
import { AuthSetupNotice, DatabaseSetupNotice } from "@/components/SetupNotice";
import { getSessionUser } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/prisma";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  if (!isSupabaseConfigured()) {
    return <AuthSetupNotice />;
  }

  const user = await getSessionUser();
  if (!user) {
    return (
      <section className="card stack">
        <span className="badge">로그인이 필요합니다</span>
        <h1 className="page-title">글을 쓰려면 먼저 로그인하세요</h1>
        <p className="helper">10일차부터 글 작성은 로그인 세션이 있어야 하며, 작성자 ID 가 글에 저장됩니다.</p>
        <div className="form-actions">
          <Link href="/login?next=/posts/new" className="btn btn-primary">
            로그인
          </Link>
          <Link href="/signup" className="btn btn-ghost">
            회원가입
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="stack">
      <section className="page-hero">
        <div>
          <span className="badge">새 글</span>
          <h1>게시글 작성</h1>
          <p>이 글은 {user.email} 계정에 연결됩니다. 다른 사용자는 수정하거나 삭제할 수 없습니다.</p>
        </div>
      </section>
      {isDatabaseConfigured() ? (
        <PostCreateForm defaultAuthorName={user.email ?? ""} />
      ) : (
        <DatabaseSetupNotice />
      )}
    </div>
  );
}
