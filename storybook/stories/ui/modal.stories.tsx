import type { Meta, StoryObj } from "@storybook/react";

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

const meta = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: {
    children: null,
    padding: "md",
  },
  argTypes: {
    padding: {
      control: "radio",
      options: ["md", "lg"],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[520px] items-center justify-center bg-bg-02 p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoginRequired: Story = {
  render: ({ padding }) => (
    <Modal padding={padding}>
      <ModalHeader align="center">
        <ModalIcon className="bg-indigo-100">
          <LockKeyFillIcon aria-hidden className="size-8 fill-primary-default" />
        </ModalIcon>
        <ModalTitle>로그인이 필요합니다</ModalTitle>
        <ModalDescription>로그인 후 계속 진행할 수 있습니다.</ModalDescription>
      </ModalHeader>
      <ModalFooter>
        <ModalActions
          layout="stacked"
          primary={<ModalActionButton variant="primary">로그인하기</ModalActionButton>}
          secondary={<ModalActionButton variant="inactive">닫기</ModalActionButton>}
        />
      </ModalFooter>
    </Modal>
  ),
  parameters: {
    docs: {
      description: {
        story: "아이콘과 세로 액션 버튼을 포함한 로그인 유도 모달입니다.",
      },
    },
  },
};

export const ConfirmDoubleAction: Story = {
  render: ({ padding }) => (
    <Modal padding={padding}>
      <ModalHeader>
        <ModalTitle>정말 삭제할까요?</ModalTitle>
        <ModalDescription>삭제 후에는 되돌릴 수 없습니다.</ModalDescription>
      </ModalHeader>
      <ModalFooter>
        <ModalActions
          layout="double"
          secondary={<ModalActionButton variant="inactive">취소</ModalActionButton>}
          primary={<ModalActionButton variant="danger">삭제</ModalActionButton>}
        />
      </ModalFooter>
    </Modal>
  ),
  parameters: {
    docs: {
      description: {
        story: "좌우 2개 액션 버튼을 사용하는 확인 모달입니다.",
      },
    },
  },
};

export const SingleAction: Story = {
  render: ({ padding }) => (
    <Modal padding={padding}>
      <ModalHeader>
        <ModalTitle>설정이 저장되었습니다</ModalTitle>
        <ModalDescription>변경한 설정이 즉시 반영됩니다.</ModalDescription>
      </ModalHeader>
      <ModalFooter>
        <ModalActions layout="single" primary={<ModalActionButton variant="primary">확인</ModalActionButton>} />
      </ModalFooter>
    </Modal>
  ),
  parameters: {
    docs: {
      description: {
        story: "단일 액션 버튼을 사용하는 완료 모달입니다.",
      },
    },
  },
};

export const SingleDisabled: Story = {
  render: ({ padding }) => (
    <Modal padding={padding}>
      <ModalHeader align="center">
        <ModalTitle>필수 정보가 부족합니다</ModalTitle>
        <ModalDescription>모든 항목을 입력한 뒤 다시 시도해 주세요.</ModalDescription>
      </ModalHeader>
      <ModalFooter>
        <ModalActions
          layout="single"
          primary={
            <ModalActionButton variant="disabled" disabled>
              확인
            </ModalActionButton>
          }
        />
      </ModalFooter>
    </Modal>
  ),
  parameters: {
    docs: {
      description: {
        story: "비활성화된 단일 버튼 상태를 확인하는 모달입니다.",
      },
    },
  },
};
