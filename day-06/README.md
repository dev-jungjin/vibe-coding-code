# 6일차 — 데이터를 연결해 글 목록, 상세, 수정, 삭제 만들기

Supabase PostgreSQL 과 Prisma 를 연결해 익명 게시판의 기본 CRUD 를 구현한 예제입니다. 글 작성 시 정한 비밀번호 해시로 수정·삭제 본인 확인을 합니다.

## 이 폴더에서 배우는 것

- Supabase 프로젝트의 PostgreSQL 을 Prisma 로 연결하는 방법
- `Post` 모델 스키마 작성 및 `prisma db push` 로 테이블 반영
- 글 목록(`/`), 작성(`/posts/new`), 상세(`/posts/[id]`), 수정(`/posts/[id]/edit`)
- `GET|POST /api/posts`, `GET|PATCH|DELETE /api/posts/[id]`
- 비밀번호 불일치 시 `401`(미입력) / `403`(불일치) 응답

## 실행 방법

```bash
cd day-06
cp .env.example .env
# .env 에 Supabase DATABASE_URL, DIRECT_URL 을 입력합니다.
npm install
npx prisma db push
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다.

## 환경 변수

| 이름 | 설명 |
| --- | --- |
| `DATABASE_URL` | Prisma 가 사용할 풀러 연결 문자열 (포트 6543, `pgbouncer=true`) |
| `DIRECT_URL` | `db push`·마이그레이션용 연결 (같은 풀러 호스트, 포트 5432) |

두 값은 Supabase 프로젝트 상단 바의 **Connect** 버튼 > **ORM** 탭 > **Prisma** > `.env.local` 탭에서 복사합니다. 형식은 `postgresql://postgres.PROJECT_REF:PASSWORD@aws-1-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true` 이며, `DIRECT_URL` 은 포트만 `5432` 입니다.

`.env` 가 비어 있어도 `npm run build` 는 실패하지 않습니다. 페이지는 설정 안내 화면을 보여주고, API 는 `503` 을 반환합니다.

## 주요 파일

- `prisma/schema.prisma` — `Post` 모델
- `src/lib/prisma.ts` — PrismaClient 싱글톤, `DATABASE_URL` 없을 때 안전하게 통과
- `src/lib/password.ts` — Node.js `crypto.scryptSync` / `timingSafeEqual` 해시 검증
- `src/app/api/posts/` — 익명 CRUD API

## 배포 참고

Vercel 에서 이 폴더를 Root Directory 로 지정하고, 같은 환경 변수를 Project Settings 에 등록합니다.
