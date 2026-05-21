"use client";

import { useRouter } from "next/navigation";
import SmileyXEyesIcon from "@/assets/icons/smiley-x-eyes.svg";
import { Button, EmptyState } from "@/shared/ui";

export default function ErrorPage({ error: _error }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col bg-bg-01">
      <EmptyState
        layout="inline"
        className="flex-1"
        icon={<SmileyXEyesIcon aria-hidden className="size-20 text-text-03" />}
        title={"오류가 발생했습니다.\n잠시 후 다시 시도해주세요."}
      />
      <div className="px-common-padding pb-6">
        <Button fullWidth onClick={() => router.back()}>
          돌아가기
        </Button>
      </div>
    </div>
  );
}
