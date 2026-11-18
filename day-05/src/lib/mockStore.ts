import { randomUUID } from "node:crypto";
import type { CreatePostInput, Post, UpdatePostInput } from "@/types/post";

const seedPosts: Post[] = [
  {
    id: "welcome",
    title: "바이브코딩 자유게시판에 오신 것을 환영합니다",
    author: "양준렬",
    category: "안내",
    content: [
      "5일차에는 4일차에 만든 목록·상세 화면 위에, 메모리 저장소와 REST API 로 글을 만들고 고치고 지우는 흐름을 붙입니다.",
      "아직 Prisma 나 Supabase 는 연결하지 않습니다. src/lib/mockStore.ts 가 서버가 켜져 있는 동안 글을 기억하고, /api/posts 와 /api/posts/[id] 가 그 저장소를 읽고 씁니다.",
      "개발 서버를 끄거나 다시 켜면 데이터는 처음 준비해 둔 글 목록으로 돌아갑니다. 이후 회차에서 데이터베이스에 진짜로 저장하게 됩니다.",
    ].join("\n\n"),
    createdAt: "2026-11-04T09:00:00+09:00",
    updatedAt: "2026-11-04T09:00:00+09:00",
  },
  {
    id: "prompt-three",
    title: "AI 에게 코딩을 시킬 때 필요한 세 가지: 목표, 제약, 예시",
    author: "양준렬",
    category: "바이브코딩",
    content: [
      "API 를 만들어 달라고 요청할 때도 3요소는 동일합니다.",
      "목표의 예는 게시글 목록 조회, 상세 조회, 작성, 수정, 삭제를 제공하는 REST API 입니다.",
      "제약의 예는 GET /api/posts, POST /api/posts, GET·PATCH·DELETE /api/posts/[id] 경로를 지키고, 메모리 저장소만 사용하며, 제목·작성자·본문이 비어 있으면 400 을 반환하는 것입니다.",
      "예시의 예는 작성 요청 JSON 이 { title, author, content } 이고, 성공 시 201 과 함께 생성된 글을 돌려주는 형태입니다.",
    ].join("\n\n"),
    createdAt: "2026-11-05T10:30:00+09:00",
    updatedAt: "2026-11-05T10:30:00+09:00",
  },
  {
    id: "what-is-crud",
    title: "CRUD 는 데이터를 다루는 네 가지 기본 동작입니다",
    author: "김도윤",
    category: "개념",
    content: [
      "Create 는 새 데이터를 만드는 일입니다. 이 프로젝트에서는 글쓰기 폼이 POST /api/posts 를 호출하는 동작입니다.",
      "Read 는 데이터를 읽어 오는 일입니다. 목록의 GET /api/posts, 상세의 GET /api/posts/[id] 가 해당합니다. 화면이 서버 저장소를 직접 읽을 때도 같은 조회 개념입니다.",
      "Update 는 이미 있는 데이터를 고치는 일입니다. 상세 페이지의 수정 폼이 PATCH /api/posts/[id] 를 호출합니다.",
      "Delete 는 데이터를 지우는 일입니다. 삭제 버튼이 DELETE /api/posts/[id] 를 호출합니다.",
      "이 네 가지가 보이면, 내일 Prisma 로 테이블을 다룰 때도 같은 이름으로 명령을 찾으면 됩니다.",
    ].join("\n\n"),
    createdAt: "2026-11-06T14:15:00+09:00",
    updatedAt: "2026-11-06T14:15:00+09:00",
  },
  {
    id: "schema-and-orm",
    title: "테이블, 스키마, ORM 을 쉬운 말로 정리하면",
    author: "박서연",
    category: "개념",
    content: [
      "테이블은 같은 모양의 데이터를 칸에 나눠 담은 표입니다. 게시판에서는 글 한 줄이 한 행이 됩니다.",
      "스키마는 그 표에 어떤 칸이 있는지, 각 칸이 글자인지 날짜인지, 비면 안 되는지를 정해 둔 설계도입니다. prisma/schema.prisma 의 Post 모델이 그 초안입니다.",
      "ORM 은 테이블을 다루는 명령을, 익숙한 프로그래밍 언어의 함수 호출로 바꿔 주는 도구입니다. 6일차에 만날 Prisma Client 가 그 역할을 합니다.",
      "오늘은 ORM 을 실행하지 않습니다. 대신 스키마 초안을 읽고, 메모리 저장소의 필드가 스키마와 같은 이름을 쓰는지 비교해 보세요.",
    ].join("\n\n"),
    createdAt: "2026-11-07T11:00:00+09:00",
    updatedAt: "2026-11-07T11:00:00+09:00",
  },
  {
    id: "api-is-a-contract",
    title: "API 는 화면과 저장소가 주고받는 약속입니다",
    author: "이하늘",
    category: "API",
    content: [
      "화면은 데이터가 배열에 있는지, 데이터베이스에 있는지 몰라도 됩니다. 약속된 주소와 방법(GET, POST, PATCH, DELETE)으로 요청하고, JSON 으로 답을 받으면 됩니다.",
      "이 약속이 API 입니다. 오늘은 같은 Next.js 프로젝트 안의 Route Handler 가 그 약속을 지킵니다.",
      "주소를 직접 시험해 보려면 브라우저나 터미널에서 GET /api/posts 를 호출해 보세요. 목록 JSON 이 보이면, 화면은 그 데이터를 예쁘게 보여 주는 역할만 하고 있는 것입니다.",
      "6일차에는 저장소만 Prisma + Supabase 로 바뀝니다. API 주소와 화면은 크게 바꾸지 않고 이어 갈 수 있도록 오늘 계약을 단순하게 유지합니다.",
    ].join("\n\n"),
    createdAt: "2026-11-08T16:45:00+09:00",
    updatedAt: "2026-11-08T16:45:00+09:00",
  },
];

type GlobalStore = {
  postStore?: Post[];
};

const globalForPosts = globalThis as typeof globalThis & GlobalStore;

function getStore(): Post[] {
  if (!globalForPosts.postStore) {
    globalForPosts.postStore = seedPosts.map((post) => ({ ...post }));
  }
  return globalForPosts.postStore;
}

export function listPosts(): Post[] {
  return [...getStore()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getPost(id: string): Post | undefined {
  return getStore().find((post) => post.id === id);
}

export function createPost(input: CreatePostInput): Post {
  const now = new Date().toISOString();
  const post: Post = {
    id: randomUUID(),
    title: input.title,
    content: input.content,
    author: input.author,
    category: input.category?.trim() || "일반",
    createdAt: now,
    updatedAt: now,
  };
  getStore().unshift(post);
  return post;
}

export function updatePost(id: string, input: UpdatePostInput): Post | undefined {
  const store = getStore();
  const index = store.findIndex((post) => post.id === id);

  if (index === -1) {
    return undefined;
  }

  const current = store[index];
  const updated: Post = {
    ...current,
    ...(input.title !== undefined ? { title: input.title } : {}),
    ...(input.content !== undefined ? { content: input.content } : {}),
    ...(input.author !== undefined ? { author: input.author } : {}),
    ...(input.category !== undefined ? { category: input.category } : {}),
    updatedAt: new Date().toISOString(),
  };

  store[index] = updated;
  return updated;
}

export function deletePost(id: string): boolean {
  const store = getStore();
  const index = store.findIndex((post) => post.id === id);

  if (index === -1) {
    return false;
  }

  store.splice(index, 1);
  return true;
}
