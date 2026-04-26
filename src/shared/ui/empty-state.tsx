import type { ReactNode } from "react";

import { cn } from "@/shared/utils";

type EmptyStateProps = {
  className?: string;
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
};

function EmptyState(props: EmptyStateProps) {
  const { className, icon, title, description, titleClassName, descriptionClassName, contentClassName } = props;
  return (
    <figure className={cn("flex min-h-[calc(100dvh-60px)] w-full items-center justify-center px-5 py-12", className)}>
      <div className={cn("flex max-w-[335px] flex-col items-center gap-4 text-center", contentClassName)}>
        {icon ? <div className="shrink-0">{icon}</div> : null}
        <figcaption className={cn("whitespace-pre-line text-body-m text-text-03", titleClassName)}>{title}</figcaption>
        {description ? (
          <p className={cn("whitespace-pre-line text-caption-m text-text-02", descriptionClassName)}>{description}</p>
        ) : null}
      </div>
    </figure>
  );
}

export type { EmptyStateProps };
export { EmptyState };
