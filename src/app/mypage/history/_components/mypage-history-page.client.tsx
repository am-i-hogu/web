"use client";

import { useMemo, useState } from "react";
import {
  useGetMyBookmarksQuery,
  useGetMyCommentsQuery,
  useGetMyPageQuery,
  useGetMyPostsQuery,
  useGetMyVotesQuery,
} from "@/features/mypage/api";
import { MYPAGE_HISTORY_TABS } from "@/features/mypage/history/constants";
import type { MypageHistoryItem, MypageHistoryTab } from "@/features/mypage/history/model";
import { MypageHistorySection } from "@/features/mypage/history/ui";
import {
  toBookmarkHistoryItem,
  toCommentHistoryItem,
  toPostHistoryItem,
  toVoteHistoryItem,
} from "@/features/mypage/history/utils";
import { toMypageProfile } from "@/features/mypage/profile/model";
import { MypageProfileSummary } from "@/features/mypage/profile/ui";
import { Button, EmptyState, LoadingState } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { FooterWidget } from "@/widgets/footer/ui";
import { HeaderWidget } from "@/widgets/header/ui";

export default function MypageHistoryPageClient() {
  const [selectedTab, setSelectedTab] = useState<MypageHistoryTab>("posts");
  const mypageQuery = useGetMyPageQuery();
  const postsQuery = useGetMyPostsQuery({}, selectedTab === "posts");
  const commentsQuery = useGetMyCommentsQuery({}, selectedTab === "comments");
  const bookmarksQuery = useGetMyBookmarksQuery({}, selectedTab === "bookmarks");
  const votesQuery = useGetMyVotesQuery({}, selectedTab === "votes");

  const activeQuery = {
    posts: postsQuery,
    comments: commentsQuery,
    bookmarks: bookmarksQuery,
    votes: votesQuery,
  }[selectedTab];

  const items = useMemo<MypageHistoryItem[]>(() => {
    if (selectedTab === "comments") {
      return commentsQuery.data?.comments.map(toCommentHistoryItem) ?? [];
    }
    if (selectedTab === "bookmarks") {
      return bookmarksQuery.data?.posts.map(toBookmarkHistoryItem) ?? [];
    }
    if (selectedTab === "votes") {
      return votesQuery.data?.votes.map(toVoteHistoryItem) ?? [];
    }

    return postsQuery.data?.posts.map(toPostHistoryItem) ?? [];
  }, [bookmarksQuery.data, commentsQuery.data, postsQuery.data, selectedTab, votesQuery.data]);

  if (mypageQuery.isPending) {
    return <LoadingState />;
  }

  if (mypageQuery.error || !mypageQuery.data) {
    return (
      <EmptyState
        title="히스토리 정보를 불러오지 못했어요."
        description="잠시 후 다시 시도해주세요."
        action={
          <Button type="button" onClick={() => mypageQuery.refetch()} className="mx-auto w-fit">
            다시 불러오기
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-bg-01">
      <HeaderWidget title="히스토리" />
      <main className="flex flex-1 flex-col gap-6 px-common-padding pb-8 pt-10">
        <MypageProfileSummary profile={toMypageProfile(mypageQuery.data)} />
        <section className="space-y-6" aria-labelledby="mypage-history-tabs-heading">
          <h1 id="mypage-history-tabs-heading" className="sr-only">
            히스토리
          </h1>
          <div className="grid grid-cols-4 border-b border-line-02" role="tablist" aria-label="히스토리 필터">
            {MYPAGE_HISTORY_TABS.map((tab) => {
              const isSelected = selectedTab === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={cn(
                    "border-b-2 pb-3 text-body-m",
                    isSelected ? "border-primary-strong text-primary-strong" : "border-transparent text-text-02",
                  )}
                  onClick={() => setSelectedTab(tab.value)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          {activeQuery.isPending ? (
            <LoadingState className="min-h-[240px]" />
          ) : activeQuery.error ? (
            <EmptyState
              layout="inline"
              title="히스토리 목록을 불러오지 못했어요."
              description="잠시 후 다시 시도해주세요."
              action={
                <Button type="button" onClick={() => activeQuery.refetch()} className="mx-auto w-fit">
                  다시 불러오기
                </Button>
              }
            />
          ) : (
            <MypageHistorySection activeTab={selectedTab} items={items} />
          )}
        </section>
      </main>
      <footer className="sticky bottom-0 z-20 px-common-padding">
        <FooterWidget activeTab="mypage" />
      </footer>
    </div>
  );
}
