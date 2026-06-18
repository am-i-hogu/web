"use client";

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { unwrapApiResult } from "@/shared/api";
import type { CommentItemResponse } from "@/shared/api/generated";
import { getCommentsAction, getHomePostsAction, getPostDetailAction } from "./post.action";
import {
  createBookmarkWithAuth,
  createCommentHelpfulWithAuth,
  createCommentWithAuth,
  deleteBookmarkWithAuth,
  deleteCommentHelpfulWithAuth,
  deleteCommentWithAuth,
  deletePostWithAuth,
  updateCommentWithAuth,
} from "./post.client-service";
import { postQueryKeys } from "./post.keys";
import type { GetCommentsParams, GetHomePostsParams } from "./post.service";

export function useHomePostsQuery(params: GetHomePostsParams = {}) {
  return useQuery({
    queryKey: postQueryKeys.list(params),
    queryFn: () => getHomePostsAction(params).then(unwrapApiResult),
  });
}

export function useHomePostsInfiniteQuery(params: Omit<GetHomePostsParams, "cursor"> = {}) {
  return useInfiniteQuery({
    queryKey: postQueryKeys.list(params),
    queryFn: ({ pageParam }) =>
      getHomePostsAction({
        ...params,
        cursor: pageParam,
      }).then(unwrapApiResult),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
  });
}

export function usePostDetailQuery(postId: number) {
  return useQuery({
    queryKey: postQueryKeys.detail(postId),
    queryFn: () => getPostDetailAction(postId).then(unwrapApiResult),
    enabled: Number.isFinite(postId),
  });
}

export function useCommentsQuery(postId: number, params: GetCommentsParams = {}) {
  return useQuery({
    queryKey: postQueryKeys.comments(postId, params),
    queryFn: () => getCommentsAction(postId, params).then(unwrapApiResult),
    enabled: Number.isFinite(postId),
  });
}

export function useCommentsInfiniteQuery(postId: number, params: Omit<GetCommentsParams, "cursor"> = {}) {
  return useInfiniteQuery({
    queryKey: postQueryKeys.commentsInfinite(postId, params),
    queryFn: ({ pageParam }) =>
      getCommentsAction(postId, {
        ...params,
        cursor: pageParam,
      }).then(unwrapApiResult),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    enabled: Number.isFinite(postId),
  });
}

export function useDeletePostMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePostWithAuth({ postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
    },
  });
}

export function useTogglePostBookmarkMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isBookmarked: boolean) =>
      isBookmarked ? deleteBookmarkWithAuth({ postId }) : createBookmarkWithAuth({ postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() });
    },
  });
}

export function useCreateCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ parentId, content }: { parentId: number | null; content: string }) =>
      createCommentWithAuth({ postId }, { parentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.commentsRoot(postId) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(postId) });
    },
  });
}

export function useUpdateCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateCommentWithAuth({ postId, commentId }, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.commentsRoot(postId) });
    },
  });
}

export function useDeleteCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteCommentWithAuth({ postId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.commentsRoot(postId) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(postId) });
    },
  });
}

export function useToggleCommentHelpfulMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: Pick<CommentItemResponse, "commentId" | "isHelpful">) =>
      comment.isHelpful
        ? deleteCommentHelpfulWithAuth({ postId, commentId: comment.commentId })
        : createCommentHelpfulWithAuth({ postId, commentId: comment.commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.commentsRoot(postId) });
    },
  });
}
