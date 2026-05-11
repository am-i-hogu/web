import type { Meta, StoryObj } from "@storybook/react";
import { PostImageTile } from "@/shared/ui";

const makeColorTile = (color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="${color}"/></svg>`,
  )}`;

const meta = {
  title: "UI/Input/PostImageTile",
  component: PostImageTile,
  tags: ["autodocs"],
  args: {
    size: 120,
  },
  argTypes: {
    size: {
      control: { type: "number", min: 80, max: 200, step: 4 },
      description: "타일의 가로/세로 크기를 동일하게 지정합니다.",
    },
    imageUrl: {
      control: "text",
      description: "이미지가 있으면 타일 전체를 채워 표시합니다.",
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="bg-bg-01 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PostImageTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddState: Story = {
  parameters: {
    docs: {
      description: {
        story: "이미지가 없는 기본 추가 상태입니다.",
      },
    },
  },
};

export const WithImage: Story = {
  args: {
    imageUrl: makeColorTile("#3b82f6"),
  },
  parameters: {
    docs: {
      description: {
        story: "이미지가 채워진 상태입니다.",
      },
    },
  },
};

export const FilledRepresentative: Story = {
  args: {
    imageUrl: makeColorTile("#ef4444"),
    isRepresentative: true,
  },
  parameters: {
    docs: {
      description: {
        story: "등록 완료된 대표 이미지 상태입니다. 강조 보더/배지/삭제 아이콘을 표시합니다.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "비활성화 상태에서는 클릭/파일 선택이 동작하지 않습니다.",
      },
    },
  },
};
