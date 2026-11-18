# 4일차 — 프로젝트를 만들고 첫 화면 띄워 보기

Next.js 15 App Router, TypeScript, Tailwind CSS 로 만든 **바이브코딩 자유게시판** 의 첫 뼈대입니다. 데이터베이스 없이 `src/data/mockPosts.ts` 의 가짜 데이터로 글 목록과 상세 화면을 보여 줍니다.

## 학습 목표

- Next.js 의 `src/app` 폴더 구조와 동적 라우트(`posts/[id]`)를 이해합니다.
- `CLAUDE.md` 에 기술 스택, 디자인 토큰, 경로 규칙을 적어 세션이 바뀌어도 AI 가 같은 제약을 따르게 합니다.
- 가짜 데이터만으로 목록과 상세 화면을 먼저 완성한 뒤, 다음 회차에 API 와 저장소를 연결할 자리를 마련합니다.

## 폴더 구조

```text
day-04/
├── CLAUDE.md                 # AI 작업 규칙
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── src/
    ├── data/mockPosts.ts     # 가짜 게시글 데이터
    └── app/
        ├── globals.css       # GS Retail 토큰 + Tailwind
        ├── layout.tsx        # 공통 헤더 / 푸터
        ├── page.tsx          # 글 목록
        ├── not-found.tsx
        └── posts/[id]/page.tsx  # 글 상세
```

## 실행 방법

이 폴더에서 아래 명령을 실행합니다.

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다. 카드의 제목이나 "자세히 보기"를 누르면 `/posts/welcome` 과 같은 상세 주소로 이동합니다.

프로덕션 빌드를 확인하려면 다음을 실행합니다.

```bash
npx tsc --noEmit
npm run build
```

## 디자인

배경 `#F4F5FB`, 카드 `#FFFFFF`, 주 색 `#1E2530`, 강조 `#00D4EA`, 모서리 18px, 서체 Pretendard 를 Tailwind `@theme` 으로 등록했습니다. 목록은 모바일에서 1열, `md` 이상에서 2열 카드 그리드입니다.

## 관련 자료

- 작업 규칙: `CLAUDE.md`
- 이전 회차(Vercel 배포 정적 사이트): `../day-03/`
- 다음 회차(데이터 모델링과 REST API CRUD): `../day-05/`

💡 글을 수정해 보고 싶다면 `src/data/mockPosts.ts` 에 항목을 추가하거나 문장을 바꾼 뒤, 개발 서버가 켠 상태로 브라우저를 새로고침하면 됩니다. 아직 화면에서 글을 쓰거나 지울 수는 없습니다. 그 기능은 5일차에 추가합니다.
