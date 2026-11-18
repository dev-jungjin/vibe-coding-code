# Client Component 와 Server Component 경계

8일차는 같은 게시판을 두 종류의 컴포넌트로 나눕니다. 목표는 "화면이 움직이는 코드"와 "데이터를 읽는 코드"를 섞지 않는 것입니다.

## 역할 나누기

| 구분 | 파일 | 하는 일 | 하지 않는 일 |
| --- | --- | --- | --- |
| Server Component | `src/components/PostListServer.tsx` | 서버가 조회한 글 목록을 렌더링 | 입력, 클릭, `useState`, `fetch` |
| Server Component | `src/components/PostDetailCard.tsx` | 게시글 본문과 메타 정보 표시 | 삭제 확인, 라우터 이동 |
| Client Component | `src/components/PostSearchBar.tsx` | 검색어를 `?q=` 쿼리로 반영 | 데이터베이스 직접 조회 |
| Client Component | `src/components/PostCreateForm.tsx` | 폼 입력 후 `POST /api/posts` | Prisma 호출 |
| Client Component | `src/components/PostActionPanel.tsx` | 수정 이동, 비밀번호 확인 후 삭제 | 목록 HTML 직접 조작 |

Server Component 에는 `'use client'` 가 없습니다. 이 파일들은 서버에서만 실행되며 브라우저 번들에 Prisma 나 `passwordHash` 가 포함되지 않습니다.

Client Component 파일 맨 위에는 `'use client'` 가 있습니다. `useState`, `useRouter`, `fetch`, 클릭 이벤트는 여기에만 둡니다.

페이지(`src/app/page.tsx`, `src/app/posts/[id]/page.tsx`)는 기본적으로 Server Component 입니다. 서버에서 데이터를 가져온 뒤, 상호작용이 필요한 부분만 Client Component 를 children 또는 형제 요소로 끼워 넣습니다.

## 변경 후 즉시 갱신되는 흐름

1. Client Component 가 `/api/posts` 또는 `/api/posts/[id]` 를 호출합니다.
2. Route Handler 가 Prisma 로 데이터를 변경한 뒤 `revalidatePath('/')` (필요하면 상세 경로도) 를 호출합니다. 서버 캐시에 "이 경로의 데이터는 다시 가져와야 한다"고 표시합니다.
3. 같은 Client Component 가 `router.refresh()` 를 호출합니다. 브라우저를 전체 새로고침하지 않고, 현재 페이지의 Server Component 만 다시 렌더링합니다.
4. `PostListServer` 는 최신 목록을 받아 다시 그려집니다.

두 호출이 짝입니다. `revalidatePath` 만 있으면 지금 보고 있는 화면은 그대로일 수 있고, `router.refresh()` 만 있으면 캐시된 오래된 데이터를 다시 그릴 수 있습니다.

## 네트워크 탭으로 확인하는 방법

크롬 또는 엣지 개발자 도구를 열고 아래를 따라가 보세요.

1. `npm run dev` 로 앱을 실행하고 브라우저에서 목록 페이지를 엽니다.
2. 개발자 도구 **Network** 탭을 열고 **Disable cache** 를 켭니다. Fetch/XHR 필터를 사용하면 API 호출이 잘 보입니다.
3. **새 글 작성**에서 글을 저장합니다.
   - `POST /api/posts` 요청이 보이는지 확인합니다.
   - 요청 본문에 `title`, `content`, `authorName`, `password` 가 있는지, 응답에 `passwordHash` 가 **없는지** 확인합니다.
   - 저장 직후 목록으로 돌아올 때 페이지 전체가 다시 하얗게 로드되지 않고, 문서(`document`) 요청 없이 목록만 바뀌는지 관찰합니다. `router.refresh()` 는 Next.js 가 RSC 페이로드를 다시 가져오는 요청으로 나타납니다.
4. 검색창에 단어를 넣고 검색합니다.
   - 주소창이 `/?q=검색어` 로 바뀌는지 확인합니다.
   - 서버가 필터링한 결과만 `PostListServer` 에 전달됩니다. 검색 컴포넌트가 글 배열을 직접 들고 있지 않습니다.
5. 글을 삭제합니다.
   - `DELETE /api/posts/[id]` 의 상태 코드가 비밀번호 오류일 때 `401` 또는 `403`, 성공일 때 `200` 인지 확인합니다.
   - 성공 후 목록이 전체 새로고침 없이 줄어드는지 확인합니다.

💡 **핵심 요약**: 데이터는 서버가 읽고, 상호작용은 클라이언트가 다루며, 둘 사이는 API 와 `router.refresh()` 로 연결합니다.
