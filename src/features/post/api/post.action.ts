"use server";

import { type ApiResult, apiFailure, apiSuccess } from "@/shared/api";
import {
  type GetHomePostsParams,
  getHomePosts,
  getPostDetail,
  type HomePostsResponse,
  type PostDetailResponse,
} from "./post.service";

export async function getHomePostsAction(params: GetHomePostsParams = {}): Promise<ApiResult<HomePostsResponse>> {
  try {
    return apiSuccess(await getHomePosts(params));
  } catch (error) {
    return apiFailure(error);
  }
}

export async function getPostDetailAction(postId: number): Promise<ApiResult<PostDetailResponse>> {
  try {
    return apiSuccess(await getPostDetail(postId));
  } catch (error) {
    return apiFailure(error);
  }
}
