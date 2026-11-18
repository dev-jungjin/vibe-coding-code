# CLAUDE.md — Day 11 Vibe Board

이 폴더는 'Claude AI 기반 바이브코딩 풀스택 웹개발' 11일차 실습 프로젝트입니다. 10일차 작성자 인가 위에 역할 기반 접근 제어를 추가합니다.

## 과정 맥락

- 오늘 목표: USER 와 ADMIN 을 구분하고, 관리자가 전체 글을 운영할 수 있게 하기
- 스택: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Prisma, Supabase Auth

## 코딩 규칙

- 디렉토리명과 파일명은 영문 소문자 케밥케이스만 사용합니다.
- 장식용 이모지는 사용하지 않습니다. 보충 설명에만 `💡` 를 쓸 수 있습니다.
- 디자인 토큰은 GS Retail 값을 유지합니다.
- 역할 확인은 서버의 `UserProfile` 을 기준으로 합니다. 클라이언트 숨김만으로 관리자 권한을 판단하지 않습니다.
- `src/lib/auth.ts` 에서 세션 사용자를 조회하고 `UserProfile` 이 없으면 `USER` 로 생성합니다. `ADMIN` 승격은 코드 기본값이 아니라 데이터 변경으로 수행합니다.
- `/api/admin/posts/[id]` 의 `PATCH`(숨김 토글)와 `DELETE`(강제 삭제)는 관리자가 아니면 `403` 을 반환합니다.
- 공개 목록과 상세는 `isHidden = true` 인 글을 일반 사용자에게 보여 주지 않습니다.
- `/admin` 은 미로그인 사용자에게 로그인 안내를, `USER` 에게는 접근 거부 UI 를 보여 줍니다.
- DB 또는 Auth 환경 변수가 없어도 `npm run build` 가 성공해야 합니다.
