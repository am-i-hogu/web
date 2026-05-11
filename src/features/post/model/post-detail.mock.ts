export const HOGU_VOTE_IDS = ["HOGU", "NOT_HOGU"] as const;
export type HoguVoteId = (typeof HOGU_VOTE_IDS)[number];

export const DETAIL_VOTE_MOCK = {
  totalVotes: 100,
  yesVotes: 70,
  noVotes: 30,
  myVote: "HOGU" as HoguVoteId,
} as const;

export function createDetailVoteOptions() {
  return [
    {
      id: "HOGU" as const,
      label: "호구 맞다",
      emoji: "😢",
      percent: Math.round((DETAIL_VOTE_MOCK.yesVotes / DETAIL_VOTE_MOCK.totalVotes) * 100),
    },
    {
      id: "NOT_HOGU" as const,
      label: "아니다",
      emoji: "🤔",
      percent: Math.round((DETAIL_VOTE_MOCK.noVotes / DETAIL_VOTE_MOCK.totalVotes) * 100),
    },
  ];
}

export const DETAIL_COMMENTS_MOCK = {
  comments: [
    {
      commentId: 1234,
      content: "진짜 대박 호구시네요... 당장 환불하세요. 지금 쿠X에서도 새제품 110만원대면 삽니다.",
      isMine: false,
      writer: {
        nickname: "팩트폭격기",
        profileImageUrl: "https://~~~",
        isPostWriter: false,
      },
      createdAt: "2026-05-03T12:10:00.000Z",
      updatedAt: "2026-05-03T12:10:00.000Z",
      isDeleted: false,
      isHelpful: true,
      totalHelpfulCount: 12,
      parentId: null,
      depth: 1,
    },
    {
      commentId: 1235,
      content:
        "헉 그런가요 ㅠㅠㅠ!!!! 이미 사버렸는데... 어떡하면 좋을까요 ㅠㅠ 저 엄마가 알면 큰일난단 말이에요 ㅠㅠㅠㅠㅠㅠ",
      isMine: true,
      writer: {
        nickname: "김호구",
        profileImageUrl: "https://~~~",
        isPostWriter: true,
      },
      createdAt: "2026-05-03T13:07:00.000Z",
      updatedAt: "2026-05-03T13:07:00.000Z",
      isDeleted: false,
      isHelpful: true,
      totalHelpfulCount: 1,
      parentId: 1234,
      depth: 2,
    },
  ],
  hasNext: false,
  nextCursor: "SDLE1J3787",
};
