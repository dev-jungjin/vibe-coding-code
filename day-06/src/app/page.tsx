import Link from "next/link";
import { DatabaseSetupNotice } from "@/components/SetupNotice";
import { formatDateTime } from "@/lib/format";
import { publicPostSelect } from "@/lib/post-dto";
import { safeQuery } from "@/lib/safe-db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { data: posts, error } = await safeQuery(
    (prisma) =>
      prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        select: publicPostSelect,
      }),
    [],
  );

  return (
    <div className="stack">
      <section className="page-hero">
        <div>
          <span className="badge">Day 06</span>
          <h1>익명 게시판</h1>
          <p>Supabase PostgreSQL 과 Prisma 로 글 목록, 상세, 수정, 삭제를 연결합니다.</p>
        </div>
        <Link href="/posts/new" className="btn btn-primary">
          새 글 작성
        </Link>
      </section>

      {error ? <DatabaseSetupNotice /> : null}

      {!error && posts.length === 0 ? (
        <section className="card empty-state">
          <span className="badge badge-muted">아직 글이 없습니다</span>
          <h2>첫 글을 작성해 보세요</h2>
          <p className="helper">비밀번호는 수정과 삭제 때 본인을 확인하는 용도로만 사용됩니다.</p>
        </section>
      ) : null}

      {posts.length > 0 ? (
        <section className="post-list">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`} className="card post-card">
              <h2>{post.title}</h2>
              <div className="meta-row">
                <span>{post.authorName}</span>
                <span>{formatDateTime(post.createdAt)}</span>
                <span>조회 {post.viewCount}</span>
              </div>
            </Link>
          ))}
        </section>
      ) : null}
    </div>
  );
}
