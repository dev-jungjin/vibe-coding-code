import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getAllPosts, getPostById } from "@/data/mockPosts";

type PostPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    return { title: "글을 찾을 수 없습니다" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content.split("\n\n");

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <Link
        href="/"
        className="text-sm font-bold text-neutral-600 hover:text-primary-dark"
      >
        목록으로 돌아가기
      </Link>

      <header className="flex flex-col gap-3 rounded-card border border-neutral-200 bg-white p-5 md:p-8">
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
        <h1 className="text-2xl font-extrabold leading-snug text-primary-dark md:text-3xl">
          {post.title}
        </h1>
        <p className="text-sm font-bold text-primary-dark">{post.author}</p>
      </header>

      <section className="rounded-card border border-neutral-200 bg-white p-5 md:p-8">
        <div className="mb-5 h-4 w-1 rounded-sm bg-signature-cyan" aria-hidden="true" />
        <div className="flex flex-col gap-5">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[15px] leading-7 text-neutral-600 md:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </article>
  );
}
