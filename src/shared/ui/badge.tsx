import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import type { ComponentProps } from "react";

const badgeVariants = cva("inline-flex items-center justify-center whitespace-nowrap", {
  variants: {
    tone: {
      default: "border border-line-01 bg-bg-01 text-text-02",
      strong: "border border-primary-strong bg-primary-strong text-text-01",
    },
    size: {
      sm: "h-6 gap-1 rounded-[4px] px-1 text-small-m",
    },
  },
  defaultVariants: {
    tone: "default",
    size: "sm",
  },
});

export type BadgeProps = VariantProps<typeof badgeVariants> & {
  as?: "span" | "button";
} & Omit<ComponentProps<"span">, "color"> &
  Omit<ComponentProps<"button">, "color">;

export function Badge({ className, tone, size, as = "span", ...rest }: BadgeProps) {
  const Comp = as;
  return <Comp className={clsx(className, badgeVariants({ tone, size }))} {...rest} />;
}
