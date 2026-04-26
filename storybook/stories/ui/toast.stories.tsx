import type { Meta, StoryObj } from "@storybook/react";

import { Toast } from "@/shared/ui/toast";

const meta = {
  title: "UI/Toast",
  component: Toast,
  args: {
    message: "메시지 내용입니다.",
    tone: "success",
    size: "app",
  },
  argTypes: {
    tone: {
      control: "radio",
      options: ["success", "warning"],
    },
    size: {
      control: "radio",
      options: ["app", "web"],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-40 items-center justify-center bg-bg-02 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const APP: Story = {
  args: {
    tone: "success",
    size: "app",
    message: "메시지 내용이 들어갑니다.",
  },
};

export const Web: Story = {
  args: {
    tone: "success",
    size: "web",
    message: "메시지 내용이 들어갑니다.",
  },
};
