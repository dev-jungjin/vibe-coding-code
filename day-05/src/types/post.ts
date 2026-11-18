export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatePostInput = {
  title: string;
  content: string;
  author: string;
  category?: string;
};

export type UpdatePostInput = {
  title?: string;
  content?: string;
  author?: string;
  category?: string;
};
