# CLAUDE.md — Day 07 Vibe Board

이 폴더는 'Claude AI 기반 바이브코딩 풀스택 웹개발' 7일차 실습 프로젝트입니다. 6일차 익명 CRUD 를 기반으로 트랜잭션 무결성을 추가합니다.

## 과정 맥락

- 오늘 목표: Prisma `$transaction` 으로 여러 쓰기를 모두 성공하거나 모두 취소하기
- 스택: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Prisma

## 코딩 규칙

- 디렉토리명과 파일명은 영문 소문자 케밥케이스만 사용합니다.
- 장식용 이모지는 사용하지 않습니다. 보충 설명에만 `💡` 를 쓸 수 있습니다.
- 디자인 토큰은 GS Retail 값을 유지합니다: `#1E2530`, `#00D4EA`, `#F4F5FB`, `#FFFFFF`, Pretendard, 카드 모서리 18px, pill 버튼, 모바일 퍼스트.
- 비밀번호 해시는 Node.js 내장 `crypto` 의 `scryptSync` / `timingSafeEqual` 만 사용합니다.
- PrismaClient 는 `src/lib/prisma.ts` 싱글톤만 사용합니다.
- 글 작성과 삭제는 반드시 `prisma.$transaction(async (tx) => { ... })` 안에서 `Post` + `BoardStat` + `PostAuditLog` 를 함께 갱신합니다.
- `/api/transaction-demo` 는 `simulateError: true` 일 때 트랜잭션 중간 예외를 던져 전체 롤백을 보여 줍니다.
- DB 를 조회하는 페이지는 `export const dynamic = "force-dynamic"` 을 지정하고, DB 가 없어도 빌드가 실패하지 않게 합니다.

## 데이터 모델

- `Post`: 6일차와 동일
- `BoardStat`: `id` (항상 `"singleton"`), `totalPosts`, `totalViews`, `updatedAt`
- `PostAuditLog`: `id`, `postId`, `action`, `summary`, `createdAt` (글 삭제 후에도 로그를 남기기 위해 외래 키를 걸지 않습니다)
