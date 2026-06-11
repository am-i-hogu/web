import { type ApiClientOptions, apiClient, isApiError } from "@/shared/api";
import { useAuthStore } from "../model";
import { refreshAccessToken } from "./auth.service";

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

export async function authenticatedApiClient<T>(path: string, options: ApiClientOptions = {}) {
  const { accessToken, clearAccessToken, setAccessToken } = useAuthStore.getState();

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

    // access token 을 갱신하고 다시 요청한다.
    try {
      const reissueResponse = await refreshAccessToken();
      setAccessToken(reissueResponse.accessToken);

      return await apiClient<T>(path, {
        ...options,
        headers: createAuthenticatedHeaders(options.headers, reissueResponse.accessToken),
      });
    } catch (refreshError) {
      // access token 갱신 실패시 인증 정보(store)를 초기화 한 후 에러를 던진다.
      clearAccessToken();
      throw refreshError;
    }
  }
}
