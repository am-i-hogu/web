import type { Meta, StoryObj } from "@storybook/react";
import { ContentCard, ContentCardBody, ContentCardCarousel, ContentCardFooter, ContentCardHeader } from "@/shared/ui";

const cardData = [
  {
    author: "감자도리",
    title: "식사 자리 계산, 제가 너무 예민한가요?",
    description: "친구가 항상 늦게 와서 제가 먼저 계산하게 되는 상황인데, 제가 예민한 건지 궁금해요.",
    votes: 210,
    comments: 19,
  },
  {
    author: "치즈냥",
    title: "단톡방에서 제 얘기만 빼고 진행됐어요",
    description: "모임 계획이 이미 다 정해진 뒤에 통보를 받았는데 기분이 좀 상했어요.",
    votes: 482,
    comments: 58,
  },
  {
    author: "버터누나",
    title: "주말 약속 취소, 누가 더 배려했어야 할까요?",
    description: "갑작스런 일정 변경으로 약속이 취소됐는데 서로 서운함이 남아있어요.",
    votes: 331,
    comments: 42,
  },
];

const meta = {
  title: "UI/Card/ContentCardCarousel",
  component: ContentCardCarousel,
  tags: ["autodocs"],
  args: {
    showPagination: true,
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
} satisfies Meta<typeof ContentCardCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: (args) => (
    <ContentCardCarousel {...args}>
      {cardData.map((card) => (
        <li key={card.title}>
          <ContentCard>
            <ContentCardHeader
              authorName={card.author}
              category="투표중"
              meta="방금 전"
              viewCount={Math.round(card.votes * 4.2)}
            />
            <ContentCardBody title={card.title} description={card.description} />
            <ContentCardFooter votes={card.votes} comments={card.comments} />
          </ContentCard>
        </li>
      ))}
    </ContentCardCarousel>
  ),
};

export const SingleItem: Story = {
  args: {
    children: null,
    showPagination: true,
  },
  render: (args) => (
    <ContentCardCarousel {...args}>
      <li>
        <ContentCard>
          <ContentCardHeader authorName="단일카드" category="투표중" meta="방금 전" viewCount={31} />
          <ContentCardBody
            title="단일 아이템 상태"
            description="아이템이 하나일 때 페이지네이션이 노출되지 않아야 합니다."
          />
          <ContentCardFooter votes={12} comments={3} />
        </ContentCard>
      </li>
    </ContentCardCarousel>
  ),
};
