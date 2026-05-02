import type { Meta, StoryObj } from "@storybook/react";

import { BottomSheetActionButton, ModalActionButton, ModalActions } from "@/shared/ui";

const meta = {
  title: "UI/Button/ActionButtons",
  component: ModalActions,
  tags: ["autodocs"],
  args: {
    layout: "single",
    primary: null,
    secondary: null,
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[320px] bg-bg-01 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ModalActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <ModalActions layout="single" primary={<ModalActionButton variant="primary">확인</ModalActionButton>} />
  ),
  parameters: {
    docs: {
      description: {
        story: "단일 액션 버튼 레이아웃입니다.",
      },
    },
  },
};

export const Double: Story = {
  render: () => (
    <ModalActions
      layout="double"
      primary={<ModalActionButton variant="primary">저장</ModalActionButton>}
      secondary={<ModalActionButton variant="inactive">취소</ModalActionButton>}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "2개 버튼을 가로로 배치하는 레이아웃입니다.",
      },
    },
  },
};

export const Stacked: Story = {
  render: () => (
    <ModalActions
      layout="stacked"
      primary={<ModalActionButton variant="primary">확인</ModalActionButton>}
      secondary={<ModalActionButton variant="inactive">나중에</ModalActionButton>}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "2개 버튼을 세로로 쌓는 레이아웃입니다.",
      },
    },
  },
};

export const BottomSheet: Story = {
  render: () => <BottomSheetActionButton variant="primary">계속하기</BottomSheetActionButton>,
  parameters: {
    docs: {
      description: {
        story: "바텀시트 전용 풀너비 액션 버튼입니다.",
      },
    },
  },
};
