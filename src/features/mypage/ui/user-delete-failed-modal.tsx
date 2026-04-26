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

type UserDeleteFailedModalProps = {
  open: boolean;
  onClose: () => void;
  onRetry: () => void;
  title?: ReactNode;
  description?: ReactNode;
  retryText?: ReactNode;
  cancelText?: ReactNode;
  className?: string;
};

function UserDeleteFailedModal({
  open,
  onClose,
  onRetry,
  title = "탈퇴 실패",
  description = "탈퇴 처리에 실패하였습니다.\n재시도 하시겠습니까?",
  retryText = "재시도",
  cancelText = "취소하기",
  className,
}: UserDeleteFailedModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-filter-bg">
      <Modal padding="md" className={className}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription className="whitespace-pre-line">{description}</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalActions
            layout="double"
            secondary={
              <ModalActionButton variant="inactive" onClick={onClose}>
                {cancelText}
              </ModalActionButton>
            }
            primary={
              <ModalActionButton variant="primary" onClick={onRetry}>
                {retryText}
              </ModalActionButton>
            }
          />
        </ModalFooter>
      </Modal>
    </div>
  );
}

export type { UserDeleteFailedModalProps };
export { UserDeleteFailedModal };
