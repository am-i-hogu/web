"use client";

import { type ApiClientOptions, apiClient, isApiError } from "@/shared/api";
import { useAuthStore } from "../model";
import { type refreshAccessToken, refreshAccessTokenOnce } from "./auth.service";

/**
 * 요청에 대한 인증 헤더를 생성한다.
 *
 * @param headers 인증 헤더를 제외한 나머지 헤더들
 * @param accessToken access token
 * @returns 인증 헤더가 추가된 헤더 객체
 */
function createAuthenticatedHeaders(headers: ApiClientOptions["headers"], accessToken: string | null) {
  const nextHeaders = new Headers(headers);

  if (accessToken) {
    nextHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  return Object.fromEntries(nextHeaders.entries());
}

/**
 * 인증 정보를 반환한다.
 *
 * @description
 * - store에 인증 정보가 없다면 access token을 갱신하고 반환한다.
 * - access token 갱신에 실패하면 인증 정보를 초기화하고 에러를 던진다.
 *
 * @returns access token
 */
async function getAccessToken() {
  const { accessToken, clearAccessToken, setAccessToken } = useAuthStore.getState();

  if (accessToken) {
    return accessToken;
  }

  try {
    const reissueResponse = await refreshAccessTokenOnce();
    setAccessToken(reissueResponse.accessToken);

    return reissueResponse.accessToken;
  } catch (error) {
    clearAccessToken();
    throw error;
  }
}

export async function authenticatedApiClient<T>(path: string, options: ApiClientOptions = {}) {
  const accessToken = await getAccessToken();

  try {
    return await apiClient<T>(path, {
      ...options,
      headers: createAuthenticatedHeaders(options.headers, accessToken),
    });
  } catch (error) {
    const shouldRefresh = isApiError(error) && error.status === 401;

    // 401 에러가 아니라면 에러를 그대로 던진다.
    if (!shouldRefresh) {
      throw error;
    }

    let reissueResponse: Awaited<ReturnType<typeof refreshAccessToken>>;
    const { clearAccessToken, setAccessToken } = useAuthStore.getState();

    // access token 갱신 요청을 보낸다.
    try {
      reissueResponse = await refreshAccessTokenOnce();
    } catch (refreshError) {
      // access token 갱신 실패시 인증 정보(store)를 초기화 한 후 에러를 던진다.
      clearAccessToken();
      throw refreshError;
    }

    setAccessToken(reissueResponse.accessToken);

    // 갱신된 access token으로 원래 요청을 다시 보낸다.
    return await apiClient<T>(path, {
      ...options,
      headers: createAuthenticatedHeaders(options.headers, reissueResponse.accessToken),
    });
  }
}
