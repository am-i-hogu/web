"use client";

import { authenticatedApiClient } from "@/features/auth/api";
import type { GetHoguReportResponse, GetMyPageResponse } from "./mypage.service";

export async function getMyPageWithAuth() {
  return authenticatedApiClient<GetMyPageResponse>("/api/users/me", {
    method: "GET",
  });
}

export async function getHoguReportWithAuth() {
  return authenticatedApiClient<GetHoguReportResponse>("/api/users/me/report", {
    method: "GET",
  });
}
