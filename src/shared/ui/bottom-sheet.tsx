import type * as React from "react";
import XIcon from "@/assets/icons/x.svg";
import { cn } from "@/shared/utils";

type BottomSheetProps = {
  className?: string;
  children: React.ReactNode;
};

function BottomSheet({ className, children }: BottomSheetProps) {
  return (
    <section
      data-slot="bottom-sheet"
      className={cn("flex w-full max-w-[375px] flex-col rounded-t-lg bg-bg-01", className)}
    >
      {children}
    </section>
  );
}

function BottomSheetHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header data-slot="bottom-sheet-header" className={cn("flex flex-col gap-1 px-4 pt-4", className)} {...props} />
  );
}

type BottomSheetTitleRowProps = {
  className?: string;
  title: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
};

function BottomSheetTitleRow({ className, title, onClose, closeLabel = "닫기" }: BottomSheetTitleRowProps) {
  return (
    <div className={cn("flex w-full items-center justify-between gap-2", className)}>
      <h2 className="text-title2-m text-text-04">{title}</h2>
      <button
        type="button"
        aria-label={closeLabel}
        className="inline-flex size-5 items-center justify-center rounded-full text-text-03 hover:bg-bg-02 hover:text-text-04"
        onClick={onClose}
      >
        <XIcon />
      </button>
    </div>
  );
}

function BottomSheetDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="bottom-sheet-description" className={cn("text-body-r text-text-03", className)} {...props} />;
}

function BottomSheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="bottom-sheet-body" className={cn("w-full px-4 py-4", className)} {...props} />;
}

function BottomSheetFooter({ className, ...props }: React.ComponentProps<"footer">) {
  return <footer data-slot="bottom-sheet-footer" className={cn("w-full px-4 pb-4", className)} {...props} />;
}

function BottomSheetHomeIndicator({ className }: { className?: string }) {
  return (
    <div
      data-slot="bottom-sheet-home-indicator"
      className={cn("flex h-7 w-full items-center justify-center", className)}
    >
      <div className="h-[5px] w-[134px] rounded-full bg-text-04" />
    </div>
  );
}

export type { BottomSheetProps, BottomSheetTitleRowProps };
export {
  BottomSheet,
  BottomSheetBody,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetHomeIndicator,
  BottomSheetTitleRow,
};
