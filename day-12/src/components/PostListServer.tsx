import Link from "next/link";
import { formatDateTime } from "@/lib/format";
import type { PublicPost } from "@/lib/post-dto";

type PostListServerProps = {
  posts: PublicPost[];
  query?: string;
};

/**
 * Server Component.
 * 데이터를 이미 서버에서 조회한 뒤 목록 UI 만 렌더링합니다.
 * 브라우저 번들에 포함되지 않으므로 Prisma 나 비밀 값을 여기서 다뤄도 됩니다.
 */
export function PostListServer({ posts, query }: PostListServerProps) {
  if (posts.length === 0) {
    return (
      <section className="card empty-state">
        <span className="badge badge-muted">{query ? "검색 결과 없음" : "아직 글이 없습니다"}</span>
        <h2>{query ? `"${query}" 에 해당하는 글이 없습니다` : "첫 글을 작성해 보세요"}</h2>
        <p className="helper">
          {query
            ? "검색어를 바꾸거나 비워 전체 목록을 다시 볼 수 있습니다."
            : "비밀번호는 수정과 삭제 때 본인을 확인하는 용도로만 사용됩니다."}
        </p>
      </section>
    );
  }

  return (
    <section className="post-list">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`} className="card post-card">
          <h2>{post.title}</h2>
          <div className="meta-row">
            <span>{post.authorName}</span>
            <span>{formatDateTime(post.createdAt)}</span>
            <span>조회 {post.viewCount}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
