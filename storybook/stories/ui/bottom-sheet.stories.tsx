import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { POST_FILTER_OPTIONS, PostFilterBottomSheet, type PostFilterOption } from "@/features/post/ui";

type BottomSheetStoryArgs = {
  selected?: boolean;
};

const meta = {
  title: "UI/BottomSheet",
  args: {
    selected: false,
  },
  argTypes: {
    selected: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[700px] items-end justify-center bg-bg-02 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<BottomSheetStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FilterEmpty: Story = {
  render: () => <PostFilterBottomSheet selectedOptions={[]} onToggleOption={() => {}} onSave={() => {}} />,
};

export const FilterSelected: Story = {
  args: {
    selected: true,
  },
  render: ({ selected }) => {
    const [selectedOptions, setSelectedOptions] = useState<PostFilterOption[]>(
      selected ? [POST_FILTER_OPTIONS[0]] : [],
    );

    useEffect(() => {
      setSelectedOptions(selected ? [POST_FILTER_OPTIONS[0]] : []);
    }, [selected]);

    const handleToggleOption = (option: PostFilterOption) => {
      setSelectedOptions((prev) =>
        prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
      );
    };

    return (
      <PostFilterBottomSheet selectedOptions={selectedOptions} onToggleOption={handleToggleOption} onSave={() => {}} />
    );
  },
};
