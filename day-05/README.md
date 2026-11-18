# 5일차 — 개발자들의 언어 이해하기, 그리고 CRUD 연습

4일차 게시판 뼈대 위에 **데이터 모델** 과 **REST API** 를 더한 예제입니다. 용어(API, 데이터베이스, 테이블, 스키마, ORM, CRUD)를 실제 코드와 짝지어 보고, 메모리 저장소로 글 작성·수정·삭제를 연습합니다.

## 학습 목표

- API, 스키마, CRUD 같은 단어를 이 폴더의 파일과 연결해 설명합니다.
- `GET`, `POST`, `PATCH`, `DELETE` 로 글을 읽고 쓰는 REST API 를 이해합니다.
- 화면(폼)과 저장소(mockStore)가 API 를 통해 대화하는 흐름을 직접 확인합니다.
- 6일차 Prisma + Supabase 로 바꾸기 전에, 같은 필드 이름을 가진 스키마 초안을 읽어 둡니다.

## 폴더 구조

```text
day-05/
├── CLAUDE.md
├── README.md
├── docs/data-model.md          # 용어와 Post 필드, API 대응표
├── prisma/schema.prisma        # 6일차용 Post 모델 초안 (아직 적용하지 않음)
├── package.json
└── src/
    ├── types/post.ts
    ├── lib/mockStore.ts        # 메모리 저장소
    ├── lib/validatePost.ts
    ├── lib/formatDate.ts
    ├── components/PostForm.tsx
    ├── components/NewPostForm.tsx
    ├── components/PostEditor.tsx
    └── app/
        ├── page.tsx                      # 목록
        ├── posts/new/page.tsx            # 작성
        ├── posts/[id]/page.tsx           # 상세·수정·삭제
        ├── api/posts/route.ts            # GET, POST
        └── api/posts/[id]/route.ts       # GET, PATCH, DELETE
```

## 실행 방법

이 폴더에서 아래 명령을 실행합니다.

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다. 글쓰기 메뉴로 새 글을 등록하고, 상세 페이지에서 수정과 삭제를 시험하세요.

API 만 따로 확인하려면 개발 서버가 켜진 상태에서 다음을 실행할 수 있습니다.

```bash
curl -s http://localhost:3000/api/posts
```

프로덕션 빌드 확인:

```bash
npx tsc --noEmit
npm run build
```

💡 메모리 저장소는 개발 서버가 켜져 있는 동안만 글을 기억합니다. 서버를 끄고 다시 켜면 직접 작성하거나 지운 내용은 사라지고, 처음 준비된 글 목록으로 돌아갑니다. 이는 오류가 아니라 오늘의 설계입니다.

## 디자인

4일차와 같은 GS Retail 토큰, Pretendard, 18px 카드, 모바일 1열 / `md` 이상 2열 목록을 유지합니다.

## 관련 자료

- 데이터 모델 설명: `docs/data-model.md`
- 작업 규칙: `CLAUDE.md`
- 이전 회차(가짜 데이터 목록·상세): `../day-04/`
- 다음 회차(Prisma + Supabase 익명 CRUD): `../day-06/` (예정)
