import type { Meta, StoryObj } from "@storybook/react";
import CheckIcon from "@/assets/icons/check.svg";
import XIcon from "@/assets/icons/x.svg";
import { Chip } from "@/shared/ui";

const meta = {
  title: "UI/Button/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: {
    children: "투표중",
    tone: "inactive",
    size: "md",
    disabled: false,
  },
  argTypes: {
    tone: {
      control: { type: "select" },
      options: ["active", "inactive", "highlight"],
      description: "칩의 색상 톤을 지정합니다.",
    },
    size: {
      control: { type: "select" },
      options: ["md", "sm"],
      description: "칩의 크기를 지정합니다.",
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
      <div className="bg-bg-01 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithIcons: Story = {
  args: {
    tone: "active",
    leftIcon: <CheckIcon aria-hidden className="size-3" strokeWidth={20} />,
    rightIcon: <XIcon aria-hidden className="size-3" strokeWidth={20} />,
    children: "선택됨",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "비활성",
  },
};
