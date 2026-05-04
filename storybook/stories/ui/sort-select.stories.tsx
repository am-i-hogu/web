import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { SortSelect, type SortSelectOption } from "@/shared/ui";

type SortValue = "latest" | "popular" | "comments";

type SortSelectStoryProps = {
  value: SortValue;
  options: readonly SortSelectOption<SortValue>[];
  ariaLabel?: string;
  className?: string;
};

const defaultOptions: readonly SortSelectOption<SortValue>[] = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "인기순" },
  { value: "comments", label: "댓글 많은 순" },
] as const;

function SortSelectStory({ value, options, ariaLabel = "정렬", className }: SortSelectStoryProps) {
  const [selected, setSelected] = useState<SortValue>(value);

  return (
    <SortSelect value={selected} options={options} onChange={setSelected} ariaLabel={ariaLabel} className={className} />
  );
}

const meta = {
  title: "UI/SortSelect",
  component: SortSelectStory,
  tags: ["autodocs"],
  args: {
    value: "latest",
    options: defaultOptions,
    ariaLabel: "정렬",
    className: "",
  },
  argTypes: {
    value: {
      control: { type: "select" },
      options: ["latest", "popular", "comments"],
      description: "기본 선택 값을 지정합니다.",
    },
    ariaLabel: {
      control: "text",
      description: "접근성을 위한 라벨 텍스트를 지정합니다.",
    },
    className: {
      control: "text",
      description: "외부에서 추가 클래스를 주입합니다.",
    },
    options: {
      control: "object",
      description: "드롭다운에 노출할 정렬 옵션 목록입니다.",
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
} satisfies Meta<typeof SortSelectStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LongLabels: Story = {
  args: {
    value: "popular",
    options: [
      { value: "latest", label: "최신 등록된 게시글 순" },
      { value: "popular", label: "좋아요가 많은 게시글 순" },
      { value: "comments", label: "댓글 참여가 활발한 순" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "긴 라벨 텍스트가 들어오는 경우를 확인하는 예시입니다.",
      },
    },
  },
};

export const Compact: Story = {
  args: {
    className: "w-fit",
  },
  parameters: {
    docs: {
      description: {
        story: "콘텐츠 길이에 맞춰 최소 너비로 표시하는 예시입니다.",
      },
    },
  },
};

// Backward-compatible alias for existing Storybook URLs/bookmarks.
export const Playground: Story = {
  ...LongLabels,
  parameters: {
    ...LongLabels.parameters,
    docs: {
      ...LongLabels.parameters?.docs,
      description: {
        story: "기존 Storybook 링크 호환을 위한 alias 스토리입니다.",
      },
    },
  },
};
