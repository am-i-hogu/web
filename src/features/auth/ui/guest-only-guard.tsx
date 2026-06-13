"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { refreshAccessTokenOnce } from "@/features/auth/api";
import { useAuthStore } from "@/features/auth/model";
import { LoadingState } from "@/shared/ui";

type GuestOnlyGuardStatus = "checking" | "guest";

type GuestOnlyGuardProps = {
  children: ReactNode;
  fallback?: ReactNode;
  redirectPath?: string;
  skipRefresh?: boolean;
};

export function GuestOnlyGuard({ children, fallback, redirectPath = "/", skipRefresh = false }: GuestOnlyGuardProps) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);
  const [status, setStatus] = useState<GuestOnlyGuardStatus>("checking");

  useEffect(() => {
    if (accessToken) {
      router.replace(redirectPath);
      return;
    }

    if (skipRefresh) {
      setStatus("guest");
      return;
    }

    let isActive = true;
    setStatus("checking");

    // refreshToken 쿠키가 아직 유효하면 로그인 화면 대신 서비스 화면으로 돌려보낸다.
    refreshAccessTokenOnce()
      .then((response) => {
        if (!isActive) {
          return;
        }

        setAccessToken(response.accessToken);
        router.replace(redirectPath);
      })
      .catch(() => {
        if (!isActive) {
          return;
        }

        clearAccessToken();
        setStatus("guest");
      });

    return () => {
      isActive = false;
    };
  }, [accessToken, clearAccessToken, redirectPath, router, setAccessToken, skipRefresh]);

  if (status === "checking") {
    return fallback ?? <LoadingState className="min-h-dvh" />;
  }

  return children;
}
