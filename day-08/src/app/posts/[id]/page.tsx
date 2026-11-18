import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";
import { DatabaseSetupNotice } from "@/components/SetupNotice";
import { PostActionPanel } from "@/components/PostActionPanel";
import { PostDetailCard } from "@/components/PostDetailCard";
import { incrementPostView } from "@/lib/board-transaction";
import { getPrismaOrNull } from "@/lib/prisma";

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
    const post = await incrementPostView(prisma, id);

    return (
      <div className="stack">
        <PostDetailCard post={post}>
          <PostActionPanel postId={post.id} />
        </PostDetailCard>
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
