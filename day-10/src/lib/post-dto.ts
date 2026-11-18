import type { Post } from "@prisma/client";

export type PublicPost = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorId: string | null;
  authorEmail: string | null;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PublicPostJson = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorId: string | null;
  authorEmail: string | null;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
};

/** passwordHash 는 응답에 절대 포함하지 않습니다. */
export function toPublicPost(post: Post): PublicPost {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    authorName: post.authorName,
    authorId: post.authorId ?? null,
    authorEmail: post.authorEmail ?? null,
    viewCount: post.viewCount,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

export function toPublicPostJson(post: PublicPost | Post): PublicPostJson {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    authorName: post.authorName,
    authorId: post.authorId ?? null,
    authorEmail: post.authorEmail ?? null,
    viewCount: post.viewCount,
    createdAt: post.createdAt instanceof Date ? post.createdAt.toISOString() : post.createdAt,
    updatedAt: post.updatedAt instanceof Date ? post.updatedAt.toISOString() : post.updatedAt,
  };
}

export const publicPostSelect = {
  id: true,
  title: true,
  content: true,
  authorName: true,
  authorId: true,
  authorEmail: true,
  viewCount: true,
  createdAt: true,
  updatedAt: true,
} as const;
