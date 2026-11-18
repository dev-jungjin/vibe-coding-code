import Link from "next/link";
import { AuthNav } from "@/components/AuthNav";
import { COURSE } from "@/lib/course";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand">
          <span className="brand-mark">VB</span>
          <span className="brand-text">
            <strong>{COURSE.title}</strong>
            <small>Day {COURSE.day} · {COURSE.subtitle}</small>
          </span>
        </Link>
        <nav className="site-nav" aria-label="주요 메뉴">
          <Link href="/" className="nav-link">
            목록
          </Link>
          <Link href="/transaction-lab" className="nav-link">
            트랜잭션 실습
          </Link>
          <Link href="/posts/new" className="nav-pill">
            글쓰기
          </Link>
          <AuthNav />
        </nav>
      </div>
    </header>
  );
}
