import { formatDateTime } from "@/lib/format";
import type { PublicPost } from "@/lib/post-dto";

type PostDetailCardProps = {
  post: PublicPost;
  children?: React.ReactNode;
};

/**
 * Server Component.
 * 게시글 본문처럼 서버에서 이미 준비된 데이터를 보여 줍니다.
 * 버튼/폼 등 상호작용은 children 으로 전달된 Client Component 가 담당합니다.
 */
export function PostDetailCard({ post, children }: PostDetailCardProps) {
  return (
    <section className="card stack">
      <span className="badge badge-muted">게시글</span>
      <h1 className="page-title">{post.title}</h1>
      <div className="meta-row">
        <span>{post.authorName}</span>
        <span>작성 {formatDateTime(post.createdAt)}</span>
        <span>수정 {formatDateTime(post.updatedAt)}</span>
        <span>조회 {post.viewCount}</span>
      </div>
      <div className="prose-body">{post.content}</div>
      {children}
    </section>
  );
}
