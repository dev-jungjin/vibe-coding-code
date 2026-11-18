import Link from "next/link";
import { notFound } from "next/navigation";
import { EditPostForm } from "@/components/EditPostForm";
import { AuthSetupNotice, DatabaseSetupNotice } from "@/components/SetupNotice";
import { getSessionUser, isPostOwner } from "@/lib/auth";
import { publicPostSelect } from "@/lib/post-dto";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { safeQuery } from "@/lib/safe-db";

export const dynamic = "force-dynamic";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  if (!isSupabaseConfigured()) {
    return <AuthSetupNotice />;
  }

  const user = await getSessionUser();
  const { data: post, error } = await safeQuery(
    (prisma) =>
      prisma.post.findUnique({
        where: { id },
        select: publicPostSelect,
      }),
    null,
  );

  if (error) {
    return <DatabaseSetupNotice />;
  }

  if (!post) {
    notFound();
  }

  if (!user) {
    return (
      <section className="card stack">
        <span className="badge">로그인이 필요합니다</span>
        <h1 className="page-title">이 글을 수정하려면 로그인하세요</h1>
        <div className="form-actions">
          <Link href={`/login?next=/posts/${post.id}/edit`} className="btn btn-primary">
            로그인
          </Link>
        </div>
      </section>
    );
  }

  if (!isPostOwner(post, user)) {
    return (
      <section className="card stack">
        <span className="badge badge-danger">403 Forbidden</span>
        <h1 className="page-title">이 글을 수정할 권한이 없습니다</h1>
        <p className="helper">서버가 작성자 ID 와 현재 로그인 사용자를 비교해 차단했습니다. UI 를 우회해도 API 는 같은 검사를 합니다.</p>
        <div className="form-actions">
          <Link href={`/posts/${post.id}`} className="btn btn-ghost">
            글로 돌아가기
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="stack">
      <section className="page-hero">
        <div>
          <span className="badge">수정</span>
          <h1>게시글 수정</h1>
          <p>작성자 본인만 저장할 수 있습니다. 저장 요청마다 서버가 소유권을 다시 검사합니다.</p>
        </div>
      </section>
      <EditPostForm postId={post.id} defaultTitle={post.title} defaultContent={post.content} />
    </div>
  );
}
