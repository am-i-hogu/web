import type { Meta, StoryObj } from "@storybook/react";
import CheckIcon from "@/assets/icons/check.svg";
import { Badge } from "@/shared/ui";

const meta = {
  title: "UI/Button/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "대표 이미지",
    tone: "default",
    size: "sm",
    as: "span",
  },
  argTypes: {
    tone: {
      control: { type: "select" },
      options: ["default", "strong"],
      description: "배지의 색상 톤을 지정합니다.",
    },
    size: {
      control: { type: "select" },
      options: ["sm"],
      description: "배지 크기를 지정합니다.",
    },
    as: {
      control: { type: "select" },
      options: ["span", "button"],
      description: "배지의 렌더링 태그를 지정합니다.",
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
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Badge {...args}>
      <CheckIcon aria-hidden className="size-2" strokeWidth={3} />
      대표 이미지
    </Badge>
  ),
  parameters: {
    docs: {
      description: {
        story: "기본 배지 스타일입니다.",
      },
    },
  },
};

export const Strong: Story = {
  args: {
    tone: "strong",
  },
  render: (args) => (
    <Badge {...args}>
      <CheckIcon aria-hidden className="size-2" strokeWidth={3} />
      대표 이미지
    </Badge>
  ),
  parameters: {
    docs: {
      description: {
        story: "강조 배지 스타일입니다.",
      },
    },
  },
};
