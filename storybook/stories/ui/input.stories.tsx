import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/shared/ui";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "텍스트를 입력해주세요",
    disabled: false,
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트를 지정합니다.",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태를 지정합니다.",
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "기본 Input 상태입니다.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "입력 불가 상태",
  },
  parameters: {
    docs: {
      description: {
        story: "비활성화 Input 상태입니다.",
      },
    },
  },
};
