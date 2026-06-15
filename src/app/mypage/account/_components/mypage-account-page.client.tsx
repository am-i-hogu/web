"use client";

import { MypageAccountSection } from "@/features/mypage/account/ui";
import { useGetMyPageQuery } from "@/features/mypage/api";
import { toMypageProfile } from "@/features/mypage/profile/model";
import { MypageProfileSummary } from "@/features/mypage/profile/ui";
import { Button, EmptyState, LoadingState } from "@/shared/ui";
import { FooterWidget } from "@/widgets/footer/ui";
import { HeaderWidget } from "@/widgets/header/ui";

export default function MypageAccountPageClient() {
  const { data: mypage, error, isPending, refetch } = useGetMyPageQuery();

  if (isPending) {
    return <LoadingState />;
  }

  if (error || !mypage) {
    return (
      <EmptyState
        title="계정 정보를 불러오지 못했어요."
        description="잠시 후 다시 시도해주세요."
        action={
          <Button type="button" onClick={() => refetch()} className="mx-auto w-fit">
            다시 불러오기
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-bg-01">
      <HeaderWidget title="계정 관리" />
      <main className="flex flex-1 flex-col gap-16 px-common-padding pb-8 pt-8">
        <MypageProfileSummary profile={toMypageProfile(mypage)} editable />
        <MypageAccountSection />
      </main>
      <footer className="sticky bottom-0 z-20 px-common-padding">
        <FooterWidget activeTab="mypage" />
      </footer>
    </div>
  );
}
