"use client";

import { type ReactNode, useEffect, useState } from "react";

import { UserDeleteCompleteModal } from "@/features/mypage/ui/user-delete-complete-modal";
import { UserDeleteConfirmModal } from "@/features/mypage/ui/user-delete-confirm-modal";
import { UserDeleteFailedModal } from "@/features/mypage/ui/user-delete-failed-modal";
import {
  type UserDeleteReason,
  UserDeleteReasonModal,
  type UserDeleteSubmitPayload,
} from "@/features/mypage/ui/user-delete-reason-modal";

type UserDeleteFlowStep = "confirm" | "reason" | "complete" | "failed";

type UserDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: (payload: UserDeleteSubmitPayload) => boolean | Promise<boolean | undefined> | undefined;
  initialStep?: UserDeleteFlowStep;
  initialReason?: UserDeleteReason | null;
  initialReasonDetail?: string;
  confirmTitle?: ReactNode;
  confirmDescription?: ReactNode;
  className?: string;
};

export function UserDeleteModal({
  open,
  onClose,
  onConfirmDelete,
  initialStep = "confirm",
  initialReason = null,
  initialReasonDetail = "",
  confirmTitle,
  confirmDescription,
  className,
}: UserDeleteModalProps) {
  const [step, setStep] = useState<UserDeleteFlowStep>(initialStep);
  const [latestPayload, setLatestPayload] = useState<UserDeleteSubmitPayload | null>(null);

  useEffect(() => {
    if (!open) return;
    setStep(initialStep);
    setLatestPayload(null);
  }, [initialStep, open]);

  if (!open) return null;

  const submitDelete = async (payload: UserDeleteSubmitPayload) => {
    setLatestPayload(payload);

    try {
      const result = await onConfirmDelete(payload);
      if (result === false) {
        setStep("failed");
        return;
      }
      setStep("complete");
    } catch {
      setStep("failed");
    }
  };

  const handleRetry = () => {
    if (!latestPayload) {
      setStep("reason");
      return;
    }
    submitDelete(latestPayload).catch(() => {
      setStep("failed");
    });
  };

  return (
    <>
      <UserDeleteConfirmModal
        open={step === "confirm"}
        onClose={onClose}
        onConfirmDelete={() => setStep("reason")}
        title={confirmTitle}
        description={confirmDescription}
        className={className}
      />

      <UserDeleteReasonModal
        open={step === "reason"}
        onClose={onClose}
        onConfirmDelete={(payload) => {
          submitDelete(payload).catch(() => {
            setStep("failed");
          });
        }}
        initialReason={initialReason}
        initialReasonDetail={initialReasonDetail}
        className={className}
      />

      <UserDeleteCompleteModal open={step === "complete"} onGoHome={onClose} className={className} />

      <UserDeleteFailedModal open={step === "failed"} onClose={onClose} onRetry={handleRetry} className={className} />
    </>
  );
}

export type { UserDeleteFlowStep, UserDeleteReason, UserDeleteSubmitPayload };
