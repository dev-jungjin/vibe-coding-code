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

  const where: Prisma.PostWhereInput | undefined = query
    ? {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
          { authorName: { contains: query, mode: "insensitive" } },
        ],
      }
    : undefined;

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
          <span className="badge">Day 10</span>
          <h1>내 글은 나만 고칠 수 있게 하기</h1>
          <p>
            글 작성 시 로그인한 사용자의 ID 가 저장되고, 수정·삭제는 서버에서 소유권을 검사합니다.
            다른 사용자의 글에는 수정·삭제 버튼이 보이지 않거나 비활성화됩니다.
          </p>
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
