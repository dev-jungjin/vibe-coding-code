import Link from "next/link";
import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";
import { DeletePostForm } from "@/components/DeletePostForm";
import { DatabaseSetupNotice } from "@/components/SetupNotice";
import { formatDateTime } from "@/lib/format";
import { getPrismaOrNull } from "@/lib/prisma";
import { publicPostSelect } from "@/lib/post-dto";

export const dynamic = "force-dynamic";

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const prisma = getPrismaOrNull();

  if (!prisma) {
    return <DatabaseSetupNotice />;
  }

  try {
    const post = await prisma.post.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
      select: publicPostSelect,
    });

    return (
      <div className="stack">
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
          <div className="form-actions">
            <Link href={`/posts/${post.id}/edit`} className="btn btn-primary">
              수정하기
            </Link>
            <Link href="/" className="btn btn-ghost">
              목록으로
            </Link>
          </div>
        </section>
        <DeletePostForm postId={post.id} />
      </div>
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      notFound();
    }
    console.error("[PostDetailPage] failed to load post", error);
    return <DatabaseSetupNotice />;
  }
}
