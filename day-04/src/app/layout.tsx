import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "바이브코딩 자유게시판",
    template: "%s | 바이브코딩 자유게시판",
  },
  description:
    "4일차 실습용 게시판입니다. 가짜 데이터로 글 목록과 상세 화면을 먼저 완성합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6 md:py-4">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary-dark text-sm font-extrabold text-signature-cyan">
                V
              </span>
              <span>
                <span className="block text-base font-extrabold text-primary-dark">
                  바이브코딩 자유게시판
                </span>
                <span className="block text-[11px] font-semibold text-neutral-600">
                  4일차 · 가짜 데이터로 화면 먼저 만들기
                </span>
              </span>
            </Link>
            <nav aria-label="주요 메뉴" className="flex gap-1.5">
              <Link
                href="/"
                className="flex-1 rounded-pill bg-primary-dark px-4 py-2.5 text-center text-sm font-bold text-white md:flex-none"
              >
                글 목록
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 md:px-6 md:py-10">
          {children}
        </main>
        <footer className="px-4 py-8 text-center text-xs text-neutral-600">
          Claude AI 기반 바이브코딩 풀스택 웹개발 · 4일차 Next.js 게시판 뼈대
        </footer>
      </body>
    </html>
  );
}
