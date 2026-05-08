import type { Meta, StoryObj } from "@storybook/react";
import { ContentCard, ContentCardBody, ContentCardFooter, ContentCardHeader } from "@/shared/ui";

const previewImage = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="327" height="184"><rect width="327" height="184" fill="#e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#64748b" font-size="16">Preview Image</text></svg>`,
)}`;

const meta = {
  title: "UI/Card/ContentCard",
  component: ContentCard,
  tags: ["autodocs"],
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
} satisfies Meta<typeof ContentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContentCard>
      <ContentCardHeader authorName="감자도리" category="투표중" meta="5분 전" viewCount={1203} isBookmarked={false} />
      <ContentCardBody
        title="이 상황이면 제가 먼저 사과하는 게 맞을까요?"
        description="친구랑 약속 시간 문제로 다퉜는데 제가 너무 예민했던 것 같기도 해요. 여러분 의견이 궁금합니다."
        image={<img src={previewImage} alt="게시물 미리보기" className="h-auto w-full object-cover" />}
      />
      <ContentCardFooter votes={284} comments={37} />
    </ContentCard>
  ),
};

export const Bookmarked: Story = {
  render: () => (
    <ContentCard>
      <ContentCardHeader authorName="버터누나" category="판결완료" meta="어제" viewCount={9840} isBookmarked />
      <ContentCardBody
        title="결국 제가 잘못한 걸로 결론 났습니다"
        description="댓글로 의견 주신 분들 덕분에 정리하고 사과까지 했어요. 비슷한 상황이면 꼭 먼저 대화해보세요."
      />
      <ContentCardFooter votes={1032} comments={128} />
    </ContentCard>
  ),
};

export const AnonymousAuthor: Story = {
  render: () => (
    <ContentCard>
      <ContentCardHeader category="투표중" meta="방금 전" viewCount={0} />
      <ContentCardBody
        title="작성자 정보 없이도 카드가 안정적으로 렌더링되는지 확인"
        description="프로필 이미지/이름이 없는 엣지 케이스를 검증하는 스토리입니다."
      />
      <ContentCardFooter votes={0} comments={0} />
    </ContentCard>
  ),
};
