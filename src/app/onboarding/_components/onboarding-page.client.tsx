"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { createOnboardingUser } from "@/features/onboarding/api";
import { useOnboardingForm } from "@/features/onboarding/hooks";
import type { OnboardingFormData } from "@/features/onboarding/models";
import { getOnboardingNicknameErrorMessage, getOnboardingSubmitErrorMessage } from "@/features/onboarding/utils";
import { toApiError } from "@/shared/api";
import { Button, Textfield } from "@/shared/ui";

export default function OnboardingPageClient() {
  const router = useRouter();
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);
  const { control, handleSubmit, helperText, tone, isCheckingNickname, isSubmitting, isValid, setError } =
    useOnboardingForm();
  const isSubmitDisabled = !isValid || isCheckingNickname || isSubmitting;

  const handleOnboardingSubmit = async (data: OnboardingFormData) => {
    setSubmitErrorMessage(null);

    try {
      await createOnboardingUser(data);
      router.replace("/");
      return;
    } catch (error) {
      const apiError = toApiError(error);
      const nicknameErrorMessage = getOnboardingNicknameErrorMessage(apiError.data);

      if (nicknameErrorMessage) {
        setError("nickname", {
          type: "server",
          message: nicknameErrorMessage,
        });
        return;
      }

      setSubmitErrorMessage(getOnboardingSubmitErrorMessage(apiError.data));
    }
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

      <div className="flex flex-col gap-3">
        {submitErrorMessage ? (
          <p className="text-center text-small-m text-danger" role="alert">
            {submitErrorMessage}
          </p>
        ) : null}
        <Button type="submit" disabled={isSubmitDisabled} variant={isSubmitDisabled ? "disabled" : "primary"} fullWidth>
          완료하기
        </Button>
      </div>
    </form>
  );
}
