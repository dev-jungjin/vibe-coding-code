import { PostCreateForm } from "@/components/PostCreateForm";
import { DatabaseSetupNotice } from "@/components/SetupNotice";
import { isDatabaseConfigured } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div className="stack">
      <section className="page-hero">
        <div>
          <span className="badge">새 글</span>
          <h1>게시글 작성</h1>
          <p>제목, 본문, 작성자 이름과 함께 수정/삭제용 비밀번호를 입력합니다.</p>
        </div>
      </section>
      {isDatabaseConfigured() ? <PostCreateForm /> : <DatabaseSetupNotice />}
    </div>
  );
}
