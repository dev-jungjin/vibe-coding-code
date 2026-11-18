import type { User } from "@supabase/supabase-js";
import type { UserProfile } from "@prisma/client";
import { createClient } from "@/lib/supabase/server";
import { getPrismaOrNull } from "@/lib/prisma";

export type AuthContext = {
  user: User;
  profile: UserProfile | null;
};

export async function getSessionUser(): Promise<User | null> {
  const supabase = await createClient();
  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ?? null;
}

export async function getCurrentUserProfile(): Promise<AuthContext | null> {
  const user = await getSessionUser();
  if (!user) {
    return null;
  }

  const prisma = getPrismaOrNull();
  if (!prisma || !user.email) {
    return { user, profile: null };
  }

  try {
    const profile = await prisma.userProfile.upsert({
      where: { email: user.email },
      create: {
        id: user.id,
        email: user.email,
        role: "USER",
      },
      update: {},
    });
    return { user, profile };
  } catch (error) {
    console.error("[getCurrentUserProfile] failed to load profile", error);
    return { user, profile: null };
  }
}

export async function requireAdmin(): Promise<AuthContext | null> {
  const result = await getCurrentUserProfile();
  if (!result?.profile || result.profile.role !== "ADMIN") {
    return null;
  }
  return result;
}

export function isAdmin(profile: UserProfile | null | undefined): boolean {
  return profile?.role === "ADMIN";
}

export function isPostOwner(post: { authorId?: string | null }, user: User | null): boolean {
  return Boolean(user && post.authorId && post.authorId === user.id);
}
