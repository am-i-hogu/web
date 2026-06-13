import type { ReactNode } from "react";
import { AuthGuard } from "@/features/auth/ui";

export default function MypageLayout({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
