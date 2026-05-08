"use client";

import { HOME_POSTS_MOCK } from "@/features/post/model/post.mock";
import {
  createDetailVoteOptions,
  DETAIL_COMMENTS_MOCK,
  DETAIL_VOTE_MOCK,
} from "@/features/post/model/post-detail.mock";
import {
  PostCommentsSection,
  PostDetailCard,
  PostDetailContent,
  PostDetailHeader,
  PostVoteSection,
} from "@/features/post/ui";
import { ContentCardCarousel } from "@/shared/ui";
import { formatNumber, formatRelativeTime } from "@/shared/utils/format";
import { HeaderWidget } from "@/widgets/header/ui";

type PostDetailPageClientProps = {
  postId: number;
};

export default function PostDetailPageClient({ postId }: PostDetailPageClientProps) {
  const selectedPost = HOME_POSTS_MOCK.find((post) => post.id === postId);
  if (!selectedPost) {
    throw new Error(`Post not found for postId=${postId}`);
  }

  const content = `${selectedPost.description}`;
  const voteOptions = createDetailVoteOptions();

  return (
    <div className="flex min-h-full flex-col">
      <HeaderWidget title="게시글 상세" />
      <main className="flex-1 px-common-padding py-6">
        <PostDetailCard>
          <PostDetailHeader
            postId={selectedPost.id}
            category={selectedPost.category}
            meta={formatRelativeTime(selectedPost.createdAt)}
            viewCount={selectedPost.viewCount}
            isBookmarked={selectedPost.isBookmarked}
          />
          <PostDetailContent
            title={selectedPost.title}
            authorName={selectedPost.author}
            content={content}
            media={
              <ContentCardCarousel className="gap-0 px-0 pb-0" showPagination paginationClassName="bottom-4">
                {selectedPost.images.map((gradientClassName) => (
                  <li key={`${selectedPost.id}-${gradientClassName}`}>
                    <div className={`h-[196px] w-full rounded-[8px] bg-gradient-to-br ${gradientClassName}`} />
                  </li>
                ))}
              </ContentCardCarousel>
            }
            mediaContainerClassName="rounded-[8px] bg-bg-02"
          />
          <PostVoteSection
            options={voteOptions}
            totalVotes={selectedPost.votes}
            initialSelectedId={DETAIL_VOTE_MOCK.myVote}
            aria-label={`판결 참여 ${formatNumber(selectedPost.votes)}명`}
          />
        </PostDetailCard>

        <PostCommentsSection className="mt-16" commentsResponse={DETAIL_COMMENTS_MOCK} />
      </main>
    </div>
  );
}
