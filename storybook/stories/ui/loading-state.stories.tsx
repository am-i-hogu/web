import type { Meta, StoryObj } from "@storybook/react";

import { LoadingState } from "@/shared/ui";

const meta = {
  title: "UI/LoadingState",
  component: LoadingState,
  tags: ["autodocs"],
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
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "전체 화면 로딩 상태입니다. route-level loading.tsx 또는 Suspense fallback으로 사용합니다.",
      },
    },
  },
};

export const Inline: Story = {
  args: {
    className: "min-h-0 py-20",
  },
  parameters: {
    docs: {
      description: {
        story: "페이지 일부 영역에서 부분 로딩을 표시할 때 사용합니다.",
      },
    },
  },
};
