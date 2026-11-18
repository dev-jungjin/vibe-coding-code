# 10일차 — 로그인하고 내 글은 나만 고칠 수 있게 하기

9일차 인증 위에 작성자 인가(Authorization)를 더한 예제입니다. 글 작성 시 현재 로그인 사용자의 ID 와 이메일을 저장하고, 서버가 본인 글만 수정·삭제하도록 검사합니다.

## 이 폴더에서 배우는 것

- `Post.authorId`, `Post.authorEmail` 로 글과 사용자를 연결하기
- `POST /api/posts` 에서 `supabase.auth.getUser()` 로 세션을 확인하고 작성자 정보를 붙이기
- `PATCH` / `DELETE` 에서 미로그인 `401`, 다른 사용자면 `403 Forbidden`
- UI 에서 비작성자의 수정·삭제 버튼을 숨기거나 비활성화하기 (실제 권한은 서버가 결정)

## 9일차에서 늘어난 것

- Prisma `Post` 모델에 `authorId`, `authorEmail` 추가 (`passwordHash` 는 선택 필드로 유지)
- `src/lib/auth.ts` — `getSessionUser()`, `isPostOwner()`
- 글 작성 페이지는 로그인 필수
- 상세/수정 화면과 `PostActionPanel` 이 소유권에 따라 동작을 바꿈

이전 일차에서 이미 쓴 익명 글은 `authorId` 가 비어 있어 수정·삭제가 막힐 수 있습니다. 10일차부터 새로 작성한 글로 실습하세요.

## 실행 방법

```bash
cd day-10
cp .env.example .env
npm install
npx prisma db push
npm run dev
```

1. 계정 A 로 로그인해서 글을 작성합니다.
2. 로그아웃한 뒤 계정 B 로 로그인합니다.
3. A 의 글에서 수정·삭제가 비활성화되는지 확인합니다.
4. 개발자 도구로 `DELETE /api/posts/[id]` 를 직접 호출해도 `403` 이 나오는지 확인합니다.
