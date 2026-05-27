import { apiClient } from "@/shared/api";

export type GetHomePostsParams = {
  keyword?: string;
  categories?: string;
  sortBy?: string;
  pageSize?: number;
  cursor?: string;
};

export type HomePostsResponse = unknown;
export type PostDetailResponse = unknown;

export async function getHomePosts(params: GetHomePostsParams = {}) {
  return apiClient<HomePostsResponse>("/posts", {
    method: "GET",
    query: params,
  });
}

export async function getPostDetail(postId: number) {
  return apiClient<PostDetailResponse>(`/posts/${postId}`, {
    method: "GET",
  });
}
