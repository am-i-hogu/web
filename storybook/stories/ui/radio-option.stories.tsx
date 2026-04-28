import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { RadioOption } from "@/shared/ui";

const options = ["중고거래", "직장", "소비", "연애"] as const;

const meta = {
  title: "UI/RadioGroupCard",
  component: RadioOption,
  tags: ["autodocs"],
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
} satisfies Meta<typeof RadioOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    checked: true,
    label: "메시지 내용이 들어갑니다.",
  },
  parameters: {
    docs: {
      description: {
        story: "단일 RadioOption 렌더링 예시입니다.",
      },
    },
  },
};

export const Group: Story = {
  args: {
    checked: false,
    label: "옵션",
  },
  render: () => {
    const [selected, setSelected] = useState<(typeof options)[number]>(options[0]);

    return (
      <div className="grid gap-3">
        {options.map((option) => (
          <RadioOption key={option} checked={selected === option} label={option} onClick={() => setSelected(option)} />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "여러 RadioOption을 조합한 그룹 예시입니다.",
      },
    },
  },
};
