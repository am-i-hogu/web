import { type NextRequest, NextResponse } from "next/server";

const REFRESH_TOKEN_COOKIE = "refreshToken";
const REGISTER_TOKEN_COOKIE = "registerToken";

const SERVICE_ENTRY_PATH = "/";
const LOGIN_PATH = "/login";
const ONBOARDING_PATH = "/onboarding";
const EMPTY_REGISTER_TOKEN_ERROR_CODE = "EMPTY_REGISTER_TOKEN";

function redirectTo(pathname: string, request: NextRequest) {
  return NextResponse.redirect(new URL(pathname, request.url));
}

function redirectToLoginWithError(errorCode: string, request: NextRequest) {
  const url = new URL(LOGIN_PATH, request.url);
  url.searchParams.set("errorCode", errorCode);

  return NextResponse.redirect(url);
}

function hasCookieValue(request: NextRequest, name: string) {
  // 온보딩 성공 후, registerToken이 cookie에서 사라지는게 아니라 빈 값으로 설정되어있기 때문에 빈 값을 체크한다.
  return Boolean(request.cookies.get(name)?.value);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasRefreshToken = hasCookieValue(request, REFRESH_TOKEN_COOKIE);
  const hasRegisterToken = hasCookieValue(request, REGISTER_TOKEN_COOKIE);

  if (pathname === LOGIN_PATH) {
    return hasRefreshToken ? redirectTo(SERVICE_ENTRY_PATH, request) : NextResponse.next();
  }

  if (pathname === ONBOARDING_PATH) {
    if (hasRefreshToken) {
      return redirectTo(SERVICE_ENTRY_PATH, request);
    }

    return hasRegisterToken ? NextResponse.next() : redirectToLoginWithError(EMPTY_REGISTER_TOKEN_ERROR_CODE, request);
  }

  // `/login`, `/onboarding` 외 matcher 대상은 protected route로 간주한다.
  return hasRefreshToken ? NextResponse.next() : redirectTo(LOGIN_PATH, request);
}

export const config = {
  matcher: ["/login", "/onboarding", "/mypage/:path*", "/post/write", "/post/:postId/edit"],
};
