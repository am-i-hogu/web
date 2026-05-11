import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import PencilSimpleIcon from "@/assets/icons/pencil-simple-fill.svg";
import { PostWriteButton, Toast } from "@/shared/ui";

const meta = {
  title: "UI/Button/PostWriteButton",
  component: PostWriteButton,
  tags: ["autodocs"],
  args: {
    href: "#",
    text: "새 게시글 작성하기",
    useFlexLayout: true,
    extraBottomOffset: 0,
  },
  argTypes: {
    href: {
      control: "text",
      description: "작성 페이지 링크입니다.",
    },
    text: {
      control: "text",
      description: "팝오버 액션 텍스트입니다.",
    },
    useFlexLayout: {
      control: "boolean",
      description: "스토리북/레이아웃 환경에서 상대 배치를 사용합니다.",
    },
    extraBottomOffset: {
      control: { type: "number", min: 0, step: 1 },
      description: "버튼 하단 오프셋입니다.",
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="relative h-[220px] w-[320px] bg-bg-01 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PostWriteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative h-[220px] w-[320px]">
        <PostWriteButton
          {...args}
          onItemClick={(event) => {
            event.preventDefault();
            setVisible(true);
          }}
        />
        {visible ? (
          <div className="pointer-events-none absolute bottom-2 left-1/2 z-[60] w-[290px] -translate-x-1/2">
            <Toast
              size="web"
              tone="warning"
              message="게시글 작성 페이지로 연동 테스트 중입니다."
              onClose={() => setVisible(false)}
            />
          </div>
        ) : null}
      </div>
    );
  },
};

export const CustomIcon: Story = {
  args: {
    itemIcon: <PencilSimpleIcon aria-hidden className="size-5 text-text-03" />,
    text: "직접 고민 작성하기",
  },
};

export const ToastPreview: Story = {
  args: {
    text: "작성 비활성",
  },
  render: (args) => (
    <div className="relative h-[220px] w-[320px]">
      <PostWriteButton {...args} onItemClick={(event) => event.preventDefault()} />
      <div className="pointer-events-none absolute bottom-2 left-1/2 z-[60] w-[290px] -translate-x-1/2">
        <Toast size="web" tone="warning" message="연동 테스트용 스토리입니다." />
      </div>
    </div>
  ),
};
