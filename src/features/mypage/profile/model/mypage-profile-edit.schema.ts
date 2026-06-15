import { z } from "zod";

// TODO: 온보딩과 동일한 닉네임 정책 -> 공용 스키마로 승격할지 논의가 필요
export const mypageProfileEditSchema = z.object({
  nickname: z
    .string()
    .refine((val) => val.trim().length > 0, {
      message: "닉네임을 입력해주세요.",
    })
    .min(2, "2자 이상 20자 이하의 한글, 영문, 숫자만 사용해주세요.")
    .max(20, "2자 이상 20자 이하의 한글, 영문, 숫자만 사용해주세요.")
    .regex(/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+$/, "특수문자는 입력할 수 없습니다.")
    .regex(/^[a-zA-Z0-9가-힣]+$/, "단어 또는 문장 형태로 입력해주세요."),
});

export type MypageProfileEditFormData = z.infer<typeof mypageProfileEditSchema>;
