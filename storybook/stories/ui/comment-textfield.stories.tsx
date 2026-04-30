import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { CommentTextfield, type CommentTextfieldState } from "@/shared/ui";

type CommentTextfieldStoryProps = {
  state: CommentTextfieldState;
  isReply: boolean;
  placeholderValue: string;
};

function CommentTextfieldStory({ state, isReply, placeholderValue }: CommentTextfieldStoryProps) {
  const [value, setValue] = useState(placeholderValue);

  return (
    <CommentTextfield
      value={value}
      onChange={(event) => setValue(event.target.value)}
      state={state}
      isReply={isReply}
    />
  );
}

const meta = {
  title: "UI/Input/CommentTextfield",
  component: CommentTextfieldStory,
  tags: ["autodocs"],
  args: {
    state: "default",
    isReply: false,
    placeholderValue: "",
  },
  argTypes: {
    state: {
      control: { type: "select" },
      options: ["default", "typing", "disabled"],
      description: "입력 상태를 지정합니다.",
    },
    isReply: {
      control: "boolean",
      description: "답글 입력 UI 여부를 지정합니다.",
    },
    placeholderValue: {
      control: "text",
      description: "초기 입력 값을 지정합니다.",
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
} satisfies Meta<typeof CommentTextfieldStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "의견 입력 필드를 제어형으로 확인하는 예시입니다.",
      },
    },
  },
};
