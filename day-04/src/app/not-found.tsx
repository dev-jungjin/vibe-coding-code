import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-lg flex-col gap-4 rounded-card border border-neutral-200 bg-white p-6 text-center md:p-10">
      <p className="text-xs font-bold tracking-wide text-cyan-ink">404</p>
      <h1 className="text-2xl font-extrabold text-primary-dark">
        글을 찾을 수 없습니다
      </h1>
      <p className="text-sm text-neutral-600">
        주소가 잘못되었거나, 가짜 데이터 목록에 없는 아이디입니다.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center justify-center rounded-pill bg-primary-dark px-5 py-3 text-sm font-bold text-white hover:bg-[#12171f]"
      >
        글 목록으로 돌아가기
      </Link>
    </section>
  );
}
