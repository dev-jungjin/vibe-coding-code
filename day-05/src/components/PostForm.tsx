"use client";

import { useState, type FormEvent } from "react";
import type { Post } from "@/types/post";

export type PostFormValues = {
  title: string;
  author: string;
  category: string;
  content: string;
};

type PostFormProps = {
  submitLabel: string;
  initialPost?: Pick<Post, "title" | "author" | "category" | "content">;
  onSubmit: (values: PostFormValues) => Promise<void>;
};

const CATEGORY_OPTIONS = ["일반", "안내", "바이브코딩", "개념", "API", "질문"];

export function PostForm({ submitLabel, initialPost, onSubmit }: PostFormProps) {
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [author, setAuthor] = useState(initialPost?.author ?? "");
  const [category, setCategory] = useState(initialPost?.category ?? "일반");
  const [content, setContent] = useState(initialPost?.content ?? "");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    try {
      await onSubmit({
        title: title.trim(),
        author: author.trim(),
        category: category.trim() || "일반",
        content: content.trim(),
      });
    } catch (unknownError) {
      const message =
        unknownError instanceof Error
          ? unknownError.message
          : "요청을 처리하지 못했습니다.";
      setError(message);
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-bold text-primary-dark">제목</span>
        <input
          required
          maxLength={80}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-[14px] border-[1.5px] border-neutral-200 bg-white px-3.5 py-3 text-[15px] text-primary-dark outline-none focus:border-signature-cyan focus:shadow-[0_0_0_3px_rgba(0,212,234,0.2)]"
          placeholder="글 제목을 입력하세요"
        />
      </label>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-bold text-primary-dark">작성자</span>
          <input
            required
            maxLength={40}
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className="w-full rounded-[14px] border-[1.5px] border-neutral-200 bg-white px-3.5 py-3 text-[15px] text-primary-dark outline-none focus:border-signature-cyan focus:shadow-[0_0_0_3px_rgba(0,212,234,0.2)]"
            placeholder="이름"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-bold text-primary-dark">분류</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-[14px] border-[1.5px] border-neutral-200 bg-white px-3.5 py-3 text-[15px] text-primary-dark outline-none focus:border-signature-cyan focus:shadow-[0_0_0_3px_rgba(0,212,234,0.2)]"
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-bold text-primary-dark">본문</span>
        <textarea
          required
          maxLength={5000}
          rows={10}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="min-h-48 w-full resize-y rounded-[14px] border-[1.5px] border-neutral-200 bg-white px-3.5 py-3 text-[15px] leading-7 text-primary-dark outline-none focus:border-signature-cyan focus:shadow-[0_0_0_3px_rgba(0,212,234,0.2)]"
          placeholder="단락을 빈 줄로 구분해 작성하면 상세 페이지에서 나누어 보여 줍니다."
        />
      </label>

      {error ? (
        <p
          className="rounded-[14px] border border-[#f0c2bc] bg-[#fff4f2] px-4 py-3 text-sm font-semibold text-[#9b2c2c]"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-pill bg-primary-dark px-5 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#12171f] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "저장하는 중..." : submitLabel}
      </button>
    </form>
  );
}
