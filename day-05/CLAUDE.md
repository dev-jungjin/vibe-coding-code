# 바이브코딩 자유게시판 — 프로젝트 규칙 (5일차)

이 파일은 Claude Code 가 이 폴더에서 작업할 때 따라야 할 규칙입니다. 세션이 바뀌어도 이 문서를 먼저 읽고 코드를 수정하세요.

## 기술 스택

- Next.js 15 App Router (`src/app`)
- TypeScript (strict)
- Tailwind CSS
- 데이터는 `src/lib/mockStore.ts` 의 메모리 저장소를 사용합니다.
- REST API 는 `src/app/api/posts/route.ts` (GET, POST) 와 `src/app/api/posts/[id]/route.ts` (GET, PATCH, DELETE) 입니다.
- `prisma/schema.prisma` 는 6일차를 위한 초안입니다. 이 회차에서 Prisma Client 를 설치하거나 마이그레이션을 실행하지 않습니다.

## 경로와 파일 이름

- 폴더명과 파일명은 영문 소문자 케밥케이스, 또는 Next.js / TypeScript 표준 이름만 사용합니다.
- 경로에 한글, 공백, 특수문자를 쓰지 않습니다. 한글 설명은 코드 주석이나 README, `docs/data-model.md` 에만 적습니다.

## 디자인

- GS Retail 디자인 토큰을 사용합니다. 값은 `src/app/globals.css` 의 `@theme` 에 정의되어 있습니다.
  - primary-dark: `#1E2530` (주요 버튼 배경, 제목)
  - signature-cyan: `#00D4EA` (뱃지, 강조 막대 등 브랜드 표면)
  - neutral-50: `#F4F5FB` (페이지 배경)
  - white: `#FFFFFF` (카드)
  - 카드 모서리 18px (`rounded-card`), 버튼과 태그는 pill (`rounded-pill`)
  - 서체: Pretendard
- 1차 액션 버튼은 `#1E2530` 배경 + 흰 글자입니다. 청록색을 큰 버튼 배경으로 쓰지 않습니다.

## 레이아웃

- 처음부터 모바일 퍼스트 반응형으로 작성합니다.
- 기본 스타일은 단일 열입니다. `md:` (`min-width: 768px`) 이상에서만 여러 열로 확장합니다.
- 고정 폭(`w-[500px]` 등)으로 레이아웃을 잠그지 않습니다. `w-full`, `max-w-*`, `flex`, `grid` 를 사용합니다.

## 화면과 API 범위 (5일차)

- `/` : 게시글 목록
- `/posts/new` : 글 작성
- `/posts/[id]` : 게시글 상세, 수정, 삭제
- 인증, 비밀번호 확인, Prisma, Supabase 는 다음 회차에서 추가합니다.
- 목록·상세 페이지는 `force-dynamic` 으로 두어 저장소의 최신 상태를 읽습니다.
- 작성·수정·삭제 폼은 Route Handler API 를 호출합니다. 화면에서 `mockStore` 를 직접 바꾸지 않습니다.

## 데이터 규칙

- 필드 이름은 `src/types/post.ts` 와 `prisma/schema.prisma` 를 기준으로 통일합니다.
- 제목, 작성자, 본문은 필수입니다. 비어 있으면 API 가 400 을 반환합니다.
- 없는 아이디에 대한 조회·수정·삭제는 404 입니다.

## 작업 원칙

- 두루뭉술한 코드 생성보다, 기존 파일의 구조와 토큰을 재사용하는 작은 수정을 우선합니다.
- 장식용 이모지는 넣지 않습니다. 꼭 필요한 콜아웃에만 `💡` 를 쓸 수 있습니다.
