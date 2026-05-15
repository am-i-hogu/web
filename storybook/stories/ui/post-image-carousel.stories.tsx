import type { Meta, StoryObj } from "@storybook/react";
import { PostImageCarousel } from "@/shared/ui";

const makeColorTile = (color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="${color}"/></svg>`,
  )}`;

const meta = {
  title: "UI/Input/PostImageCarousel",
  component: PostImageCarousel,
  tags: ["autodocs"],
  args: {
    title: "게시물 이미지",
    description: "추천 비율 - 4:3 / 최대 5장, 5MB이하",
    items: [],
  },
  argTypes: {
    title: {
      control: "text",
      description: "섹션 타이틀 텍스트입니다.",
    },
    description: {
      control: "text",
      description: "타이틀 하단 안내 문구입니다.",
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[375px] bg-bg-01 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PostImageCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: "tile-1", "aria-label": "이미지 추가 1" },
      { id: "tile-2", "aria-label": "이미지 추가 2" },
      { id: "tile-3", "aria-label": "이미지 추가 3" },
      { id: "tile-4", "aria-label": "이미지 추가 4" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "추가 가능한 이미지 타일로 구성된 기본 캐러셀 상태입니다.",
      },
    },
  },
};

export const MixedItems: Story = {
  args: {
    items: [
      { id: "tile-red", imageUrl: makeColorTile("#ef4444"), "aria-label": "업로드된 이미지 1" },
      { id: "tile-blue", imageUrl: makeColorTile("#3b82f6"), isThumbnail: true, "aria-label": "업로드된 이미지 2" },
      { id: "tile-green", imageUrl: makeColorTile("#22c55e"), "aria-label": "업로드된 이미지 3" },
      { id: "tile-4", "aria-label": "이미지 추가 4" },
      { id: "tile-5", "aria-label": "이미지 추가 5" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "업로드된 이미지와 추가 타일이 함께 있는 상태입니다. 이미지 클릭 시 대표 이미지가 변경됩니다.",
      },
    },
  },
};
