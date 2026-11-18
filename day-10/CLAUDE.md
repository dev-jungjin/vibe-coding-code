# CLAUDE.md — Day 10 Vibe Board

이 폴더는 'Claude AI 기반 바이브코딩 풀스택 웹개발' 10일차 실습 프로젝트입니다. 9일차 인증 위에 작성자 인가를 추가합니다.

## 과정 맥락

- 오늘 목표: 내 글만 수정·삭제할 수 있도록 서버에서 소유권을 검사하기
- 스택: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Prisma, Supabase Auth

## 코딩 규칙

- 디렉토리명과 파일명은 영문 소문자 케밥케이스만 사용합니다.
- 장식용 이모지는 사용하지 않습니다. 보충 설명에만 `💡` 를 쓸 수 있습니다.
- 디자인 토큰은 GS Retail 값을 유지합니다.
- `POST /api/posts` 는 반드시 `supabase.auth.getUser()` 로 세션을 확인하고, `authorId = user.id`, `authorEmail = user.email` 을 저장합니다. 세션이 없으면 `401` 입니다.
- `PATCH` 와 `DELETE` 는 로그인 여부를 먼저 검사하고(`401`), 이어서 `post.authorId === user.id` 를 검사합니다. 다른 사용자면 `403 Forbidden` 입니다. UI 숨김만으로 권한을 판단하지 않습니다.
- `passwordHash` 는 하위 호환을 위해 스키마에 남아 있을 수 있지만, 10일차의 권한 결정은 세션 소유권입니다.
- DB 또는 Auth 환경 변수가 없어도 `npm run build` 가 성공해야 합니다.
