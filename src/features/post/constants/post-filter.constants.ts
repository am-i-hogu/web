export const POST_CATEGORIES = [
  { label: "중고거래", value: "USED_TRADE" },
  { label: "직장", value: "WORK" },
  { label: "소비", value: "PURCHASE" },
  { label: "연애", value: "DATING" },
  { label: "계약", value: "CONTRACT" },
  { label: "기타", value: "ETC" },
] as const;

export type PostCategoryValue = (typeof POST_CATEGORIES)[number]["value"];
export type PostCategoryLabel = (typeof POST_CATEGORIES)[number]["label"];

export const POST_FILTER_OPTIONS = POST_CATEGORIES.map((category) => category.label) as PostCategoryLabel[];

export const POST_CATEGORY_LABEL_BY_VALUE = Object.fromEntries(
  POST_CATEGORIES.map((category) => [category.value, category.label]),
) as Record<PostCategoryValue, PostCategoryLabel>;

export const POST_CATEGORY_VALUE_BY_LABEL = Object.fromEntries(
  POST_CATEGORIES.map((category) => [category.label, category.value]),
) as Record<PostCategoryLabel, PostCategoryValue>;

export function toPostCategoryLabel(category: PostCategoryValue) {
  return POST_CATEGORY_LABEL_BY_VALUE[category];
}

export const POST_SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "views", label: "조회순" },
  { value: "comments", label: "댓글순" },
  { value: "votes", label: "투표 참여순" },
] as const;
