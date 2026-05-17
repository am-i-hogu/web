import type { ComponentProps, ReactNode } from "react";
import XIcon from "@/assets/icons/x.svg";
import { cn } from "@/shared/utils";

export type BottomSheetProps = {
  className?: string;
  children: ReactNode;
};

export type BottomSheetTitleRowProps = {
  className?: string;
  title: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
};

export function BottomSheet({ className, children }: BottomSheetProps) {
  return (
    <section data-slot="bottom-sheet" className={cn("flex w-full flex-col rounded-t-lg bg-bg-01", className)}>
      {children}
    </section>
  );
}

export function BottomSheetHeader({ className, ...props }: ComponentProps<"header">) {
  return (
    <header data-slot="bottom-sheet-header" className={cn("flex flex-col gap-1 px-4 pt-4", className)} {...props} />
  );
}

export function BottomSheetTitleRow({ className, title, onClose, closeLabel = "닫기" }: BottomSheetTitleRowProps) {
  return (
    <div className={cn("flex w-full items-center justify-between gap-2", className)}>
      <h2 className="text-title2-m text-text-04">{title}</h2>
      <button
        type="button"
        aria-label={closeLabel}
        className="inline-flex size-5 items-center justify-center rounded-full text-text-03"
        onClick={onClose}
      >
        <XIcon strokeWidth={20} />
      </button>
    </div>
  );
}

export function BottomSheetDescription({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="bottom-sheet-description" className={cn("text-body-r text-text-03", className)} {...props} />;
}

export function BottomSheetBody({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="bottom-sheet-body" className={cn("w-full px-4 py-4", className)} {...props} />;
}

export function BottomSheetFooter({ className, ...props }: ComponentProps<"footer">) {
  return <footer data-slot="bottom-sheet-footer" className={cn("w-full px-4 pb-4", className)} {...props} />;
}

export function BottomSheetHomeIndicator({ className }: { className?: string }) {
  return (
    <div
      data-slot="bottom-sheet-home-indicator"
      className={cn("flex h-7 w-full items-center justify-center", className)}
    >
      <div className="h-[5px] w-[134px] rounded-full bg-text-04" />
    </div>
  );
}
