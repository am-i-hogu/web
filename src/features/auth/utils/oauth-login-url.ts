export type OAuthProvider = "KAKAO" | "GOOGLE";

const AUTH_LOGIN_PATH = "/api/auth/login";

export function getOAuthLoginUrl(provider: OAuthProvider, apiBaseUrl = process.env.API_BASE_URL ?? "") {
  const normalizedBaseUrl = apiBaseUrl.replace(/\/$/, "");

  return `${normalizedBaseUrl}${AUTH_LOGIN_PATH}/${provider}`;
}
