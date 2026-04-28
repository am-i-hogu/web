import { clsx } from "clsx";
import type * as React from "react";

import { cn } from "@/shared/utils";

type ModalProps = {
  className?: string;
  children: React.ReactNode;
  padding?: "md" | "lg";
};

function Modal(props: ModalProps) {
  const { className, children, padding = "md" } = props;
  return (
    <section
      data-slot="modal"
      className={cn(
        "flex w-full max-w-[343px] flex-col overflow-hidden rounded-lg bg-bg-01 shadow-emphasize",
        padding === "lg" ? "gap-5 px-5 py-6" : "gap-4 p-4",
        className,
      )}
    >
      {children}
    </section>
  );
}

type ModalHeaderProps = {
  className?: string;
  align?: "left" | "center";
  children: React.ReactNode;
};

function ModalHeader(props: ModalHeaderProps) {
  const { className, align = "left", children } = props;
  return (
    <header
      data-slot="modal-header"
      className={cn("flex flex-col gap-2", align === "center" ? "items-center text-center" : "items-start", className)}
    >
      {children}
    </header>
  );
}

function ModalTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 data-slot="modal-title" className={clsx("text-title2-b text-text-04", className)} {...props} />;
}

function ModalDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="modal-description" className={clsx("text-body-r text-text-03", className)} {...props} />;
}

function ModalIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-icon"
      className={cn("inline-flex size-16 items-center justify-center rounded-full text-primary-default", className)}
      {...props}
    />
  );
}

function ModalBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="modal-body" className={cn("w-full", className)} {...props} />;
}

function ModalFooter({ className, ...props }: React.ComponentProps<"footer">) {
  return <footer data-slot="modal-footer" className={cn("w-full", className)} {...props} />;
}

export type { ModalHeaderProps, ModalProps };
export { Modal, ModalBody, ModalDescription, ModalFooter, ModalHeader, ModalIcon, ModalTitle };
