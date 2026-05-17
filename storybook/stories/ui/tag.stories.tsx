import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@/shared/ui";

const meta = {
  title: "UI/Tag",
  component: Tag,
  tags: ["autodocs"],
  args: {
    children: "카테고리",
    tone: "default",
    size: "sm",
    as: "span",
  },
  argTypes: {
    tone: {
      control: { type: "select" },
      options: ["default", "active", "categoryActive", "categoryInactive"],
      description: "태그의 색상 톤을 지정합니다.",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
      description: "태그의 크기를 지정합니다.",
    },
    as: {
      control: { type: "select" },
      options: ["span", "button"],
      description: "태그의 렌더링 태그를 지정합니다.",
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
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const CategoryStyles: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Tag tone="categoryActive">판결중</Tag>
      <Tag tone="categoryInactive">판결완료</Tag>
    </div>
  ),
};

export const AsButton: Story = {
  args: {
    as: "button",
    tone: "active",
    children: "선택됨",
  },
};
