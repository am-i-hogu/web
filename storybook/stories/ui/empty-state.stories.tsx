import type { Meta, StoryObj } from "@storybook/react";

import ChatsIcon from "@/assets/icons/chats.svg";
import QuestionIcon from "@/assets/icons/question.svg";
import SectionPlusIcon from "@/assets/icons/selection-plus.svg";
import { EmptyState } from "@/shared/ui";

const meta = {
  title: "UI/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    title: "작성된 게시글이 없습니다.\n게시글을 추가하여 판결을 받아보세요!",
  },
  argTypes: {
    title: {
      control: "text",
      description: "메인 문구를 입력합니다. 줄바꿈은 \\n으로 표현합니다.",
    },
    description: {
      control: "text",
      description: "보조 문구를 입력합니다.",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-bg-01">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoPosts: Story = {
  args: {
    icon: <SectionPlusIcon className="size-20 text-text-03" strokeWidth={8} />,
  },
  parameters: {
    docs: {
      description: {
        story: "게시글이 없는 상태 예시입니다.",
      },
    },
  },
};

export const NoComments: Story = {
  args: {
    icon: <ChatsIcon className="size-12 text-text-02" strokeWidth={10} />,
    title: "아직 작성된 집단 지성이 없습니다.",
    titleClassName: "text-text-02",
  },
  parameters: {
    docs: {
      description: {
        story: "댓글/의견이 비어있는 상태 예시입니다.",
      },
    },
  },
};

export const LevelUnavailable: Story = {
  args: {
    icon: <QuestionIcon className="size-12 text-text-02" strokeWidth={10} fill="text-text-02" />,
    title: "레벨을 집계할 수 없습니다.",
    titleClassName: "text-text-02",
  },
  parameters: {
    docs: {
      description: {
        story: "레벨 계산 실패 상태 예시입니다.",
      },
    },
  },
};
