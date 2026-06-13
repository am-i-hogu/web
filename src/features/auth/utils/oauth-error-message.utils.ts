const DEFAULT_OAUTH_ERROR_MESSAGE = "로그인에 실패했어요. 다시 시도해 주세요.";

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  INVALID_AUTH_CODE: "로그인 인증 코드가 유효하지 않아요. 다시 시도해 주세요.",
  INVALID_ID_TOKEN: "소셜 계정 인증 정보가 유효하지 않아요. 다시 시도해 주세요.",
  INVALID_STATE: "로그인 요청이 유효하지 않아요. 다시 시도해 주세요.",
  LOGIN_FAILED: DEFAULT_OAUTH_ERROR_MESSAGE,
  PROVIDER_MISMATCH: "로그인 제공자 정보가 일치하지 않아요. 다시 시도해 주세요.",
  SOCIAL_SERVER_ERROR: "소셜 로그인 서버에 문제가 있어요. 잠시 후 다시 시도해 주세요.",
  STATE_EXPIRED: "로그인 시간이 만료되었어요. 다시 시도해 주세요.",
  STATE_REUSED: "이미 처리된 로그인 요청이에요. 다시 시도해 주세요.",
  UNKNOWN_AUTH_STATUS: DEFAULT_OAUTH_ERROR_MESSAGE,
  UNSUPPORTED_PROVIDER: "지원하지 않는 로그인 방식이에요.",
};

/**
 * OAuth 실패 코드를 사용자가 이해할 수 있는 로그인 화면 안내 문구로 변환한다.
 *
 * 서버에서 내려주는 오류 코드를 그대로 노출하지 않고,
 * 알려진 코드는 원인에 맞는 문구로 바꾸며
 * 알 수 없는 코드는 기본 실패 문구로 처리한다.
 *
 * @param errorCode - 백엔드에서 전달된 OAuth 실패 코드
 * @returns 로그인 화면에 표시할 사용자 안내 문구
 */
export function getOAuthErrorMessage(errorCode?: string | null) {
  if (!errorCode) {
    return DEFAULT_OAUTH_ERROR_MESSAGE;
  }

  return OAUTH_ERROR_MESSAGES[errorCode] ?? DEFAULT_OAUTH_ERROR_MESSAGE;
}
