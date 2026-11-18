# 9일차 — 회원가입과 로그인 만들기

8일차 게시판 위에 Supabase Auth 를 더해 회원가입, 로그인, 로그아웃과 로그인한 사용자만 볼 수 있는 마이페이지를 구현한 예제입니다.

## 이 폴더에서 배우는 것

- `@supabase/ssr` 로 브라우저/서버/미들웨어에서 세션 쿠키를 다루는 방법
- `/signup`, `/login`, `/mypage` 와 헤더의 `AuthNav` (로그인/로그아웃)
- 미로그인 사용자가 `/mypage` 에 접근하면 `/login` 으로 보내는 보호 라우트

## 8일차에서 늘어난 것

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`
- `src/middleware.ts` — 세션 갱신, `/mypage` 보호, 환경 변수가 없으면 그냥 통과
- `AuthNav` 가 헤더에 로그인 상태와 로그아웃 버튼을 표시

게시글 CRUD 는 아직 익명 비밀번호 방식입니다. 작성자 ID 를 글에 연결하는 인가는 10일차에서 다룹니다.

## 실행 방법

```bash
cd day-09
cp .env.example .env
# DATABASE_URL, DIRECT_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 를 입력합니다.
npm install
npx prisma db push
npm run dev
```

수업에서 바로 로그인되게 하려면 Supabase 대시보드 Authentication > Sign In / Providers > User Signups 에서 **Confirm email** 을 끄고 Save changes 를 누르면 됩니다. Site URL 은 Authentication > URL Configuration 에서 `http://localhost:3000` 으로 맞춥니다. `NEXT_PUBLIC_SUPABASE_ANON_KEY` 는 Project Settings > API Keys 의 anon public 키를 쓰고, `service_role` 키는 사용하지 않습니다.

환경 변수가 비어 있어도 `npm run build` 는 성공합니다. 인증 페이지는 설정 안내를 보여 주고, 미들웨어는 세션 갱신을 건너뜁니다.
