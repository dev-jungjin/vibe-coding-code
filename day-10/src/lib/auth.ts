import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

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

export function isPostOwner(post: { authorId?: string | null }, user: User | null): boolean {
  return Boolean(user && post.authorId && post.authorId === user.id);
}
