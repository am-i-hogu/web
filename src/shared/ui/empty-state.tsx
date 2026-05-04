import type { ReactNode } from "react";
import { cn } from "@/shared/utils";

export type EmptyStateProps = {
  className?: string;
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  maxWidthClassName?: string;
};

export function EmptyState(props: EmptyStateProps) {
  const {
    className,
    icon,
    title,
    description,
    titleClassName,
    descriptionClassName,
    contentClassName,
    maxWidthClassName = "max-w-[335px]",
  } = props;
  return (
    <figure className={cn("flex min-h-[calc(100dvh-60px)] w-full items-center justify-center px-5 py-12", className)}>
      <div className={cn("flex flex-col items-center gap-4 text-center", maxWidthClassName, contentClassName)}>
        {icon ? <div className="shrink-0">{icon}</div> : null}
        <figcaption className={cn("whitespace-pre-line text-body-m text-text-03", titleClassName)}>{title}</figcaption>
        {description ? (
          <p className={cn("whitespace-pre-line text-caption-m text-text-02", descriptionClassName)}>{description}</p>
        ) : null}
      </div>
    </figure>
  );
}
