import type { PostCategoryValue } from "@/features/post/constants";

export type MockPost = {
  id: number;
  category: PostCategoryValue;
  createdAt: string;
  title: string;
  description: string;
  author: string;
  comments: number;
  votes: number;
  isBookmarked: boolean;
  images: string[];
  viewCount: number;
};

export const HOME_POSTS_MOCK: MockPost[] = [
  {
    id: 1,
    category: "USED_TRADE",
    createdAt: "2026-05-03T10:00:00.000Z",
    title: "아이폰 17 프로 중고로 120만원에 샀는데... 이거 호구인가요?",
    description:
      "이번에 아이폰 17 pro 512GB 모델을 중고거래로 120만원에 구입했습니다. 상태는 거의 새거 라고 하긴 하는데, 사고 나니까 주변에서 너무 비싸게 샀다고 난리네요.",
    author: "김호구",
    comments: 14,
    votes: 911111,
    isBookmarked: true,
    images: ["from-indigo-50 via-emerald-50 to-sky-100", "from-amber-50 via-rose-50 to-orange-100"],
    viewCount: 121113,
  },
  {
    id: 2,
    category: "WORK",
    createdAt: "2026-05-02T12:00:00.000Z",
    title: "우녹스 노랭이 20만원 어떤가요?",
    description:
      "회사 주변 카페가 폐업하는데, 구형이지만 집에 오븐이 필요했던지라 냅다 예약부터 하고왔는데 괜찮을까요? 10여년전 모델이라 걱정이네요...",
    author: "감간판",
    comments: 21,
    votes: 17,
    isBookmarked: false,
    images: ["from-cyan-50 via-blue-50 to-indigo-100", "from-emerald-50 via-lime-50 to-green-100"],
    viewCount: 123,
  },
  {
    id: 3,
    category: "PURCHASE",
    createdAt: "2026-05-01T12:00:00.000Z",
    title: "ek43 130 어떤가요?",
    description:
      "안녕하세요, 요새 커피에 미쳐사는 직장인1 인사올려봅니다!\n\n 원래 커피는 그냥 카페인 수혈용이었는데 일하다 보니 커피가 거의 생명수 수준이 되어버려서… 어느 순간 브루잉 장비 하나둘 사다 보니까 집에 홈카페가 차려졌네요;;\n\n드리퍼, 서버, 필터 이런 건 얼추 맞췄는데  뭔가 계속 맛이 애매하게 부족한 느낌이 있어서  결국 그라인더까지 눈이 가는 상황입니다…\n\n 최근 출시된 옴니아(?) 영향인지 매물이 꽤 많이 올라오던데 집 주변 당X에 올라온게 130 정도거든요. 이 가격이면 괜찮은 편인가요?\n 상태는 사진상으로는 나쁘지 않아 보이긴 하는데  중고 특성상 내부 상태나 칼날 마모 이런 건 감이 안 오기도 하고... 생각보다 작은게 아니라서 소음 관련해서도 고민이네요.\n\n 좀 조언 부탁드립니다!",
    author: "김코히",
    comments: 8,
    votes: 5,
    isBookmarked: true,
    images: ["from-violet-50 via-fuchsia-50 to-pink-100", "from-slate-100 via-zinc-100 to-neutral-200"],
    viewCount: 123,
  },
];
