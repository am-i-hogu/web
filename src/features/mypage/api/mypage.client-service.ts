"use client";

import { authenticatedApiClient } from "@/features/auth/api";
import type { GetMyPageResponse } from "./mypage.service";

export async function getMyPageWithAuth() {
  return authenticatedApiClient<GetMyPageResponse>("/api/users/me", {
    method: "GET",
  });
}
