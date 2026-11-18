import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/data/mockPosts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-bold tracking-wide text-cyan-ink">BOARD</p>
        <h1 className="text-2xl font-extrabold text-primary-dark md:text-3xl">
          자유롭게 배우고, 기록하는 게시판
        </h1>
        <p className="max-w-2xl text-sm font-medium text-neutral-600 md:text-base">
          이 목록의 글은 데이터베이스가 아니라{" "}
          <code className="rounded-md bg-white px-1.5 py-0.5 text-[13px] font-semibold text-primary-dark">
            src/data/mockPosts.ts
          </code>{" "}
          에 미리 적어 둔 가짜 데이터입니다. 카드를 누르면 상세 페이지로 이동합니다.
        </p>
      </header>

      <p className="text-sm font-semibold text-neutral-600">전체 {posts.length}개의 글</p>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col gap-3 rounded-card border border-neutral-200 bg-white p-5 shadow-[0_2px_8px_rgba(30,37,48,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(30,37,48,0.08)] md:p-6"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-pill bg-signature-cyan/15 px-2.5 py-0.5 text-[11px] font-bold text-cyan-ink">
                {post.category}
              </span>
              <time
                className="text-xs font-semibold text-neutral-600"
                dateTime={post.createdAt}
              >
                {formatPostDate(post.createdAt)}
              </time>
            </div>
            <h2 className="text-lg font-extrabold leading-snug text-primary-dark">
              <Link href={`/posts/${post.id}`} className="hover:text-cyan-ink">
                {post.title}
              </Link>
            </h2>
            <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600">
              {post.excerpt}
            </p>
            <div className="mt-auto flex items-center justify-between pt-1">
              <span className="text-sm font-bold text-primary-dark">{post.author}</span>
              <Link
                href={`/posts/${post.id}`}
                className="text-sm font-bold text-primary-dark hover:text-cyan-ink"
              >
                자세히 보기
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
