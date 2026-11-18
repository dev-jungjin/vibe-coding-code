import Link from "next/link";
import { DatabaseSetupNotice } from "@/components/SetupNotice";
import { PostListServer } from "@/components/PostListServer";
import { PostSearchBar } from "@/components/PostSearchBar";
import { publicPostSelect } from "@/lib/post-dto";
import { safeQuery } from "@/lib/safe-db";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

type HomePageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const searchFilter: Prisma.PostWhereInput | undefined = query
    ? {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
          { authorName: { contains: query, mode: "insensitive" } },
        ],
      }
    : undefined;

  const where: Prisma.PostWhereInput = {
    isHidden: false,
    ...(searchFilter ?? {}),
  };

  const { data, error } = await safeQuery(
    async (prisma) => {
      const [posts, stat] = await Promise.all([
        prisma.post.findMany({
          where,
          orderBy: { createdAt: "desc" },
          select: publicPostSelect,
        }),
        prisma.boardStat.findUnique({ where: { id: "singleton" } }),
      ]);
      return { posts, stat };
    },
    { posts: [], stat: null },
  );

  return (
    <div className="stack">
      <section className="page-hero">
        <div>
          <span className="badge">Day 12</span>
          <h1>1개월차 마무리: 로그에서 원인 찾기</h1>
          <p>
            익명 CRUD 부터 인증, 인가, 관리자 역할까지 쌓인 게시판에 구조화 로그를 더합니다.
            <code>/admin/logs-lab</code> 에서 의도적 오류를 만들고 로그를 추적해 보세요.
          </p>
        </div>
        <div className="form-actions">
          <Link href="/admin/logs-lab" className="btn btn-ghost">
            로그 실습
          </Link>
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
            <h2 style={{ margin: 0 }}>{data.stat?.totalPosts ?? 0}</h2>
          </article>
          <article className="card">
            <p className="helper">통계 조회 수</p>
            <h2 style={{ margin: 0 }}>{data.stat?.totalViews ?? 0}</h2>
          </article>
          <article className="card">
            <p className="helper">{query ? "검색된 글 수" : "실제 글 수"}</p>
            <h2 style={{ margin: 0 }}>{data.posts.length}</h2>
          </article>
        </section>
      ) : null}

      <PostSearchBar defaultQuery={query} />
      <PostListServer posts={data.posts} query={query} />
    </div>
  );
}
