"use client";

import { Controller } from "react-hook-form";
import { useOnboardingForm } from "@/features/onboarding/hooks";
import type { OnboardingFormData } from "@/features/onboarding/models";
import { Button, Textfield } from "@/shared/ui";

export default function OnboardingPageClient() {
  const { control, handleSubmit, helperText, tone, isValid } = useOnboardingForm();

  const handleOnboardingSubmit = (data: OnboardingFormData) => {
    // TODO: 온보딩 완료 API 연동 후 홈 또는 이전 페이지로 이동
    console.log("제출된 데이터:", data);
  };

  return (
    <form onSubmit={handleSubmit(handleOnboardingSubmit)} className="flex flex-col flex-1 justify-between">
      <section className="flex flex-col gap-10">
        <h1 className="text-title2-b">프로필을 완성해 주세요!</h1>

        <div className="flex flex-col gap-2">
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => (
              <Textfield
                title="닉네임"
                value={field.value}
                onChange={field.onChange}
                showCount
                placeholder="뭐라고 불러드릴까요?"
                showClearButton
                helperText={helperText}
                tone={tone}
                maxLength={20}
              />
            )}
          />

          <p className="text-small-m text-text-03">
            가입함으로써 귀하는 당사의 <span className="text-indigo-950">커뮤니티 가이드라인</span>에 동의하며, <br />
            때로는 자신이 정말로 호구일 수 있음을 인정하게 됩니다.
          </p>
        </div>
      </section>

      <Button type="submit" disabled={!isValid} variant={isValid ? "primary" : "disabled"} fullWidth>
        완료하기
      </Button>
    </form>
  );
}
