import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { FilterSortBar } from "@/shared/ui";

const FILTER_OPTIONS = ["중고거래", "직장", "소비", "연애", "계약", "기타"] as const;
const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "views", label: "조회순" },
  { value: "comments", label: "댓글순" },
] as const;

type FilterSortBarStoryProps = {
  defaultSelectedOptions: string[];
  defaultSort: (typeof SORT_OPTIONS)[number]["value"];
  totalCount: number;
};

function FilterSortBarStory(props: FilterSortBarStoryProps) {
  const { defaultSelectedOptions, defaultSort, totalCount } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultSelectedOptions);
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]["value"]>(defaultSort);

  const handleToggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((value) => value !== option) : [...prev, option],
    );
  };

  return (
    <FilterSortBar
      options={FILTER_OPTIONS}
      selectedOptions={selectedOptions}
      onToggleOption={handleToggleOption}
      onResetOptions={() => setSelectedOptions([])}
      sortValue={sort}
      sortOptions={SORT_OPTIONS}
      onSortChange={(nextSort) => setSort(nextSort)}
      totalCount={selectedOptions.length > 0 ? totalCount : FILTER_OPTIONS.length}
      allLabel="전체"
    />
  );
}

const meta = {
  title: "UI/Input/FilterSortBar",
  component: FilterSortBarStory,
  tags: ["autodocs"],
  args: {
    defaultSelectedOptions: [],
    defaultSort: "latest",
    totalCount: 32,
  },
  argTypes: {
    defaultSelectedOptions: {
      control: { type: "check" },
      options: FILTER_OPTIONS,
      description: "초기 선택 카테고리를 지정합니다.",
    },
    defaultSort: {
      control: { type: "select" },
      options: SORT_OPTIONS.map((option) => option.value),
      description: "초기 정렬 값을 지정합니다.",
    },
    totalCount: {
      control: { type: "number", min: 0, step: 1 },
      description: "선택 상태에서 표시할 총 개수입니다.",
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[375px] bg-bg-01 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterSortBarStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "기본 필터/정렬 바 상태입니다.",
      },
    },
  },
};

export const WithSelectedOptions: Story = {
  args: {
    defaultSelectedOptions: ["중고거래", "직장", "연애"],
    totalCount: 48,
  },
  parameters: {
    docs: {
      description: {
        story: "카테고리 선택 및 +N 표시가 포함된 상태입니다.",
      },
    },
  },
};
