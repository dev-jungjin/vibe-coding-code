/**
 * Prisma CLI 래퍼.
 * schema.prisma 가 DATABASE_URL / DIRECT_URL 을 참조하므로
 * 로컬에 .env 가 아직 없어도 generate / validate 가 실패하지 않도록
 * 플레이스홀더 값을 임시로만 주입합니다. 실제 DB 접속에는 사용되지 않습니다.
 */
const { spawnSync } = require("node:child_process");

const env = { ...process.env };
if (!env.DATABASE_URL) {
  env.DATABASE_URL =
    "postgresql://placeholder:placeholder@127.0.0.1:5432/placeholder";
}
if (!env.DIRECT_URL) {
  env.DIRECT_URL = env.DATABASE_URL;
}

const result = spawnSync("prisma", process.argv.slice(2), {
  stdio: "inherit",
  env,
  shell: true,
});

process.exit(result.status === null ? 1 : result.status);
