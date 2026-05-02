export const POST_FILTER_OPTIONS = ["중고거래", "직장", "소비", "연애", "계약", "기타"] as const;

export const POST_SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "views", label: "조회순" },
  { value: "comments", label: "댓글순" },
  { value: "votes", label: "투표 참여순" },
] as const;
