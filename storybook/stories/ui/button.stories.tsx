import type { Meta, StoryObj } from "@storybook/react";
import KaKaoLogoIcon from "@/assets/icons/kakao-logo.svg";
import PlusIcon from "@/assets/icons/plus.svg";
import { Button } from "@/shared/ui";

const meta = {
  title: "UI/Button/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "버튼",
    variant: "primary",
    size: "default",
    fullWidth: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "disabled", "inactive", "danger", "kakao", "google"],
      description: "버튼 색상/톤을 지정합니다.",
    },
    size: {
      control: { type: "select" },
      options: ["default", "modal", "iconSm", "iconLg"],
      description: "버튼 크기 타입을 지정합니다.",
    },
    fullWidth: {
      control: "boolean",
      description: "버튼을 가로 전체 너비로 확장합니다.",
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "variant, size, fullWidth를 조합해 버튼을 확인합니다.",
      },
    },
  },
};

export const IconOnly: Story = {
  args: {
    size: "iconSm",
    variant: "primary",
    "aria-label": "추가",
    children: <PlusIcon className="size-4 text-current" strokeWidth={24} />,
  },
  parameters: {
    docs: {
      description: {
        story: "아이콘만 포함하는 버튼 예시입니다.",
      },
    },
  },
};

export const FullWidthWithIcon: Story = {
  args: {
    fullWidth: true,
    size: "default",
    variant: "kakao",
    leftIcon: <KaKaoLogoIcon className="size-4 text-current" strokeWidth={24} />,
    children: "카카오 로그인",
  },
  parameters: {
    docs: {
      description: {
        story: "fullWidth 상태에서 아이콘 + 텍스트 조합 버튼 예시입니다.",
      },
    },
  },
};
