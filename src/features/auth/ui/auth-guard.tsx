"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { refreshAccessTokenOnce } from "@/features/auth/api";
import { useAuthStore } from "@/features/auth/model";
import { LoadingState } from "@/shared/ui";

type AuthGuardStatus = "checking" | "authenticated";

type AuthGuardProps = {
  children: ReactNode;
  fallback?: ReactNode;
  redirectPath?: string;
};

export function AuthGuard({ children, fallback, redirectPath = "/login?errorCode=AUTH_REQUIRED" }: AuthGuardProps) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);
  const [status, setStatus] = useState<AuthGuardStatus>(() => (accessToken ? "authenticated" : "checking"));

  useEffect(() => {
    if (accessToken) {
      setStatus("authenticated");
      return;
    }

    let isActive = true;
    setStatus("checking");

    // accessToken은 메모리에만 있으므로 새로고침 후에는 refreshToken 쿠키로 복구를 시도한다.
    refreshAccessTokenOnce()
      .then((response) => {
        if (!isActive) {
          return;
        }

        setAccessToken(response.accessToken);
        setStatus("authenticated");
      })
      .catch(() => {
        if (!isActive) {
          return;
        }

        clearAccessToken();
        router.replace(redirectPath);
      });

    return () => {
      // refresh 응답이 늦게 도착해도 언마운트된 guard에는 상태를 반영하지 않는다.
      isActive = false;
    };
  }, [accessToken, clearAccessToken, redirectPath, router, setAccessToken]);

  if (status === "checking") {
    return fallback ?? <LoadingState className="min-h-full" />;
  }

  return children;
}
