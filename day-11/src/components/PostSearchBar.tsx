"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type PostSearchBarProps = {
  defaultQuery?: string;
};

/**
 * Client Component.
 * 검색어를 URL 쿼리(?q=)로 반영합니다.
 * 실제 필터링은 서버(HomePage + PostListServer)가 수행합니다.
 */
export function PostSearchBar({ defaultQuery = "" }: PostSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : "/");
  }

  return (
    <form className="card" onSubmit={onSubmit} role="search">
      <div className="field">
        <label htmlFor="post-search">게시글 검색</label>
        <div className="form-actions" style={{ marginTop: 0 }}>
          <input
            id="post-search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="제목, 본문, 작성자"
            style={{ flex: 1, minWidth: 0 }}
          />
          <button className="btn btn-primary" type="submit">
            검색
          </button>
          {defaultQuery ? (
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => {
                setQuery("");
                router.push("/");
              }}
            >
              초기화
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
}
