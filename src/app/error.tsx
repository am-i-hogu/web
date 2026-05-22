"use client";

import { useRouter } from "next/navigation";
import SmileyXEyesIcon from "@/assets/icons/smiley-x-eyes.svg";
import { Button, EmptyState } from "@/shared/ui";

export default function ErrorPage({
  error: _error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col bg-bg-01">
      <EmptyState
        layout="inline"
        className="flex-1"
        icon={<SmileyXEyesIcon aria-hidden className="size-20 text-text-03" />}
        title={"오류가 발생했습니다.\n잠시 후 다시 시도해주세요."}
      />
      <div className="flex flex-col gap-2 px-common-padding pb-6">
        <Button fullWidth onClick={() => unstable_retry()}>
          다시 시도
        </Button>
        <Button fullWidth variant="inactive" onClick={() => router.back()}>
          돌아가기
        </Button>
      </div>
    </div>
  );
}
