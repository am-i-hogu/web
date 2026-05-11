import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/shared/utils";

const tagVariants = cva("inline-flex items-center justify-center rounded-full px-3 py-1.5", {
  variants: {
    tone: {
      default: "bg-indigo-100 text-primary-default",
      active: "bg-primary-default !text-text-01",
      categoryActive: "bg-indigo-100 !text-primary-default",
      categoryInactive: "bg-line-02 text-text-03",
    },
    size: {
      sm: "text-small-m",
      md: "text-caption-m",
    },
  },
  defaultVariants: {
    tone: "default",
    size: "sm",
  },
});

export type TagProps = VariantProps<typeof tagVariants> & {
  as?: "span" | "button";
} & Omit<ComponentProps<"span">, "color"> &
  Omit<ComponentProps<"button">, "color">;

export function Tag(props: TagProps) {
  const { className, tone, size, as = "span", ...rest } = props;
  const Comp = as;
  return <Comp className={cn(tagVariants({ tone, size }), className)} {...rest} />;
}
