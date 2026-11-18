# CLAUDE.md — Day 06 Vibe Board

이 폴더는 'Claude AI 기반 바이브코딩 풀스택 웹개발' 6일차 실습 프로젝트입니다.

## 과정 맥락

- 과정명: Claude AI 기반 바이브코딩 풀스택 웹개발
- 오늘 목표: Supabase PostgreSQL + Prisma 익명 CRUD
- 스택: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Prisma

## 코딩 규칙

- 디렉토리명과 파일명은 영문 소문자 케밥케이스만 사용합니다. 경로에 한글, 공백, 특수문자를 넣지 않습니다.
- 장식용 이모지는 사용하지 않습니다. 보충 설명에만 `💡` 를 쓸 수 있습니다.
- 디자인 토큰은 GS Retail 값을 유지합니다: `#1E2530`, `#00D4EA`, `#F4F5FB`, `#FFFFFF`, Pretendard, 카드 모서리 18px, pill 버튼, 모바일 퍼스트.
- 비밀번호, 연결 문자열, 키를 소스코드에 하드코딩하지 않습니다. `.env.example` 만 버전 관리합니다.
- `passwordHash` 는 API 응답과 화면에 절대 노출하지 않습니다.
- 비밀번호 해시는 Node.js 내장 `crypto` 의 `scryptSync` / `timingSafeEqual` 만 사용합니다. 추가 네이티브 의존성을 넣지 않습니다.
- PrismaClient 는 `src/lib/prisma.ts` 싱글톤만 사용합니다.
- DB 를 조회하는 페이지는 `export const dynamic = "force-dynamic"` 을 지정하고, `DATABASE_URL` 이 없거나 DB 에 연결할 수 없을 때 빌드가 실패하지 않도록 처리합니다.

## 데이터 모델

`Post`: `id`, `title`, `content`, `authorName`, `passwordHash`, `viewCount`, `createdAt`, `updatedAt`

## 수정/삭제 권한

- 비밀번호가 없으면 `401`
- 비밀번호가 틀리면 `403`
- 글이 없으면 `404`

## 작업 방식

수강생이 자연어로 기능을 요청하면, 기존 파일을 최소 변경으로 수정하고, 새 의존성을 추가하기 전에 이 문서의 제약을 확인합니다.
