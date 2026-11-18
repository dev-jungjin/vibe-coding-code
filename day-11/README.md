# 11일차 — 관리자 권한으로 전체 글 관리하기

10일차 작성자 인가 위에 역할 기반 접근 제어(RBAC)를 더한 예제입니다. 일반 사용자(`USER`)와 관리자(`ADMIN`)를 구분하고, 관리자는 작성자가 아니어도 글을 숨기거나 강제 삭제할 수 있습니다.

## 이 폴더에서 배우는 것

- `Role` 열거형과 `UserProfile` 모델로 역할을 저장하기
- 로그인 시 `UserProfile` 을 조회하거나 기본값 `USER` 로 만들기
- `/admin` 에서 숨긴 글을 포함한 전체 목록 관리
- `PATCH|DELETE /api/admin/posts/[id]` 는 관리자가 아니면 `403`
- 일반 사용자의 관리자 페이지 접근 차단 UI 확인

## 10일차에서 늘어난 것

- `Post.isHidden` (기본값 `false`). 공개 목록/상세는 숨긴 글을 보여 주지 않습니다.
- `src/lib/auth.ts` 의 `getCurrentUserProfile()`, `requireAdmin()`, `isAdmin()`
- `/admin`, `/api/admin/posts/[id]`
- 헤더의 관리자 링크는 `ADMIN` 에게만 표시

## 관리자 역할을 부여하는 방법

회원가입 후 한 번 로그인하면 `UserProfile` 이 `USER` 로 생성됩니다. 그다음 Prisma Studio 또는 SQL 로 바꿉니다.

```bash
npx prisma studio
```

`UserProfile` 테이블에서 본인 이메일의 `role` 을 `ADMIN` 으로 수정합니다.

```sql
UPDATE "UserProfile" SET role = 'ADMIN' WHERE email = 'you@example.com';
```

## 실행 방법

```bash
cd day-11
cp .env.example .env
npm install
npx prisma db push
npm run dev
```

1. 일반 계정으로 `/admin` 에 들어가면 접근 거부 화면이 보여야 합니다.
2. 관리자 계정으로 로그인하면 숨김/강제 삭제 버튼이 보입니다.
3. 글을 숨기면 목록에서 사라지고, 관리자 페이지에서는 그대로 보입니다.
