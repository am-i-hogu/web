import type { ReactNode } from "react";
import LockKeyFillIcon from "@/assets/icons/lock-key-fill.svg";
import {
  Modal,
  ModalActionButton,
  ModalActions,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalIcon,
  ModalTitle,
} from "@/shared/ui";

type LoginRequiredModalProps = {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
  title?: ReactNode;
  description?: ReactNode;
  loginText?: ReactNode;
  closeText?: ReactNode;
  className?: string;
};

export function LoginRequiredModal(props: LoginRequiredModalProps) {
  const {
    open,
    onClose,
    onLogin,
    title = "로그인이 필요해요",
    description = "서비스 이용을 위해 로그인해 주세요.",
    loginText = "로그인하기",
    closeText = "닫기",
    className,
  } = props;

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-filter-bg">
      <Modal padding="lg" className={className}>
        <ModalHeader align="center">
          <ModalIcon className="bg-indigo-100">
            <LockKeyFillIcon aria-hidden className="size-8 fill-primary-default" />
          </ModalIcon>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalActions
            layout="stacked"
            primary={
              <ModalActionButton variant="primary" onClick={onLogin}>
                {loginText}
              </ModalActionButton>
            }
            secondary={
              <ModalActionButton variant="inactive" onClick={onClose}>
                {closeText}
              </ModalActionButton>
            }
          />
        </ModalFooter>
      </Modal>
    </div>
  );
}
