import Link from "next/link";

export default function NotFound() {
  return (
    <section className="card empty-state">
      <span className="badge badge-muted">404</span>
      <h1 className="page-title">글을 찾을 수 없습니다</h1>
      <p className="helper">삭제되었거나 주소가 잘못된 게시글입니다.</p>
      <div className="form-actions">
        <Link href="/" className="btn btn-primary">
          목록으로 돌아가기
        </Link>
      </div>
    </section>
  );
}
