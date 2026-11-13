# 바이브코딩 풀스택 웹개발 — 실습 코드

Claude AI 기반 바이브코딩 풀스택 웹개발 과정의 회차별 완성 코드 저장소입니다. 각 폴더는 그 회차의 실습만 열어 독립적으로 실행할 수 있도록 구성되어 있습니다.

- 과정: 총 24회차 / 72시간 (이 저장소의 1개월차 범위는 `day-01` ~ `day-12`)
- 강사: 양준렬 (대한민국인공지능에듀테크협회)
- 핵심 스택: Next.js, TypeScript, Tailwind CSS, Supabase, Prisma, Vercel, Claude Code

## 폴더 규칙

- 실습 폴더 이름은 반드시 영문 소문자 케밥케이스입니다. 예: `day-01`, `day-02`.
- 경로와 파일명에 한글이나 공백을 쓰지 않습니다. 한글 설명은 각 폴더의 `README.md` 에 적습니다.
- 이전 회차 코드를 바탕으로 다음 회차 요구사항을 쌓는 방식입니다. 회차마다 프레임워크를 새로 갈아타지 않습니다.
- Vercel 로 배포할 때는 저장소 루트가 아니라, 해당 회차 폴더를 **Root Directory** 로 지정합니다. 예: `day-03`.

## 회차 인덱스 (1~12일차)

| 폴더 | 주제 | 구성 | 상태 | 실행 방법 |
| --- | --- | --- | --- | --- |
| `day-01` | 개발 환경과 첫 반응형 웹페이지 | 단일 HTML/CSS 자기소개 페이지 | 완료 | `index.html` 을 브라우저로 열거나 `npx serve .` |
| `day-02` | 말로 시켜서 소개 사이트 만들기 | 홈·소개·프로젝트 다중 페이지, 공통 내비게이션, 프롬프트 3요소 | 완료 | `day-02` 에서 `npx serve .` |
| `day-03` | 내 사이트를 인터넷에 공개하기 | 2일차 확장 + 문의 페이지, Git/Vercel 배포 체크리스트 | 완료 | `day-03` 에서 `npx serve .` 후 `DEPLOY-CHECKLIST.md` 참고 |
| `day-04` | 프로젝트를 만들고 첫 화면 띄워 보기 | Next.js 15 게시판 뼈대, `CLAUDE.md`, 가짜 데이터 목록·상세 | 완료 | `cd day-04 && npm install && npm run dev` |
| `day-05` | 개발자들의 언어 이해하고 CRUD 연습 | 데이터 모델, Prisma 초안, 메모리 저장소 REST API (조회·작성·수정·삭제) | 완료 | `cd day-05 && npm install && npm run dev` |
| `day-06` | 데이터를 연결해 글 목록·상세·수정·삭제 만들기 | Supabase 프로젝트, Prisma 연결, 비밀번호로 본인을 확인하는 익명 게시판 | 완료 | `cd day-06 && npm install && npm run dev` |
| `day-07` | 모두 성공하거나 모두 취소하기 | Prisma `$transaction` 으로 여러 작업을 묶고, 오류 시 롤백을 확인합니다. | 완료 | `cd day-07 && npm install && npm run dev` |
| `day-08` | 화면과 서버의 역할 나누기 | Client/Server Component 경계를 정리하고, 작성·수정 후 목록을 즉시 갱신합니다. | 완료 | `cd day-08 && npm install && npm run dev` |
| `day-09` | 회원가입과 로그인 만들기 | Supabase Auth 로 가입, 이메일 로그인, 로그아웃, 보호 페이지를 만듭니다. | 완료 | `cd day-09 && npm install && npx prisma db push && npm run dev` |
| `day-10` | 내 글은 나만 고칠 수 있게 하기 | 글에 작성자 아이디를 연결하고, 서버에서 본인만 수정·삭제하도록 검사합니다. | 완료 | `cd day-10 && npm install && npx prisma db push && npm run dev` |
| `day-11` | 관리자 권한으로 전체 글 관리하기 | 역할(Admin) 기반 권한으로 모든 글을 숨기거나 삭제하고, 일반 사용자의 관리 페이지 접근을 막습니다. | 완료 | `cd day-11 && npm install && npx prisma db push && npm run dev` |
| `day-12` | 문제가 생기면 로그에서 원인 찾기 | 로그 규칙을 정하고, 일부러 만든 오류와 Vercel 배포 로그에서 원인을 찾습니다. | 완료 | `cd day-12 && npm install && npx prisma db push && npm run dev` |

`day-06` ~ `day-12` 폴더는 실행 전 각 폴더 안의 `.env.example` 을 `.env` 로 복사해 Supabase/PostgreSQL 연결 정보를 입력한 뒤 실행하세요.

## 공통 디자인

1일차부터 12일차까지 아래 토큰과 레이아웃 원칙을 유지합니다.

- 주 색 `#1E2530`, 강조 `#00D4EA`, 배경 `#F4F5FB`, 카드 `#FFFFFF`
- 카드 모서리 18px, 서체 Pretendard
- 모바일 퍼스트: 기본은 단일 열, `@media (min-width: 768px)` 또는 Tailwind `md:` 에서 여러 열로 확장

자세한 명세는 각 정적 사이트 폴더의 `design.md`, Next.js 폴더의 `src/app/globals.css` 와 `CLAUDE.md` 를 참고하세요.
