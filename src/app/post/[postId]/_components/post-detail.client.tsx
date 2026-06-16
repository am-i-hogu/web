"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import SmileyXEyesIcon from "@/assets/icons/smiley-x-eyes.svg";
import { useDeletePostMutation, usePostDetailQuery } from "@/features/post/api";
import { POST_CATEGORY_VALUES, toPostCategoryLabel } from "@/features/post/constants";
import { usePostDetailBookmarkState, usePostDetailComments } from "@/features/post/hooks";
import {
  PostCommentsSection,
  PostDetailCard,
  PostDetailContent,
  PostDetailHeader,
  type PostVoteOption,
  PostVoteSection,
} from "@/features/post/ui";
import { isApiError } from "@/shared/api";
import type { PostDetailResponse } from "@/shared/api/generated";
import { Button, ContentCardCarousel, EmptyState, LoadingState } from "@/shared/ui";
import { formatNumber, formatRelativeTime } from "@/shared/utils/format";
import { HeaderWidget } from "@/widgets/header/ui";

type PostDetailPageClientProps = {
  postId: number;
};

function createVoteOptions(vote: PostDetailResponse["vote"]): PostVoteOption[] {
  const totalVotes = vote.totalVotes || 0;
  const calculatePercent = (count: number) => (totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0);

  return [
    {
      id: "HOGU",
      label: "호구 맞다",
      emoji: "😢",
      percent: calculatePercent(vote.yesVotes),
    },
    {
      id: "NOT_HOGU",
      label: "아니다",
      emoji: "🤔",
      percent: calculatePercent(vote.noVotes),
    },
  ];
}

function getPrimaryCategoryLabel(post: Pick<PostDetailResponse, "categories">) {
  const category = post.categories.find((value) => POST_CATEGORY_VALUES.includes(value)) ?? "ETC";
  return toPostCategoryLabel(category);
}

function createImageCarouselItems(post: Pick<PostDetailResponse, "postId" | "images" | "title">) {
  return post.images.map((imageUrl, index) => ({
    id: `${post.postId}-image-${index + 1}`,
    content: (
      // biome-ignore lint/performance/noImgElement: 외부 이미지 도메인 정책의 경우, 추후 이미지 연동 이슈에서 정리될 예정
      <img
        src={imageUrl}
        alt={`${post.title} 첨부 이미지 ${index + 1}`}
        className="h-[196px] w-full rounded-[8px] object-cover"
      />
    ),
  }));
}

function PostDetailErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-[calc(100dvh-60px)] flex-col justify-center">
      <EmptyState
        layout="inline"
        icon={<SmileyXEyesIcon aria-hidden className="size-20 text-text-03" />}
        title={"게시글을 불러오지 못했습니다.\n잠시 후 다시 시도해주세요."}
        action={
          <Button type="button" fullWidth onClick={onRetry}>
            다시 시도
          </Button>
        }
      />
    </div>
  );
}

function PostDetailNotFoundState() {
  return (
    <div className="flex min-h-[calc(100dvh-60px)] flex-col justify-center">
      <EmptyState
        layout="inline"
        icon={<SmileyXEyesIcon aria-hidden className="size-20 text-text-03" />}
        title={"게시글을 찾을 수 없습니다.\n삭제되었거나 이동된 게시글입니다."}
      />
    </div>
  );
}

