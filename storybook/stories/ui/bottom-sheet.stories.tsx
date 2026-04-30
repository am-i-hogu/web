import type { Meta, StoryObj } from "@storybook/react";

import { POST_FILTER_OPTIONS, PostFilterBottomSheet } from "@/features/post/ui";

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

export const FilterEmpty: Story = {
  render: () => <PostFilterBottomSheet selectedOptions={[]} onToggleOption={() => {}} onSave={() => {}} />,
};

export const FilterSelected: Story = {
  args: {
    selectedOptions: [POST_FILTER_OPTIONS[0]],
  },
  render: (args) => <PostFilterBottomSheet {...args} />,
};
