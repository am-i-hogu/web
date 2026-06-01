import { z } from "zod";

// TODO: 서버 닉네임 중복 검증 API 연동 전까지 사용하는 UI 검증용 mock
export const ALREADY_USED_NICKNAMES = new Set(["호구", "admin", "test"]);

export const onboardingSchema = z.object({
  nickname: z
    .string()
    .refine((val) => val.trim().length > 0, {
      message: "닉네임을 입력해주세요.",
    })
    .min(2, "2자 이상 20자 이하의 한글, 영문, 숫자만 사용해주세요.")
    .max(20, "2자 이상 20자 이하의 한글, 영문, 숫자만 사용해주세요.")
    .regex(/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+$/, "특수문자는 입력할 수 없습니다.")
    .regex(/^[a-zA-Z0-9가-힣]+$/, "단어 또는 문장 형태로 입력해주세요.")
    .refine((val) => !ALREADY_USED_NICKNAMES.has(val), {
      message: "중복된 닉네임입니다.",
    }),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
