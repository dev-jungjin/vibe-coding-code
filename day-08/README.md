# 8일차 — 화면과 서버의 역할 나누기

7일차 트랜잭션 게시판을 바탕으로, Server Component 와 Client Component 의 책임을 명확히 나누고, 글을 쓰거나 고친 뒤 목록을 전체 새로고침 없이 즉시 갱신하는 예제입니다.

## 이 폴더에서 배우는 것

- 데이터를 읽는 서버 컴포넌트와 입력을 받는 클라이언트 컴포넌트의 경계
- 변경 후 `revalidatePath('/')` + `router.refresh()` 로 목록 즉시 반영
- 개발자 도구 Network 탭에서 API 와 RSC 갱신 흐름 확인

## 7일차에서 늘어난 것

- `src/components/PostListServer.tsx`, `PostDetailCard.tsx` (Server Component)
- `src/components/PostCreateForm.tsx`, `PostSearchBar.tsx`, `PostActionPanel.tsx` (`'use client'`)
- 목록 검색(`/?q=`)은 클라이언트가 쿼리만 바꾸고, 필터링은 서버가 수행
- `docs/client-vs-server.md` — 경계 설명과 Network 탭 실습 가이드

## 실행 방법

```bash
cd day-08
cp .env.example .env
# .env 에 Supabase DATABASE_URL, DIRECT_URL 을 입력합니다.
npm install
npx prisma db push
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열고, `docs/client-vs-server.md` 의 Network 탭 가이드를 따라 확인해 보세요.

## 환경 변수

6~7일차와 동일합니다. `DATABASE_URL`, `DIRECT_URL`. `.env` 가 비어 있어도 `npm run build` 는 성공합니다.
