"use client";

import { useCallback, useMemo, useState } from "react";
import {
  useCommentsInfiniteQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useToggleCommentHelpfulMutation,
  useUpdateCommentMutation,
} from "@/features/post/api";
import type { PostCommentSortValue } from "@/features/post/ui";
import type { CommentItemResponse } from "@/shared/api/generated";

const COMMENT_SORT_QUERY_BY_VALUE: Record<PostCommentSortValue, "LATEST" | "HELPFUL"> = {
  latest: "LATEST",
  helpful: "HELPFUL",
};

type UsePostDetailCommentsParams = {
  postId: number;
  onAuthRequired: (error: unknown) => boolean;
};

/**
 * 게시글 상세 댓글 목록과 댓글 mutation 핸들러를 관리하는 훅
 *
 * @description
 * 댓글 정렬, cursor 기반 무한스크롤 조회, 작성/답글/수정/삭제, 유익해요 토글 흐름을 모읍니다.
 * 댓글 CRUD는 mutation 성공 후 쿼리 무효화로 서버 상태를 다시 받아오고, 유익해요는 카드 내부 상태와 서버 응답을 동기화합니다.
 *
 * @param params.postId - 댓글을 조회하고 변경할 게시글 ID입니다.
 * @param params.onAuthRequired - 인증 필요 에러 처리 핸들러입니다.
 *
 * @returns commentsResponse - 로드된 페이지를 합친 댓글 응답입니다.
 * @returns commentSortValue - 현재 댓글 정렬 값입니다.
 * @returns setCommentSortValue - 댓글 정렬 변경 함수입니다.
 * @returns commentsQuery - 댓글 무한스크롤 쿼리 객체입니다.
 * @returns isCreatingComment - 댓글 작성 요청 진행 여부입니다.
 * @returns handleCreateComment - 원댓글 작성 핸들러입니다.
 * @returns handleCreateReply - 답글 작성 핸들러입니다.
 * @returns handleUpdateComment - 댓글 수정 핸들러입니다.
 * @returns handleDeleteComment - 댓글 삭제 핸들러입니다.
 * @returns handleToggleCommentHelpful - 유익해요 토글 핸들러입니다.
 * @returns handleLoadMoreComments - 다음 댓글 페이지 로드 핸들러입니다.
 */
export function usePostDetailComments(params: UsePostDetailCommentsParams) {
  const { postId, onAuthRequired } = params;
  const [commentSortValue, setCommentSortValue] = useState<PostCommentSortValue>("latest");
  const commentsQuery = useCommentsInfiniteQuery(postId, {
    sortBy: COMMENT_SORT_QUERY_BY_VALUE[commentSortValue],
    pageSize: 15,
  });
  const createCommentMutation = useCreateCommentMutation(postId);
  const updateCommentMutation = useUpdateCommentMutation(postId);
  const deleteCommentMutation = useDeleteCommentMutation(postId);
  const toggleCommentHelpfulMutation = useToggleCommentHelpfulMutation(postId);

  const commentsResponse = useMemo(() => {
    const pages = commentsQuery.data?.pages ?? [];
    const lastPage = pages.at(-1);

    return {
      comments: pages.flatMap((page) => page.comments),
      hasNext: Boolean(commentsQuery.hasNextPage),
      nextCursor: lastPage?.nextCursor ?? null,
    };
  }, [commentsQuery.data?.pages, commentsQuery.hasNextPage]);

  const handleCreateComment = async (content: string) => {
    try {
      await createCommentMutation.mutateAsync({ parentId: null, content });
    } catch (error) {
      if (!onAuthRequired(error)) {
        throw error;
      }
    }
  };

  const handleCreateReply = async (parentId: number, content: string) => {
    try {
      await createCommentMutation.mutateAsync({ parentId, content });
    } catch (error) {
      if (!onAuthRequired(error)) {
        throw error;
      }
    }
  };

  const handleUpdateComment = async (commentId: number, content: string) => {
    try {
      await updateCommentMutation.mutateAsync({ commentId, content });
    } catch (error) {
      if (!onAuthRequired(error)) {
        throw error;
      }
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteCommentMutation.mutateAsync(commentId);
    } catch (error) {
      if (!onAuthRequired(error)) {
        throw error;
      }
    }
  };

  const handleToggleCommentHelpful = async (comment: CommentItemResponse) => {
    try {
      return await toggleCommentHelpfulMutation.mutateAsync(comment);
    } catch (error) {
      onAuthRequired(error);
      return {
        isHelpful: comment.isHelpful,
        totalHelpfulCount: comment.totalHelpfulCount,
      };
    }
  };

  const handleLoadMoreComments = useCallback(() => commentsQuery.fetchNextPage(), [commentsQuery.fetchNextPage]);

  return {
    commentsResponse,
    commentSortValue,
    setCommentSortValue,
    commentsQuery,
    isCreatingComment: createCommentMutation.isPending,
    handleCreateComment,
    handleCreateReply,
    handleUpdateComment,
    handleDeleteComment,
    handleToggleCommentHelpful,
    handleLoadMoreComments,
  };
}
