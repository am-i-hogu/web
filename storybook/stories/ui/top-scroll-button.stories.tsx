import type { Meta, StoryObj } from "@storybook/react";

import { TopScrollButton } from "@/shared/ui";

const meta = {
  title: "UI/TopScrollButton",
  component: TopScrollButton,
  tags: ["autodocs"],
  args: {
    useFlexLayout: false,
    extraBottomOffset: 0,
    isFloatingOpen: false,
    threshold: 200,
    forceVisible: true,
  },
  argTypes: {
    useFlexLayout: {
      control: "boolean",
      description: "부모 flex 레이아웃 안에서 사용할지 지정합니다.",
    },
    extraBottomOffset: {
      control: { type: "number", min: 0, step: 1 },
      description: "flex 레이아웃일 때 추가 하단 오프셋(px)입니다.",
    },
    isFloatingOpen: {
      control: "boolean",
      description: "다른 플로팅 레이어가 열릴 때 버튼을 숨깁니다.",
    },
    threshold: {
      control: { type: "number", min: 0, step: 10 },
      description: "버튼이 나타나는 스크롤 기준값(px)입니다.",
    },
    forceVisible: {
      control: "boolean",
      description: "스토리에서 강제로 표시 상태를 확인할 때 사용합니다.",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TopScrollButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="relative min-h-[1200px] bg-bg-02 p-6">
      <p className="text-body-r text-text-03">스크롤 탑 버튼 동작 확인용 스토리입니다.</p>
      <TopScrollButton {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "스크롤 기준값 또는 강제 표시로 TopScrollButton 상태를 확인합니다.",
      },
    },
  },
};
