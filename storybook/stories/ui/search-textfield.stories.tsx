import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { SearchTextfield } from "@/shared/ui";

type SearchTextfieldStoryProps = {
  placeholder: string;
  disabled: boolean;
  defaultText: string;
  showClearButton: boolean;
};

function SearchTextfieldStory({ placeholder, disabled, defaultText, showClearButton }: SearchTextfieldStoryProps) {
  const [value, setValue] = useState(defaultText);

  return (
    <SearchTextfield
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      showClearButton={showClearButton}
    />
  );
}

const meta = {
  title: "UI/Input/SearchTextfield",
  component: SearchTextfieldStory,
  tags: ["autodocs"],
  args: {
    placeholder: "검색어를 입력해 주세요.",
    disabled: false,
    defaultText: "",
    showClearButton: false,
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트를 지정합니다.",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태를 지정합니다.",
    },
    defaultText: {
      control: "text",
      description: "초기 입력 값을 지정합니다.",
    },
    showClearButton: {
      control: "boolean",
      description: "입력값이 있을 때 X 버튼을 표시합니다.",
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
} satisfies Meta<typeof SearchTextfieldStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "검색 입력 필드를 제어형으로 확인하는 예시입니다.",
      },
    },
  },
};

export const WithClearButton: Story = {
  args: {
    defaultText: "아이폰",
    showClearButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: "입력값이 있을 때 X 버튼으로 값을 지울 수 있는 상태입니다.",
      },
    },
  },
};
