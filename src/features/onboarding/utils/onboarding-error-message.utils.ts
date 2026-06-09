import type { ErrorResponse } from "@/shared/api/generated";

const nicknameFieldErrorMessages: Record<string, string> = {
  EMPTY_NICKNAME: "닉네임을 입력해주세요.",
  SPECIAL_CHAR_NICKNAME: "특수문자는 입력할 수 없습니다.",
  NICKNAME_LENGTH_EXCEEDED: "2자 이상 20자 이하의 한글, 영문, 숫자만 사용해주세요.",
};

/**
 * API 실패 응답 데이터가 백엔드 공통 에러 응답 형태인지 확인한다.
 *
 * @param data - API 실패 시 `ApiError.data`에 담긴 원본 응답 데이터
 * @returns `code` 필드를 가진 백엔드 에러 응답이면 `true`
 */
function isErrorResponse(data: unknown): data is ErrorResponse {
  return data !== null && typeof data === "object" && "code" in data && typeof data.code === "string";
}

/**
 * 닉네임 중복 확인 API의 실패 응답을 온보딩 입력 필드에 표시할 메시지로 변환한다.
 *
 * 서버가 명세의 `ErrorResponse.errors`로 닉네임 필드 오류 코드를 내려주면
 * 해당 코드를 사용자 안내 문구로 매핑하고, 알 수 없는 형태의 응답이면 기본 실패 문구를 반환한다.
 *
 * @param data - 닉네임 중복 확인 API 실패 시 받은 원본 응답 데이터
 * @returns 온보딩 닉네임 입력 필드에 표시할 에러 메시지
 */
export function getNicknameCheckErrorMessage(data: unknown) {
  if (!isErrorResponse(data)) {
    return "닉네임 중복 확인에 실패했습니다.";
  }

  const nicknameErrorCode = data.errors?.find((error) => error.field === "nickname")?.code;

  if (!nicknameErrorCode) {
    return "닉네임 중복 확인에 실패했습니다.";
  }

  return nicknameFieldErrorMessages[nicknameErrorCode] ?? "닉네임 중복 확인에 실패했습니다.";
}
