"use client";

import type { ComponentProps } from "react";
import { useMemo } from "react";
import ChatIcon from "@/assets/icons/chat.svg";
import { PostCommentCard } from "@/features/post/ui/post-comment-card";
import { PostCommentForm } from "@/features/post/ui/post-comment-form";
import type { CommentItemResponse, CommentReadResponse } from "@/shared/api/generated";
// TODO: 공용 useInfiniteScrollObserver가 홈 피드 PR에 포함되면 주석을 해제해 댓글 무한스크롤도 다시 연결한다.
// import { useInfiniteScrollObserver } from "@/shared/hooks";
import { SortSelect, type SortSelectOption } from "@/shared/ui";
import { cn } from "@/shared/utils";

export type PostCommentSortValue = "latest" | "helpful";

export type PostCommentsSectionProps = ComponentProps<"section"> & {
  commentsResponse: CommentReadResponse;
  sortValue: PostCommentSortValue;
  onSortChange: (value: PostCommentSortValue) => void;
  onCreateComment: (content: string) => Promise<void>;
  onCreateReply: (parentId: number, content: string) => Promise<void>;
  onUpdateComment: (commentId: number, content: string) => Promise<void>;
  onDeleteComment: (commentId: number) => Promise<void>;
  onToggleHelpful: (comment: CommentItemResponse) => Promise<{ isHelpful: boolean; totalHelpfulCount: number }>;
  isCreatingComment?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => Promise<unknown>;
};

const COMMENT_SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "helpful", label: "유익해요순" },
] satisfies readonly SortSelectOption<PostCommentSortValue>[];

function EmptyComments() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <ChatIcon aria-hidden className="size-12 text-text-02" strokeWidth={20} />
      <p className="text-caption-m text-text-02">아직 작성된 집단 지성이 없습니다.</p>
    </div>
  );
}

export function PostCommentsSection(props: PostCommentsSectionProps) {
  const {
    commentsResponse,
    sortValue,
    onSortChange,
    onCreateComment,
    onCreateReply,
    onUpdateComment,
    onDeleteComment,
    onToggleHelpful,
    isCreatingComment = false,
    hasNextPage = false,
    isFetchingNextPage = false,
    onLoadMore,
    className,
    ...rest
  } = props;
  const comments = commentsResponse.comments;
  // const loadMoreRef = useInfiniteScrollObserver({
  //   enabled: hasNextPage,
  //   isFetching: isFetchingNextPage,
  //   onIntersect: onLoadMore,
  // });
  const rootComments = useMemo(() => {
    const roots = comments.filter((comment) => comment.parentId === null);
    const sorted = [...roots];
    sorted.sort((a, b) => {
      if (sortValue === "helpful" && b.totalHelpfulCount !== a.totalHelpfulCount) {
        return b.totalHelpfulCount - a.totalHelpfulCount;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return sorted;
  }, [comments, sortValue]);
  const replyMap = useMemo(() => {
    const byParent: Record<number, CommentItemResponse[]> = {};
    comments
      .filter((comment) => comment.parentId !== null)
      .forEach((reply) => {
        const parentId = reply.parentId;
        if (parentId === null) {
          return;
        }

        if (!byParent[parentId]) {
          byParent[parentId] = [];
        }
        byParent[parentId].push(reply);
      });

    for (const parentId of Object.keys(byParent)) {
      byParent[Number(parentId)].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return byParent;
  }, [comments]);

  return (
    <section className={cn("flex flex-col gap-4", className)} aria-label="집단 지성 댓글" {...rest}>
      <div className="flex flex-col gap-1">
        <h2 className="text-subtitle-b text-text-04">로드된 집단 지성 ({rootComments.length})</h2>
        <div className="flex justify-end">
          <SortSelect
            value={sortValue}
            options={COMMENT_SORT_OPTIONS}
            onChange={onSortChange}
            ariaLabel="집단 지성 정렬"
            className="text-caption-m text-text-03"
          />
        </div>
      </div>

      <PostCommentForm onSubmit={onCreateComment} isSubmitting={isCreatingComment} />

      {rootComments.length > 0 ? (
        <div className="flex flex-col gap-3">
          {rootComments.map((comment) => (
            <PostCommentCard
              key={comment.commentId}
              comment={comment}
              replies={replyMap[comment.commentId] ?? []}
              onCreateReply={onCreateReply}
              onUpdateComment={onUpdateComment}
              onDeleteComment={onDeleteComment}
              onToggleHelpful={onToggleHelpful}
            />
          ))}
        </div>
      ) : (
        <EmptyComments />
      )}
      {/* <div ref={loadMoreRef} className="flex min-h-8 items-center justify-center py-2">
        {isFetchingNextPage ? <span className="text-caption-m text-text-03">댓글을 더 불러오는 중...</span> : null}
      </div> */}
    </section>
  );
}
