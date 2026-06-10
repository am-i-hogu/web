"use server";

import { type ApiResult, apiFailure, apiSuccess } from "@/shared/api";
import type { CheckNicknameResponse } from "@/shared/api/generated";
import { checkNickname } from "./onboarding.service";

export async function checkNicknameAction(nickname: string): Promise<ApiResult<CheckNicknameResponse>> {
  try {
    return apiSuccess(await checkNickname(nickname));
  } catch (error) {
    return apiFailure(error);
  }
}
