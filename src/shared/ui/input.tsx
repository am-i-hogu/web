import { clsx } from "clsx";
import type * as React from "react";

type InputProps = React.ComponentProps<"input">;

function Input({ className, ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      className={clsx(
        "px-3 py-2 h-11 w-full rounded-[var(--radius-common-radius)] bg-bg-02 px-2 text-body-r text-text-04 placeholder:text-text-02 focus-visible:outline-none disabled:pointer-events-none disabled:text-text-02",
        className,
      )}
      {...props}
    />
  );
}

export type { InputProps };
export { Input };
