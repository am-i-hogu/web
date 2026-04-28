import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/preview-api";

import { Checkbox, type CheckboxProps } from "@/shared/ui";

type CheckboxStoryArgs = CheckboxProps;

const meta = {
  title: "UI/CheckBox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "내용이 들어가는 자리입니다.",
    checked: false,
    disabled: false,
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "선택 상태를 지정합니다.",
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
      <div className="w-[320px] bg-bg-01 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<CheckboxStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const isChecked: Story = {
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();

    return (
      <Checkbox
        {...args}
        checked={Boolean(checked)}
        onCheckedChange={(value) => updateArgs({ checked: value === true })}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "체크 상태를 내부 state로 제어하는 예시입니다.",
      },
    },
  },
};
