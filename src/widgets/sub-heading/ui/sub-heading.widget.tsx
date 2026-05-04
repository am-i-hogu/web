"use client";

import { useMemo, useState } from "react";
import { POST_FILTER_OPTIONS, POST_SORT_OPTIONS } from "@/features/post/constants/post-filter.constants";
import { FilterSortBar } from "@/shared/ui";

type PostFilterOption = (typeof POST_FILTER_OPTIONS)[number];
type PostSortValue = (typeof POST_SORT_OPTIONS)[number]["value"];

export type SubHeadingWidgetProps = {
  defaultSelectedOptions?: PostFilterOption[];
  defaultSort?: PostSortValue;
  className?: string;
};

export function SubHeadingWidget({
  defaultSelectedOptions = [],
  defaultSort = "latest",
  className,
}: SubHeadingWidgetProps) {
  const [selectedOptions, setSelectedOptions] = useState<PostFilterOption[]>(defaultSelectedOptions);
  const [sort, setSort] = useState<PostSortValue>(defaultSort);

  const totalCount = useMemo(() => {
    if (selectedOptions.length === 0) {
      return POST_FILTER_OPTIONS.length;
    }

    return selectedOptions.length * 16;
  }, [selectedOptions]);

  const handleToggleOption = (option: PostFilterOption) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((value) => value !== option);
      }

      return [...prev, option];
    });
  };

  return (
    <FilterSortBar
      className={className}
      selectedOptions={selectedOptions}
      onToggleOption={(option) => handleToggleOption(option as PostFilterOption)}
      onResetOptions={() => setSelectedOptions([])}
      options={POST_FILTER_OPTIONS}
      sortValue={sort}
      sortOptions={POST_SORT_OPTIONS}
      onSortChange={(nextSort) => setSort(nextSort as PostSortValue)}
      totalCount={totalCount}
      allLabel="전체"
    />
  );
}
