import { Prisma, type Post, type PrismaClient } from "@prisma/client";
import { publicPostSelect } from "@/lib/post-dto";

const STAT_ID = "singleton";

type CreatePostInput = {
  title: string;
  content: string;
  authorName: string;
  passwordHash?: string;
  authorId?: string | null;
  authorEmail?: string | null;
};

type CreateOptions = {
  simulateError?: boolean;
};

export class SimulatedTransactionError extends Error {
  constructor() {
    super("Simulated mid-transaction failure");
    this.name = "SimulatedTransactionError";
  }
}

async function touchBoardStat(
  tx: Prisma.TransactionClient,
  update: { totalPosts?: number; totalViews?: number },
) {
  const current = await tx.boardStat.findUnique({ where: { id: STAT_ID } });
  const nextPosts = Math.max(0, (current?.totalPosts ?? 0) + (update.totalPosts ?? 0));
  const nextViews = Math.max(0, (current?.totalViews ?? 0) + (update.totalViews ?? 0));

  return tx.boardStat.upsert({
    where: { id: STAT_ID },
    create: { id: STAT_ID, totalPosts: nextPosts, totalViews: nextViews },
    update: { totalPosts: nextPosts, totalViews: nextViews },
  });
}

export async function createPostWithIntegrity(
  prisma: PrismaClient,
  input: CreatePostInput,
  options: CreateOptions = {},
) {
  return prisma.$transaction(async (tx) => {
    const post = await tx.post.create({
      data: input,
      select: publicPostSelect,
    });

    await touchBoardStat(tx, { totalPosts: 1 });

    await tx.postAuditLog.create({
      data: {
        postId: post.id,
        action: "CREATE",
        summary: `Created post "${post.title}" by ${post.authorName}`,
      },
    });

    if (options.simulateError) {
      throw new SimulatedTransactionError();
    }

    return post;
  });
}

export async function deletePostWithIntegrity(prisma: PrismaClient, post: Post) {
  return prisma.$transaction(async (tx) => {
    await tx.post.delete({ where: { id: post.id } });

    await touchBoardStat(tx, {
      totalPosts: -1,
      totalViews: -post.viewCount,
    });

    await tx.postAuditLog.create({
      data: {
        postId: post.id,
        action: "DELETE",
        summary: `Deleted post "${post.title}"`,
      },
    });
  });
}

export async function incrementPostView(prisma: PrismaClient, id: string) {
  return prisma.$transaction(async (tx) => {
    const post = await tx.post.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
      select: publicPostSelect,
    });

    await touchBoardStat(tx, { totalViews: 1 });
    return post;
  });
}
