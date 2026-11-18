import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;

/**
 * 게시글 수정/삭제 확인용 비밀번호 해시.
 * 추가 네이티브 의존성 없이 Node.js 내장 crypto.scryptSync 를 사용합니다.
 * 저장 형식: hex(salt):hex(hash)
 */
export function hashPassword(plain: string): string {
  const salt = randomBytes(SALT_LENGTH);
  const hash = scryptSync(plain, salt, KEY_LENGTH);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

export function verifyPassword(plain: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) {
    return false;
  }

  try {
    const salt = Buffer.from(saltHex, "hex");
    const expected = Buffer.from(hashHex, "hex");
    const actual = scryptSync(plain, salt, expected.length);
    if (actual.length !== expected.length) {
      return false;
    }
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
