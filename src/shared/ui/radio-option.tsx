import { clsx } from "clsx";
import type { ComponentProps, ReactNode } from "react";

export type RadioOptionProps = ComponentProps<"button"> & {
  checked: boolean;
  label: ReactNode;
  labelClassName?: string;
};

export function RadioOption(props: RadioOptionProps) {
  const { checked, label, className, labelClassName, type = "button", ...restProps } = props;
  return (
    <button type={type} className={clsx("flex items-center gap-2 text-left", className)} {...restProps}>
      <span
        className={
          checked
            ? "inline-flex size-5 items-center justify-center rounded-full border-2 border-primary-light bg-bg-01 text-primary-default"
            : "inline-flex size-5 rounded-full border-[1.25px] border-line-02 bg-bg-01"
        }
      >
        {checked ? <span className="size-2 rounded-full bg-primary-light" /> : null}
      </span>
      <span className={clsx("text-body-r text-text-04", labelClassName)}>{label}</span>
    </button>
  );
}
