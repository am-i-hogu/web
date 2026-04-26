import type * as React from "react";
import CheckIcon from "@/assets/icons/check.svg";
import ExclamationIcon from "@/assets/icons/exclamation-mark.svg";
import XIcon from "@/assets/icons/x.svg";
import { cn } from "@/shared/utils";

type ToastTone = "success" | "warning";
type ToastSize = "app" | "web";

type StatusIconProps = {
  tone: ToastTone;
  size: ToastSize;
};

function StatusIcon({ tone, size }: StatusIconProps) {
  const isWeb = size === "web";

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center justify-center rounded-full text-white",
        isWeb ? "size-7 text-[14px]" : "size-5 text-[11px]",
        tone === "success" ? "bg-success" : "bg-warning text-text-04",
      )}
    >
      {tone === "success" ? (
        <CheckIcon className={cn(isWeb ? "size-4" : "size-3")} strokeWidth={isWeb ? 3.2 : 3} />
      ) : (
        <ExclamationIcon className={cn(isWeb ? "size-4" : "size-3")} strokeWidth={isWeb ? 20 : 18} />
      )}
    </span>
  );
}

type ToastProps = {
  className?: string;
  message: React.ReactNode;
  tone?: ToastTone;
  size?: ToastSize;
  onClose?: () => void;
};

function Toast({ className, message, tone = "success", size = "app", onClose }: ToastProps) {
  const isWeb = size === "web";

  return (
    <div
      role="status"
      aria-live="polite"
      data-slot="toast"
      data-tone={tone}
      data-size={size}
      className={cn(
        "inline-flex w-full items-center justify-between rounded-full bg-black/30 px-4 text-text-01",
        isWeb ? "h-[52px] max-w-[400px]" : "h-12 max-w-[343px]",
        className,
      )}
    >
      <div className={cn("flex min-w-0 flex-1 items-center", isWeb ? "gap-3" : "gap-2")}>
        <StatusIcon tone={tone} size={size} />
        <p className="truncate text-body-m">{message}</p>
      </div>
      <button
        type="button"
        aria-label="닫기"
        className="ml-2 inline-flex size-5 items-center justify-center rounded-full text-text-01/80"
        onClick={onClose}
      >
        <XIcon className="size-4 text-text-03" strokeWidth={18} />
      </button>
    </div>
  );
}

export type { ToastProps, ToastSize, ToastTone };
export { Toast };
