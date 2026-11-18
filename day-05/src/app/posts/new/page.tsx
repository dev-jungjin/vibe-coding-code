import type { Metadata } from "next";
import Link from "next/link";
import { NewPostForm } from "@/components/NewPostForm";

export const metadata: Metadata = {
  title: "새 글 작성",
};

export default function NewPostPage() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <Link
        href="/"
        className="text-sm font-bold text-neutral-600 hover:text-primary-dark"
      >
        목록으로 돌아가기
      </Link>
      <div className="rounded-card border border-neutral-200 bg-white p-5 md:p-8">
        <header className="mb-6 flex flex-col gap-2">
          <p className="text-xs font-bold tracking-wide text-cyan-ink">CREATE</p>
          <h1 className="text-2xl font-extrabold text-primary-dark">새 글 작성</h1>
          <p className="text-sm text-neutral-600">
            제출하면 브라우저가{" "}
            <code className="rounded-md bg-neutral-50 px-1.5 py-0.5 text-[13px] font-semibold text-primary-dark">
              POST /api/posts
            </code>{" "}
            를 호출하고, 만들어진 글의 상세 페이지로 이동합니다.
          </p>
        </header>
        <NewPostForm />
      </div>
    </section>
  );
}
