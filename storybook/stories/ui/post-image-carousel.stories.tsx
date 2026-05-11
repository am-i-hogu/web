import type { Meta, StoryObj } from "@storybook/react";
import { PostImageCarousel, PostImageTile } from "@/shared/ui";

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
    children: null,
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
  render: (args) => (
    <PostImageCarousel {...args}>
      <PostImageTile aria-label="이미지 추가 1" />
      <PostImageTile aria-label="이미지 추가 2" />
      <PostImageTile aria-label="이미지 추가 3" />
      <PostImageTile aria-label="이미지 추가 4" />
    </PostImageCarousel>
  ),
  parameters: {
    docs: {
      description: {
        story: "추가 가능한 이미지 타일로 구성된 기본 캐러셀 상태입니다.",
      },
    },
  },
};

export const MixedItems: Story = {
  render: (args) => (
    <PostImageCarousel {...args}>
      <PostImageTile key="tile-red" imageUrl={makeColorTile("#ef4444")} aria-label="업로드된 이미지 1" />
      <PostImageTile key="tile-blue" imageUrl={makeColorTile("#3b82f6")} aria-label="업로드된 이미지 2" />
      <PostImageTile aria-label="이미지 추가 3" />
      <PostImageTile aria-label="이미지 추가 4" />
      <PostImageTile aria-label="이미지 추가 5" />
    </PostImageCarousel>
  ),
  parameters: {
    docs: {
      description: {
        story: "업로드된 이미지와 추가 타일이 함께 있는 상태입니다.",
      },
    },
  },
};
