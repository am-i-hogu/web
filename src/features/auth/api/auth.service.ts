import { apiClient } from "@/shared/api";
import type { ReissueResponse } from "@/shared/api/generated";

let refreshPromise: ReturnType<typeof refreshAccessToken> | null = null;

export async function refreshAccessToken() {
  return apiClient<ReissueResponse>("/api/auth/refresh", {
    method: "POST",
    cache: "no-store",
    credentials: "include",
  });
}

/**
 * 401 에러 또는 보호 페이지 진입 시 refresh token 재발급 요청이 중복 호출되는 것을 방지한다.
 */
export function refreshAccessTokenOnce() {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}
