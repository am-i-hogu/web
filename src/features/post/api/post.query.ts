"use client";

import { useQuery } from "@tanstack/react-query";
import { unwrapApiResult } from "@/shared/api";
import { getHomePostsAction, getPostDetailAction } from "./post.action";
import { postQueryKeys } from "./post.keys";
import type { GetHomePostsParams } from "./post.service";

export function useHomePostsQuery(params: GetHomePostsParams = {}) {
  return useQuery({
    queryKey: postQueryKeys.list(params),
    queryFn: () => getHomePostsAction(params).then(unwrapApiResult),
  });
}

export function usePostDetailQuery(postId: number) {
  return useQuery({
    queryKey: postQueryKeys.detail(postId),
    queryFn: () => getPostDetailAction(postId).then(unwrapApiResult),
    enabled: Number.isFinite(postId),
  });
}
