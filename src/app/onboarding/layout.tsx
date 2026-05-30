import type { ReactNode } from "react";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return <main className="flex min-h-dvh flex-col px-4 pt-31 pb-8">{children}</main>;
}
