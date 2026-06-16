"use client";

import { useGetHoguReportQuery } from "@/features/mypage/api";
import { toMypageProfile } from "@/features/mypage/profile/model";
import { MypageProfileSummary } from "@/features/mypage/profile/ui";
import { HoguIndexCard, MypageReportSection } from "@/features/mypage/report/ui";
import { toHoguCategoryBreakdown, toMypageStats, toReportHoguIndex } from "@/features/mypage/report/utils";
import { Button, EmptyState, LoadingState } from "@/shared/ui";
import { FooterWidget } from "@/widgets/footer/ui";

export default function MypageReportPageClient() {
  const { data: report, error, isPending, refetch } = useGetHoguReportQuery();

  if (isPending) {
    return <LoadingState />;
  }

  if (error || !report) {
    return (
      <EmptyState
        title="호구 보고서를 불러오지 못했어요."
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
      <main className="flex flex-1 flex-col gap-6 px-common-padding pb-8 pt-10">
        <MypageProfileSummary profile={toMypageProfile(report)} />
        <HoguIndexCard index={toReportHoguIndex(report)} variant="detail" />
        <MypageReportSection categories={toHoguCategoryBreakdown(report)} stats={toMypageStats(report)} />
      </main>
      <footer className="sticky bottom-0 z-20 px-common-padding">
        <FooterWidget activeTab="mypage" />
      </footer>
    </div>
  );
}
