import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getPrisma(): PrismaClient {
  if (!prisma) {
    throw new Error("DATABASE_URL 이 설정되지 않았습니다. .env.example 을 참고해 .env 를 만들어 주세요.");
  }
  return prisma;
}

export function getPrismaOrNull(): PrismaClient | null {
  return prisma ?? null;
}
