import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { POST_FILTER_OPTIONS, PostFilterBottomSheet, type PostFilterOption } from "@/features/post/ui";

const meta = {
  title: "UI/BottomSheet",
  component: PostFilterBottomSheet,
  tags: ["autodocs"],
  args: {
    selectedOptions: [],
    onToggleOption: () => {},
    onSave: () => {},
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[700px] items-end justify-center bg-bg-02 p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PostFilterBottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

type InteractiveBottomSheetProps = {
  initialSelectedOptions: PostFilterOption[];
};

function InteractiveBottomSheet({ initialSelectedOptions }: InteractiveBottomSheetProps) {
  const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions);

  const handleToggleOption = (option: PostFilterOption) => {
    setSelectedOptions((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
  };

  return (
    <PostFilterBottomSheet
      selectedOptions={selectedOptions}
      onToggleOption={handleToggleOption}
      onSave={() => {}}
      onClose={() => setSelectedOptions([])}
    />
  );
}

export const FilterEmpty: Story = {
  render: () => <InteractiveBottomSheet initialSelectedOptions={[]} />,
};

export const FilterSelected: Story = {
  args: {
    selectedOptions: [POST_FILTER_OPTIONS[0]],
  },
  render: () => <InteractiveBottomSheet initialSelectedOptions={[POST_FILTER_OPTIONS[0]]} />,
};
