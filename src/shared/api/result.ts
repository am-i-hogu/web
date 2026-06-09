import { ApiError, type ApiErrorPayload, toApiError } from "./error";

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiFailure = {
  success: false;
  error: ApiErrorPayload;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export function apiSuccess<T>(data: T): ApiSuccess<T> {
  return {
    success: true,
    data,
  };
}

export function apiFailure(error: unknown): ApiFailure {
  const apiError = toApiError(error);

  return {
    success: false,
    error: {
      status: apiError.status,
      message: apiError.message,
      data: apiError.data,
    },
  };
}

export function unwrapApiResult<T>(result: ApiResult<T>): T {
  if (result.success) {
    return result.data;
  }

  throw new ApiError(result.error);
}
