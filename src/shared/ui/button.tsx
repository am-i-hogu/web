import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";

import { cn } from "@/shared/utils";

const buttonVariants = cva("", {
  variants: {
    variant: {
      primary: "bg-primary-default text-text-01 hover:bg-primary-strong",
      disabled: "border-bg-02 bg-bg-02 text-text-02",
      inactive: "border-bg-02 bg-bg-02 text-text-04",
      danger: "bg-danger text-text-01 hover:bg-red-600",
      kakao: "bg-social-kakao text-social-label-strong hover:brightness-95",
      google: "border bg-bg-01 text-social-label-strong hover:bg-bg-02",
    },
    size: {
      default: "h-12 px-5",
      modal: "h-11 px-4 py-2",
      iconSm: "size-7 rounded-full p-0",
      iconLg: "size-14 rounded-full p-0 [&_svg:not([class*='size-'])]:size-6",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
    fullWidth: false,
  },
});

function Button(
  inputProps: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
      leftIcon?: React.ReactNode;
      rightIcon?: React.ReactNode;
    },
) {
  const {
    className,
    variant = "primary",
    size = "default",
    fullWidth,
    asChild = false,
    leftIcon,
    rightIcon,
    children,
    ...props
  } = inputProps;
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    >
      {leftIcon ? <span data-slot="button-left-icon">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span data-slot="button-right-icon">{rightIcon}</span> : null}
    </Comp>
  );
}

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

export type { ButtonProps };
export { Button, buttonVariants };
