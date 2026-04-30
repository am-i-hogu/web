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

export type PostDeleteMode = "post" | "opinion" | "reply";

const deleteModalCopyByMode: Record<PostDeleteMode, { title: ReactNode; description: ReactNode }> = {
  post: {
    title: "게시글 삭제",
    description: "해당 게시글을 삭제하시겠습니까?",
  },
  opinion: {
    title: "의견 삭제",
    description: "해당 의견을 삭제하시겠습니까?",
  },
  reply: {
    title: "답글 삭제",
    description: "해당 답글을 삭제하시겠습니까?",
  },
};

type PostDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: (mode: PostDeleteMode) => void;
  mode?: PostDeleteMode;
  title?: ReactNode;
  description?: ReactNode;
  confirmText?: ReactNode;
  cancelText?: ReactNode;
  className?: string;
};

export function PostDeleteModal(props: PostDeleteModalProps) {
  const {
    open,
    onClose,
    onConfirmDelete,
    mode = "post",
    title,
    description,
    confirmText = "삭제하기",
    cancelText = "취소",
    className,
  } = props;

  const resolvedTitle = title ?? deleteModalCopyByMode[mode].title;
  const resolvedDescription = description ?? deleteModalCopyByMode[mode].description;

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-filter-bg p-5">
      <Modal padding="md" className={className}>
        <ModalHeader>
          <ModalTitle>{resolvedTitle}</ModalTitle>
          <ModalDescription>{resolvedDescription}</ModalDescription>
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
              <ModalActionButton variant="danger" onClick={() => onConfirmDelete(mode)}>
                {confirmText}
              </ModalActionButton>
            }
          />
        </ModalFooter>
      </Modal>
    </div>
  );
}
