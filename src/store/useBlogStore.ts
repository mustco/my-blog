import { create } from "zustand";
import { Post } from "@/components/InterfacePost";

interface BlogState {
  posts: Post[];
  page: number;
  hasMore: boolean;
  setPosts: (posts: Post[]) => void;
  appendPosts: (posts: Post[]) => void;
  setPage: (page: number) => void;
  setHasMore: (value: boolean) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  posts: [],
  page: 1,
  hasMore: true,
  setPosts: (posts) => set({ posts }),
  appendPosts: (newPosts) =>
    set((state) => ({ posts: [...state.posts, ...newPosts] })),
  setPage: (page) => set({ page }),
  setHasMore: (value) => set({ hasMore: value }),
}));

interface BlogStateCategory {
  posts: Post[];
  pageCategory: number;
  hasMoreCategory: boolean;
  setPostsCategory: (posts: Post[]) => void;
  appendPostsCategory: (posts: Post[]) => void;
  setPageCategory: (page: number) => void;
  setHasMoreCategory: (value: boolean) => void;
}

export const useBlogStoreCategory = create<BlogStateCategory>((set) => ({
  posts: [],
  pageCategory: 1,
  hasMoreCategory: true,
  setPostsCategory: (posts) => set({ posts }),
  appendPostsCategory: (newPosts) =>
    set((state) => ({ posts: [...state.posts, ...newPosts] })),
  setPageCategory: (page) => set({ pageCategory: page }),
  setHasMoreCategory: (value) => set({ hasMoreCategory: value }),
}));
