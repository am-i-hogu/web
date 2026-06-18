"use client";

import { useEffect, useState } from "react";
import { useTogglePostBookmarkMutation } from "@/features/post/api";
import type { PostDetailResponse } from "@/shared/api/generated";

type PostDetailWithBookmark = PostDetailResponse & {
  isBookmarked?: boolean;
};

type UsePostDetailBookmarkStateParams = {
  postId: number;
  post?: PostDetailResponse;
  onAuthRequired: (error: unknown) => boolean;
};

/**
 * 게시글 상세의 북마크 토글 상태와 낙관적 업데이트를 관리하는 훅
 *
 * @description
 * 북마크 클릭 시 먼저 로컬 상태를 뒤집고, 서버 응답의 `isBookmarked` 값으로 다시 동기화합니다.
 * 요청 실패 시 이전 상태로 되돌리며, 인증 에러는 호출자가 주입한 로그인 이동 핸들러에 위임합니다.
 *
 * @param params.postId - 북마크를 토글할 게시글 ID입니다.
 * @param params.post - 상세 API 응답입니다.
 * @param params.onAuthRequired - 인증 필요 에러 처리 핸들러입니다.
 *
 * @returns isBookmarked - 현재 북마크 표시 여부입니다.
 * @returns isBookmarking - 북마크 토글 요청 진행 여부입니다.
 * @returns handleToggleBookmark - 북마크 토글 핸들러입니다.
 */
export function usePostDetailBookmarkState(params: UsePostDetailBookmarkStateParams) {
  const { postId, post, onAuthRequired } = params;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const togglePostBookmarkMutation = useTogglePostBookmarkMutation(postId);

  useEffect(() => {
    if (!post) {
      return;
    }

    // TODO: 현재 백엔드 상세 API 스키마에 isBookmarked 필드가 없어 초기 북마크 상태를 서버 기준으로 동기화할 수 없다.
    // 상세 응답에 isBookmarked가 추가되면 초기 상태를 서버 응답 기준으로 맞추고, 현재는 클릭 후 PostBookmarkResponse만 로컬에 반영한다.
    if ("isBookmarked" in post) {
      setIsBookmarked(Boolean((post as PostDetailWithBookmark).isBookmarked));
    }
  }, [post]);

  const handleToggleBookmark = async () => {
    const previousBookmarked = isBookmarked;

    setIsBookmarked(!previousBookmarked);
    try {
      const result = await togglePostBookmarkMutation.mutateAsync(previousBookmarked);
      setIsBookmarked(result.isBookmarked);
    } catch (error) {
      setIsBookmarked(previousBookmarked);
      if (!onAuthRequired(error)) {
        throw error;
      }
    }
  };

  return {
    isBookmarked,
    isBookmarking: togglePostBookmarkMutation.isPending,
    handleToggleBookmark,
  };
}
