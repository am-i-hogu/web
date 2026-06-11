import type { NextRequest } from "next/server";

function getApiBaseUrl() {
  return process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
}

function createApiUrl(path: string) {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    throw new Error("API_BASE_URL이 설정되지 않았습니다.");
  }

  return new URL(path, baseUrl);
}

function createForwardHeaders(request: NextRequest) {
  const headers = new Headers();
  const cookie = request.headers.get("cookie");

  if (cookie) {
    headers.set("Cookie", cookie);
  }

  return headers;
}

export async function POST(request: NextRequest) {
  return fetch(createApiUrl("/api/auth/refresh"), {
    method: "POST",
    headers: createForwardHeaders(request),
    cache: "no-store",
  });
}
