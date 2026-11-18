# 7일차 — 모두 성공하거나 모두 취소하기: 트랜잭션으로 데이터 지키기

6일차 익명 CRUD 위에 Prisma `$transaction` 을 더해, 글 작성과 삭제를 게시판 통계(`BoardStat`) 및 감사 로그(`PostAuditLog`)와 한 묶음으로 처리하는 예제입니다.

## 이 폴더에서 배우는 것

- 여러 테이블 쓰기를 `prisma.$transaction(async (tx) => { ... })` 로 묶는 방법
- 트랜잭션 중간에 오류가 나면 이미 실행한 쓰기도 모두 롤백되는지 확인하는 방법
- `/transaction-lab` 에서 정상 커밋과 오류 시뮬레이션을 눈으로 비교하기

## 6일차에서 늘어난 것

- `BoardStat` 싱글톤: `totalPosts`, `totalViews`, `updatedAt`
- `PostAuditLog`: `postId`, `action`, `summary`, `createdAt`
- 글 작성/삭제는 통계와 감사 로그를 같은 트랜잭션에서 갱신
- `POST /api/transaction-demo` — `{ title, content, authorName, simulateError?: boolean }`
- `/transaction-lab` 실습 화면

## 실행 방법

```bash
cd day-07
cp .env.example .env
# .env 에 Supabase DATABASE_URL, DIRECT_URL 을 입력합니다.
npm install
npx prisma db push
npm run dev
```

브라우저에서 [http://localhost:3000/transaction-lab](http://localhost:3000/transaction-lab) 을 엽니다.

1. **정상 커밋**을 누르면 글 수와 감사 로그가 함께 증가합니다.
2. **중간 오류 시뮬레이션**을 누르면 API 가 트랜잭션 한가운데에서 예외를 던집니다. 새로고침 후 글 수, 통계, 로그가 변하지 않아야 합니다.

## 환경 변수

6일차와 동일합니다. `DATABASE_URL`, `DIRECT_URL`. `.env` 가 비어 있어도 `npm run build` 는 성공합니다.
