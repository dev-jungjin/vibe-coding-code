import { notFound } from "next/navigation";
import { EditPostForm } from "@/components/EditPostForm";
import { DatabaseSetupNotice } from "@/components/SetupNotice";
import { publicPostSelect } from "@/lib/post-dto";
import { safeQuery } from "@/lib/safe-db";

export const dynamic = "force-dynamic";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const { data: post, error } = await safeQuery(
    (prisma) =>
      prisma.post.findUnique({
        where: { id },
        select: publicPostSelect,
      }),
    null,
  );

  if (error) {
    return <DatabaseSetupNotice />;
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="stack">
      <section className="page-hero">
        <div>
          <span className="badge">수정</span>
          <h1>게시글 수정</h1>
          <p>작성 시 정한 비밀번호가 일치할 때만 저장됩니다.</p>
        </div>
      </section>
      <EditPostForm postId={post.id} defaultTitle={post.title} defaultContent={post.content} />
    </div>
  );
}
