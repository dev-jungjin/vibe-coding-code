import Link from "next/link";
import { DatabaseSetupNotice } from "@/components/SetupNotice";
import { formatDateTime } from "@/lib/format";
import { publicPostSelect } from "@/lib/post-dto";
import { safeQuery } from "@/lib/safe-db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { data, error } = await safeQuery(
    async (prisma) => {
      const [posts, stat] = await Promise.all([
        prisma.post.findMany({
          orderBy: { createdAt: "desc" },
          select: publicPostSelect,
        }),
        prisma.boardStat.findUnique({ where: { id: "singleton" } }),
      ]);
      return { posts, stat };
    },
    { posts: [], stat: null },
  );

  const posts = data.posts;
  const stat = data.stat;

  return (
    <div className="stack">
      <section className="page-hero">
        <div>
          <span className="badge">Day 07</span>
          <h1>트랜잭션으로 데이터 지키기</h1>
          <p>글 작성과 삭제는 게시판 통계와 감사 로그를 한 트랜잭션으로 묶습니다.</p>
        </div>
        <div className="form-actions">
          <Link href="/transaction-lab" className="btn btn-ghost">
            트랜잭션 실습
          </Link>
          <Link href="/posts/new" className="btn btn-primary">
            새 글 작성
          </Link>
        </div>
      </section>

      {error ? <DatabaseSetupNotice /> : null}

      {!error ? (
        <section className="post-list" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
          <article className="card">
            <p className="helper">통계 글 수</p>
            <h2 style={{ margin: 0 }}>{stat?.totalPosts ?? 0}</h2>
          </article>
          <article className="card">
            <p className="helper">통계 조회 수</p>
            <h2 style={{ margin: 0 }}>{stat?.totalViews ?? 0}</h2>
          </article>
          <article className="card">
            <p className="helper">실제 글 수</p>
            <h2 style={{ margin: 0 }}>{posts.length}</h2>
          </article>
        </section>
      ) : null}

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
