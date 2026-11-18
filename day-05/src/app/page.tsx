import Link from "next/link";
import { formatPostDate } from "@/lib/formatDate";
import { listPosts } from "@/lib/mockStore";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const posts = listPosts();

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold tracking-wide text-cyan-ink">BOARD</p>
          <h1 className="text-2xl font-extrabold text-primary-dark md:text-3xl">
            글을 읽고, 쓰고, 고치고, 지울 수 있습니다
          </h1>
          <p className="max-w-2xl text-sm font-medium text-neutral-600 md:text-base">
            목록은 서버의 메모리 저장소에서 바로 읽어 옵니다. 새 글은{" "}
            <code className="rounded-md bg-white px-1.5 py-0.5 text-[13px] font-semibold text-primary-dark">
              POST /api/posts
            </code>{" "}
            로 추가되며, 개발 서버를 재시작하면 처음 준비한 글으로 돌아갑니다.
          </p>
        </div>
        <Link
          href="/posts/new"
          className="inline-flex items-center justify-center rounded-pill bg-primary-dark px-5 py-3 text-sm font-bold text-white hover:bg-[#12171f]"
        >
          새 글 작성
        </Link>
      </header>

      <p className="text-sm font-semibold text-neutral-600">전체 {posts.length}개의 글</p>

      {posts.length === 0 ? (
        <section className="rounded-card border border-neutral-200 bg-white p-8 text-center">
          <p className="font-bold text-primary-dark">아직 글이 없습니다</p>
          <p className="mt-2 text-sm text-neutral-600">첫 글을 작성해 게시판을 시작해 보세요.</p>
        </section>
      ) : (
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
                {post.content}
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
      )}
    </div>
  );
}
