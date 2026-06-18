import { apiClient } from "@/shared/api";
import type {
  CommentReadResponse,
  GetCommentsQuery,
  GetHomePostsQuery,
  HomePostListResponse,
  PostDetailResponse,
} from "@/shared/api/generated";

export type GetHomePostsParams = Omit<GetHomePostsQuery, "categories"> & {
  /** 쉼표로 구분된 카테고리 코드들 */
  categories?: string | null;
};
export type GetCommentsParams = GetCommentsQuery;

export async function getHomePosts(params: GetHomePostsParams = {}) {
  return apiClient<HomePostListResponse>("/api/posts", {
    method: "GET",
    query: params,
  });
}

export async function getPostDetail(postId: number) {
  return apiClient<PostDetailResponse>(`/api/posts/${postId}`, {
    method: "GET",
  });
}

export async function getComments(postId: number, params: GetCommentsParams = {}) {
  return apiClient<CommentReadResponse>(`/api/posts/${postId}/comments`, {
    method: "GET",
    query: params,
  });
}
