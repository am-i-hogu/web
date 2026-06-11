import { type ApiClientOptions, apiClient } from "@/shared/api";
import { useAuthStore } from "../model";

function createAuthenticatedHeaders(headers: ApiClientOptions["headers"], accessToken: string | null) {
  const nextHeaders = new Headers(headers);

  if (accessToken) {
    nextHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  return Object.fromEntries(nextHeaders.entries());
}

export async function authenticatedApiClient<T>(path: string, options: ApiClientOptions = {}) {
  const accessToken = useAuthStore.getState().accessToken;

  return apiClient<T>(path, {
    ...options,
    headers: createAuthenticatedHeaders(options.headers, accessToken),
  });
}
