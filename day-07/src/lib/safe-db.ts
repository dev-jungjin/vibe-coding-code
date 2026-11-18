import type { PrismaClient } from "@prisma/client";
import { getPrismaOrNull } from "@/lib/prisma";

export async function safeQuery<T>(
  fn: (prisma: PrismaClient) => Promise<T>,
  fallback: T,
): Promise<{ data: T; error: "unconfigured" | "unreachable" | null }> {
  const prisma = getPrismaOrNull();
  if (!prisma) {
    return { data: fallback, error: "unconfigured" };
  }

  try {
    const data = await fn(prisma);
    return { data, error: null };
  } catch (error) {
    console.error("[safeQuery] database query failed", error);
    return { data: fallback, error: "unreachable" };
  }
}
