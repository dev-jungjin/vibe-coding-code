# CLAUDE.md — Day 09 Vibe Board

이 폴더는 'Claude AI 기반 바이브코딩 풀스택 웹개발' 9일차 실습 프로젝트입니다. 8일차 구조 위에 Supabase Auth 를 추가합니다.

## 과정 맥락

- 오늘 목표: 회원가입, 로그인, 로그아웃, 보호된 마이페이지
- 스택: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Prisma, Supabase Auth

## 코딩 규칙

- 디렉토리명과 파일명은 영문 소문자 케밥케이스만 사용합니다.
- 장식용 이모지는 사용하지 않습니다. 보충 설명에만 `💡` 를 쓸 수 있습니다.
- 디자인 토큰은 GS Retail 값을 유지합니다.
- Supabase 키와 DB URL 을 소스에 하드코딩하지 않습니다.
- 브라우저 클라이언트는 `src/lib/supabase/client.ts`, 서버는 `src/lib/supabase/server.ts` 만 사용합니다.
- `src/middleware.ts` 는 세션을 갱신하고 `/mypage` 를 보호합니다. `NEXT_PUBLIC_SUPABASE_URL` 또는 `ANON_KEY` 가 없으면 바로 `NextResponse.next()` 를 반환해야 하며, 빌드나 기동이 실패하면 안 됩니다.
- 보호가 필요한 페이지는 미들웨어와 서버 컴포넌트 `supabase.auth.getUser()` 를 함께 사용합니다. 클라이언트에만 의존하지 않습니다.
- Prisma 와 `crypto` 비밀번호 해시는 서버에서만 사용합니다.
- DB 또는 Auth 환경 변수가 없어도 `npm run build` 가 성공해야 합니다.

## 오늘 범위

글 작성/수정/삭제의 작성자 인가는 아직 넣지 않습니다. 그 작업은 10일차 범위입니다.
