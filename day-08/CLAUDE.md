# CLAUDE.md — Day 08 Vibe Board

이 폴더는 'Claude AI 기반 바이브코딩 풀스택 웹개발' 8일차 실습 프로젝트입니다. 7일차 트랜잭션 CRUD 위에 Client/Server Component 경계를 분명히 합니다.

## 과정 맥락

- 오늘 목표: 화면 코드와 서버 코드의 역할을 나누고, 변경 후 목록을 즉시 갱신하기
- 스택: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Prisma

## 코딩 규칙

- 디렉토리명과 파일명은 영문 소문자 케밥케이스만 사용합니다.
- 장식용 이모지는 사용하지 않습니다. 보충 설명에만 `💡` 를 쓸 수 있습니다.
- 디자인 토큰은 GS Retail 값을 유지합니다.
- Prisma, 비밀번호 해시, 환경 변수는 Server Component 또는 Route Handler 에서만 사용합니다. Client Component 로 비밀 값을 전달하지 않습니다.
- 데이터를 보여주는 목록/상세는 Server Component (`PostListServer`, `PostDetailCard`) 를 유지합니다.
- 입력, 검색, 삭제 확인은 `'use client'` 컴포넌트 (`PostCreateForm`, `PostSearchBar`, `PostActionPanel`) 에서만 처리합니다.
- 변경 API 는 `revalidatePath('/')` 를 호출하고, 해당 Client Component 는 성공 후 `router.refresh()` 를 호출합니다. 둘을 짝으로 유지합니다.
- DB 를 조회하는 페이지는 `export const dynamic = "force-dynamic"` 을 지정하고, DB 가 없어도 빌드가 실패하지 않게 합니다.

## 컴포넌트 경계

자세한 설명과 Network 탭 확인 방법은 `docs/client-vs-server.md` 를 따릅니다.
