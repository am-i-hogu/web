import type { ReactNode } from "react";

import {
  Modal,
  ModalActionButton,
  ModalActions,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/shared/ui";

type UserDeleteCompleteModalProps = {
  open: boolean;
  onGoHome: () => void;
  title?: ReactNode;
  description?: ReactNode;
  confirmText?: ReactNode;
  className?: string;
};

function UserDeleteCompleteModal({
  open,
  onGoHome,
  title = "탈퇴 완료",
  description = "탈퇴가 완료되었습니다.",
  confirmText = "홈으로 돌아가기",
  className,
}: UserDeleteCompleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-filter-bg">
      <Modal padding="md" className={className}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalActions
            layout="single"
            primary={
              <ModalActionButton variant="primary" onClick={onGoHome}>
                {confirmText}
              </ModalActionButton>
            }
          />
        </ModalFooter>
      </Modal>
    </div>
  );
}

export type { UserDeleteCompleteModalProps };
export { UserDeleteCompleteModal };
