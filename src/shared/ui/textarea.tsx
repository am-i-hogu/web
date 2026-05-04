import type { ComponentProps } from "react";

import { inputTextClassName } from "@/shared/ui/input";
import { cn } from "@/shared/utils";

type TextareaVariant = "filled" | "plain";

type TextareaProps = ComponentProps<"textarea"> & {
  variant?: TextareaVariant;
};

export function Textarea({ className, variant = "filled", ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        inputTextClassName,
        "w-full resize-none text-body-r placeholder:text-text-02",
        variant === "filled" &&
          "min-h-[145px] rounded-[var(--radius-common-radius)] bg-bg-02 px-3 py-2 disabled:pointer-events-none",
        variant === "plain" && "min-h-[145px] flex-1 bg-transparent px-0 py-0",
        className,
      )}
      {...props}
    />
  );
}
