import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";
import { DatabaseSetupNotice } from "@/components/SetupNotice";
import { PostActionPanel } from "@/components/PostActionPanel";
import { PostDetailCard } from "@/components/PostDetailCard";
import { getCurrentUserProfile, isAdmin, isPostOwner } from "@/lib/auth";
import { incrementPostView } from "@/lib/board-transaction";
import { publicPostSelect } from "@/lib/post-dto";
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
    const [existing, auth] = await Promise.all([
      prisma.post.findUnique({
        where: { id },
        select: publicPostSelect,
      }),
      getCurrentUserProfile(),
    ]);

    if (!existing) {
      notFound();
    }

    if (existing.isHidden && !isAdmin(auth?.profile)) {
      notFound();
    }

    const post = existing.isHidden ? existing : await incrementPostView(prisma, id);
    const user = auth?.user ?? null;

    return (
      <div className="stack">
        <PostDetailCard post={post}>
          <PostActionPanel
            postId={post.id}
            canManage={isPostOwner(post, user)}
            isAuthenticated={Boolean(user)}
          />
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
