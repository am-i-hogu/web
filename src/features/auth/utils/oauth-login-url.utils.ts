export type OAuthProvider = "KAKAO" | "GOOGLE";

const AUTH_LOGIN_PATH = "/api/auth/login";

/**
 * OAuth 로그인을 시작할 백엔드 엔드포인트 URL을 만든다.
 *
 * OAuth 시작 API는 302 redirect로 소셜 로그인 페이지를 내려주므로
 * `fetch`가 아니라 브라우저 이동에 사용할 `href` 값으로 사용한다.
 * `API_BASE_URL`이 없으면 같은 origin의 `/api/auth/login/{provider}` 경로를 사용한다.
 *
 * @param provider - 로그인을 시작할 OAuth 제공자
 * @param apiBaseUrl - OAuth 시작 API를 호출할 백엔드 base URL
 * @returns 브라우저 이동에 사용할 OAuth 로그인 시작 URL
 */
export function getOAuthLoginUrl(provider: OAuthProvider, apiBaseUrl = process.env.API_BASE_URL ?? "") {
  const normalizedBaseUrl = apiBaseUrl.replace(/\/$/, "");

  return `${normalizedBaseUrl}${AUTH_LOGIN_PATH}/${provider}`;
}
