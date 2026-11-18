import type { CreatePostInput, UpdatePostInput } from "@/types/post";

const TITLE_MAX = 80;
const AUTHOR_MAX = 40;
const CATEGORY_MAX = 20;
const CONTENT_MAX = 5000;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" ? value.trim() : undefined;
}

export function parseCreatePostInput(
  body: unknown,
): { ok: true; data: CreatePostInput } | { ok: false; error: string } {
  if (!isPlainObject(body)) {
    return { ok: false, error: "요청 본문은 객체여야 합니다." };
  }

  const title = readString(body.title);
  const content = readString(body.content);
  const author = readString(body.author);
  const category = readString(body.category);

  if (!title) {
    return { ok: false, error: "제목을 입력해 주세요." };
  }
  if (!author) {
    return { ok: false, error: "작성자를 입력해 주세요." };
  }
  if (!content) {
    return { ok: false, error: "본문을 입력해 주세요." };
  }
  if (title.length > TITLE_MAX) {
    return { ok: false, error: `제목은 ${TITLE_MAX}자 이하여야 합니다.` };
  }
  if (author.length > AUTHOR_MAX) {
    return { ok: false, error: `작성자는 ${AUTHOR_MAX}자 이하여야 합니다.` };
  }
  if (content.length > CONTENT_MAX) {
    return { ok: false, error: `본문은 ${CONTENT_MAX}자 이하여야 합니다.` };
  }
  if (category && category.length > CATEGORY_MAX) {
    return { ok: false, error: `분류는 ${CATEGORY_MAX}자 이하여야 합니다.` };
  }

  return {
    ok: true,
    data: {
      title,
      content,
      author,
      category: category || "일반",
    },
  };
}

export function parseUpdatePostInput(
  body: unknown,
): { ok: true; data: UpdatePostInput } | { ok: false; error: string } {
  if (!isPlainObject(body)) {
    return { ok: false, error: "요청 본문은 객체여야 합니다." };
  }

  const title = body.title === undefined ? undefined : readString(body.title);
  const content = body.content === undefined ? undefined : readString(body.content);
  const author = body.author === undefined ? undefined : readString(body.author);
  const category = body.category === undefined ? undefined : readString(body.category);

  if (body.title !== undefined && !title) {
    return { ok: false, error: "제목을 비울 수 없습니다." };
  }
  if (body.content !== undefined && !content) {
    return { ok: false, error: "본문을 비울 수 없습니다." };
  }
  if (body.author !== undefined && !author) {
    return { ok: false, error: "작성자를 비울 수 없습니다." };
  }
  if (title && title.length > TITLE_MAX) {
    return { ok: false, error: `제목은 ${TITLE_MAX}자 이하여야 합니다.` };
  }
  if (author && author.length > AUTHOR_MAX) {
    return { ok: false, error: `작성자는 ${AUTHOR_MAX}자 이하여야 합니다.` };
  }
  if (content && content.length > CONTENT_MAX) {
    return { ok: false, error: `본문은 ${CONTENT_MAX}자 이하여야 합니다.` };
  }
  if (category && category.length > CATEGORY_MAX) {
    return { ok: false, error: `분류는 ${CATEGORY_MAX}자 이하여야 합니다.` };
  }

  const data: UpdatePostInput = {};
  if (title !== undefined) data.title = title;
  if (content !== undefined) data.content = content;
  if (author !== undefined) data.author = author;
  if (category !== undefined) data.category = category;

  if (Object.keys(data).length === 0) {
    return { ok: false, error: "수정할 항목이 없습니다." };
  }

  return { ok: true, data };
}