export default function PostDetailPageClient({ postId }: PostDetailPageClientProps) {
  const router = useRouter();
  const postDetailQuery = usePostDetailQuery(postId);
  const deletePostMutation = useDeletePostMutation(postId);
  const post = postDetailQuery.data;
  const voteOptions = useMemo(() => (post ? createVoteOptions(post.vote) : []), [post]);
  const imageCarouselItems = useMemo(() => (post ? createImageCarouselItems(post) : []), [post]);
  const initialSelectedVoteId =
    post?.vote.myVote === "HOGU" || post?.vote.myVote === "NOT_HOGU" ? post.vote.myVote : undefined;

  const handleAuthRequiredError = (error: unknown) => {
    if (isApiError(error) && error.status === 401) {
      router.replace("/login?errorCode=AUTH_REQUIRED");
      return true;
    }

    return false;
  };
  const bookmarkState = usePostDetailBookmarkState({
    postId,
    post,
    onAuthRequired: handleAuthRequiredError,
  });
  const commentsState = usePostDetailComments({
    postId,
    onAuthRequired: handleAuthRequiredError,
  });

  const handleDeletePost = async () => {
    try {
      await deletePostMutation.mutateAsync();
      router.replace("/");
    } catch (error) {
      if (!handleAuthRequiredError(error)) {
        throw error;
      }
    }
  };

  if (postDetailQuery.isPending) {
    return (
      <div className="flex min-h-full flex-col">
        <HeaderWidget title="게시글 상세" />
        <LoadingState />
      </div>
    );
  }

  if (postDetailQuery.isError) {
    if (isApiError(postDetailQuery.error) && postDetailQuery.error.status === 404) {
      return (
        <div className="flex min-h-full flex-col">
          <HeaderWidget title="게시글 상세" />
          <PostDetailNotFoundState />
        </div>
      );
    }

    return (
      <div className="flex min-h-full flex-col">
        <HeaderWidget title="게시글 상세" />
        <PostDetailErrorState onRetry={() => postDetailQuery.refetch()} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-full flex-col">
        <HeaderWidget title="게시글 상세" />
        <PostDetailNotFoundState />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <HeaderWidget title="게시글 상세" />
      <main className="flex-1 px-common-padding py-6">
        <PostDetailCard>
          <PostDetailHeader
            postId={post.postId}
            category={getPrimaryCategoryLabel(post)}
            meta={formatRelativeTime(post.createdAt)}
            viewCount={post.viewCount}
            isBookmarked={bookmarkState.isBookmarked}
            isMine={post.isMine}
            isDeleting={deletePostMutation.isPending}
            isBookmarking={bookmarkState.isBookmarking}
            onBookmarkToggle={bookmarkState.handleToggleBookmark}
            onDelete={handleDeletePost}
          />
          <PostDetailContent
            title={post.title}
            authorName={post.writer.nickname}
            authorImage={post.writer.profileImageUrl ?? undefined}
            content={post.content}
            media={
              imageCarouselItems.length > 0 ? (
                <ContentCardCarousel
                  items={imageCarouselItems}
                  className="gap-0 px-0 pb-0"
                  showPagination
                  paginationClassName="bottom-4"
                />
              ) : null
            }
            mediaContainerClassName="rounded-[8px] bg-bg-02"
          />
          <PostVoteSection
            options={voteOptions}
            totalVotes={post.vote.totalVotes}
            initialSelectedId={initialSelectedVoteId}
            aria-label={`판결 참여 ${formatNumber(post.vote.totalVotes)}명`}
          />
        </PostDetailCard>

        {commentsState.commentsQuery.isError ? (
          <PostDetailErrorState onRetry={() => commentsState.commentsQuery.refetch()} />
        ) : (
          <PostCommentsSection
            className="mt-16"
            commentsResponse={commentsState.commentsResponse}
            sortValue={commentsState.commentSortValue}
            onSortChange={commentsState.setCommentSortValue}
            onCreateComment={commentsState.handleCreateComment}
            onCreateReply={commentsState.handleCreateReply}
            onUpdateComment={commentsState.handleUpdateComment}
            onDeleteComment={commentsState.handleDeleteComment}
            onToggleHelpful={commentsState.handleToggleCommentHelpful}
            isCreatingComment={commentsState.isCreatingComment}
            hasNextPage={Boolean(commentsState.commentsQuery.hasNextPage)}
            isFetchingNextPage={commentsState.commentsQuery.isFetchingNextPage}
            onLoadMore={commentsState.handleLoadMoreComments}
          />
        )}
      </main>
    </div>
  );
}
