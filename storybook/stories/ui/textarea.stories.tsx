import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "@/shared/ui";

const meta = {
  title: "UI/Input/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    placeholder: "내용을 입력해 주세요.",
    defaultValue: "",
    disabled: false,
    variant: "filled",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "plain"],
      description: "Textarea 스타일 변형을 지정합니다.",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부를 지정합니다.",
    },
    placeholder: {
      control: "text",
      description: "placeholder 텍스트를 지정합니다.",
    },
    defaultValue: {
      control: "text",
      description: "초기 입력 값을 지정합니다.",
    },
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
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    variant: "filled",
  },
  parameters: {
    docs: {
      description: {
        story: "기본 Textarea 스타일입니다.",
      },
    },
  },
};

export const Plain: Story = {
  args: {
    variant: "plain",
  },
  parameters: {
    docs: {
      description: {
        story: "배경/패딩이 없는 plain 스타일입니다.",
      },
    },
  },
};
