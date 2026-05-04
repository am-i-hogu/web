import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/shared/ui/button";
import { cn } from "@/shared/utils";

type ModalActionButtonProps = Omit<ButtonProps, "size" | "fullWidth"> & {
  size?: "modal" | "default";
};

type BottomSheetActionButtonProps = Omit<ButtonProps, "size" | "fullWidth">;

type ModalActionsProps = {
  className?: string;
  layout?: "single" | "double" | "stacked";
  primary: ReactNode;
  secondary?: ReactNode;
};

export function ModalActionButton({ size = "modal", className, ...props }: ModalActionButtonProps) {
  return <Button size={size} fullWidth className={cn("shrink-0", className)} {...props} />;
}

export function BottomSheetActionButton({ className, ...props }: BottomSheetActionButtonProps) {
  return <Button size="default" fullWidth className={className} {...props} />;
}

export function ModalActions(props: ModalActionsProps) {
  const { className, layout = "single", primary, secondary } = props;

  if (layout === "single") {
    return <div className={cn("flex w-full", className)}>{primary}</div>;
  }

  if (layout === "double") {
    return (
      <div className={cn("flex w-full items-center gap-2", className)}>
        <div className="min-w-0 flex-1">{secondary}</div>
        <div className="min-w-0 flex-1">{primary}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex w-full flex-col items-start gap-2", className)}>
      {primary}
      {secondary}
    </div>
  );
}
