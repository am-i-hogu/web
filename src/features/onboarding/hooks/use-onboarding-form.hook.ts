import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type OnboardingFormData, onboardingSchema } from "@/features/onboarding/models";

export function useOnboardingForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      nickname: "",
    },
    mode: "onChange",
  });

  const nicknameValue = watch("nickname");
  const errorMessage = errors.nickname?.message;

  const getHelperState = () => {
    if (!nicknameValue) {
      return {
        helperText: "한글 및 영문, 숫자 최대 20자까지 입력할 수 있어요.",
        tone: "default" as const,
      };
    }

    if (errorMessage) {
      if (errorMessage === "중복된 닉네임입니다.") {
        return {
          helperText: errorMessage,
          tone: "warning" as const,
        };
      }
      return {
        helperText: errorMessage,
        tone: "danger" as const,
      };
    }

    return {
      helperText: "사용 가능한 닉네임입니다.",
      tone: "success" as const,
    };
  };

  return {
    control,
    handleSubmit,
    isValid,
    ...getHelperState(),
  };
}
