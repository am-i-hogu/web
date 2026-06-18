"use client";

import {
  type InfiniteData,
  type QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { unwrapApiResult } from "@/shared/api";
import type { CommentItemResponse, HomePostListResponse } from "@/shared/api/generated";
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

type HomePostsInfiniteData = InfiniteData<HomePostListResponse>;

function updateHomePostBookmarkState(data: HomePostsInfiniteData | undefined, postId: number, isBookmarked: boolean) {
  return data
    ? {
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          posts: page.posts.map((post) => (post.postId === postId ? { ...post, isBookmarked } : post)),
        })),
      }
    : data;
}

function setHomePostBookmarkState(queryClient: QueryClient, postId: number, isBookmarked: boolean) {
  queryClient.setQueriesData<HomePostsInfiniteData>({ queryKey: postQueryKeys.lists() }, (old) =>
    updateHomePostBookmarkState(old, postId, isBookmarked),
  );
}

type TogglePostBookmarkVariables = {
  postId: number;
  isBookmarked: boolean;
};

export function useHomePostsQuery(params: GetHomePostsParams = {}) {
  return useQuery({
    queryKey: postQueryKeys.list(params),
    queryFn: () => getHomePostsAction(params).then(unwrapApiResult),
  });
}

export function useHomePostsInfiniteQuery(params: Omit<GetHomePostsParams, "cursor"> = {}) {
  // 홈 피드 무한 스크롤 쿼리: cursor는 query 내부 pageParam으로만 관리한다.
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

export function useTogglePostBookmarkMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, isBookmarked }: TogglePostBookmarkVariables) =>
      isBookmarked ? deleteBookmarkWithAuth({ postId }) : createBookmarkWithAuth({ postId }),
    onMutate: async ({ postId, isBookmarked }) => {
      await queryClient.cancelQueries({ queryKey: postQueryKeys.lists() });
      const previousHomePostLists = queryClient.getQueriesData<HomePostsInfiniteData>({
        queryKey: postQueryKeys.lists(),
      });

      // 낙관적 업데이트: 홈 피드에 로드된 같은 게시글의 북마크 상태를 즉시 반전한다.
      setHomePostBookmarkState(queryClient, postId, !isBookmarked);

      return { previousHomePostLists };
    },
    onSuccess: (result, { postId }) => {
      // 서버 응답을 한 번 더 반영해 중복 클릭/동시 요청으로 인한 표시 오차를 줄인다.
      setHomePostBookmarkState(queryClient, postId, result.isBookmarked);
    },
    onError: (_error, _variables, context) => {
      context?.previousHomePostLists.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: (_result, _error, { postId }) => {
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
