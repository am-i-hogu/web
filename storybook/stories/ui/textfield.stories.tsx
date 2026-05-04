import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Textfield, type TextfieldTone } from "@/shared/ui";

type TextfieldStoryProps = {
  title: string;
  placeholder: string;
  helperText: string;
  tone: TextfieldTone;
  disabled: boolean;
  multiline: boolean;
  required: boolean;
  maxLength?: number;
  showCount: boolean;
  showClearButton: boolean;
  initialValue: string;
};

function TextfieldStory({
  title,
  placeholder,
  helperText,
  tone,
  disabled,
  multiline,
  required,
  maxLength,
  showCount,
  showClearButton,
  initialValue,
}: TextfieldStoryProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <Textfield
      title={title}
      placeholder={placeholder}
      helperText={helperText}
      tone={tone}
      disabled={disabled}
      multiline={multiline}
      required={required}
      maxLength={maxLength}
      showCount={showCount}
      showClearButton={showClearButton}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}

const meta = {
  title: "UI/Input/Textfield",
  component: TextfieldStory,
  tags: ["autodocs"],
  args: {
    title: "제목",
    placeholder: "텍스트를 입력해 주세요.",
    helperText: "입력 가이드가 들어갑니다.",
    tone: "default",
    disabled: false,
    multiline: false,
    required: false,
    maxLength: 100,
    showCount: true,
    showClearButton: false,
    initialValue: "",
  },
  argTypes: {
    tone: {
      control: { type: "select" },
      options: ["default", "success", "warning", "danger"],
      description: "헬퍼 텍스트 톤을 지정합니다.",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태를 지정합니다.",
    },
    multiline: {
      control: "boolean",
      description: "textarea 모드를 활성화합니다.",
    },
    required: {
      control: "boolean",
      description: "필수 입력 여부를 표시합니다.",
    },
    showCount: {
      control: "boolean",
      description: "입력 글자 수를 표시합니다.",
    },
    showClearButton: {
      control: "boolean",
      description: "입력값이 있을 때 X 버튼을 표시합니다.",
    },
    maxLength: {
      control: { type: "number", min: 1, step: 1 },
      description: "최대 글자 수를 지정합니다.",
    },
    initialValue: {
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
} satisfies Meta<typeof TextfieldStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleLine: Story = {
  args: {
    multiline: false,
    showCount: true,
  },
  parameters: {
    docs: {
      description: {
        story: "단일 입력 필드 예시입니다.",
      },
    },
  },
};

export const MultiLine: Story = {
  args: {
    multiline: true,
    title: "본문",
    placeholder: "내용을 자세히 입력해 주세요.",
    initialValue: "",
    maxLength: 300,
    showCount: true,
  },
  parameters: {
    docs: {
      description: {
        story: "여러 줄 입력 필드 예시입니다.",
      },
    },
  },
};

export const DangerTone: Story = {
  args: {
    tone: "danger",
    helperText: "허용 글자 수를 초과했습니다.",
    initialValue: "제한을 넘긴 입력값 예시",
  },
  parameters: {
    docs: {
      description: {
        story: "오류 상태 헬퍼 텍스트 예시입니다.",
      },
    },
  },
};

export const WithClearButton: Story = {
  args: {
    multiline: false,
    showClearButton: true,
    initialValue: "지워볼 텍스트",
  },
  parameters: {
    docs: {
      description: {
        story: "입력값이 있을 때 X 버튼으로 값을 지울 수 있는 상태입니다.",
      },
    },
  },
};
