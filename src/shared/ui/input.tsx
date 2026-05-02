import type { ComponentProps } from "react";
import { cn } from "@/shared/utils";

export const inputTextClassName = "w-full bg-transparent text-text-04 focus-visible:outline-none disabled:text-text-02";
type InputVariant = "filled" | "plain";
type InputProps = ComponentProps<"input"> & {
  variant?: InputVariant;
};

export function Input({ className, variant = "filled", ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      className={cn(
        inputTextClassName,
        variant === "filled" &&
          "h-11 rounded-[var(--radius-common-radius)] bg-bg-02 px-3 py-2 placeholder:text-text-02 disabled:pointer-events-none",
        variant === "plain" && "h-full min-w-0 flex-1 bg-transparent px-0 py-0 placeholder:text-text-02",
        className,
      )}
      {...props}
    />
  );
}
