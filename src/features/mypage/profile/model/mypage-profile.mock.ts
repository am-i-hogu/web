import type { MypageUserResponse } from "@/features/mypage/profile/model/mypage-profile.types";
import { toMypageProfile } from "./mypage-profile.utils";

export const MYPAGE_USER_RESPONSE_MOCK: MypageUserResponse = {
  nickname: "김호구",
  profileImageUrl: "",
  hoguIndex: 72,
  hoguLevel: "RISKY",
  hoguShortDescription: "거절보다 양보가 앞서는 타입",
};

export const MYPAGE_PROFILE_MOCK = toMypageProfile(MYPAGE_USER_RESPONSE_MOCK);
