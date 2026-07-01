"use client";

import { useState } from "react";
import { useGetMyPageQuery } from "@/features/mypage/api";
import { MYPAGE_MENU_ITEMS } from "@/features/mypage/menu/constants";
import { MypageMenuList } from "@/features/mypage/menu/ui";
import { toMypageProfile } from "@/features/mypage/profile/model";
import { MypageProfileSummary } from "@/features/mypage/profile/ui";
import { HoguIndexCard } from "@/features/mypage/report/ui";
import { toHoguIndex } from "@/features/mypage/report/utils";
import { MypageSupportModal } from "@/features/mypage/support/ui";
import { Button, EmptyState, LoadingState } from "@/shared/ui";
import { FooterWidget } from "@/widgets/footer/ui";

export default function MypagePageClient() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const { data: mypage, error, isPending, refetch } = useGetMyPageQuery();

  if (isPending) {
    return <LoadingState />;
  }

  if (error || !mypage) {
    return (
      <EmptyState
        title="마이페이지 정보를 불러오지 못했어요."
        description="잠시 후 다시 시도해주세요."
        action={
          <Button type="button" onClick={() => refetch()} className="mx-auto w-fit">
            다시 불러오기
          </Button>
        }
      />
    );
  }

  const profile = toMypageProfile(mypage);
  const hoguIndex = toHoguIndex(mypage);

  return (
    <div className="flex min-h-full flex-col bg-bg-01">
      <main className="flex flex-1 flex-col gap-6 px-common-padding pb-8 pt-10">
        <MypageProfileSummary profile={profile} />
        <HoguIndexCard index={hoguIndex} />
        <MypageMenuList
          items={MYPAGE_MENU_ITEMS}
          onItemSelect={(item) => {
            if (item.id === "support") {
              setIsSupportModalOpen(true);
            }
          }}
        />
      </main>
      {/* TODO: 하위 화면의 footer 중복 선언, 공통 wrapper로 감쌀지 고민중... */}
      <footer className="sticky bottom-0 z-20 px-common-padding">
        <FooterWidget activeTab="mypage" />
      </footer>
      <MypageSupportModal open={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
    </div>
  );
}
