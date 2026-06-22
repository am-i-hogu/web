import {
  POST_CATEGORY_VALUES,
  type PostCategoryLabel,
  type PostCategoryValue,
  toPostCategoryLabel,
} from "@/features/post/constants";
import type { HomePostItemResponse, PostDetailResponse } from "@/shared/api/generated";

export type PostFormInitialValues = {
  title: string;
  content: string;
  selectedCategories: PostCategoryLabel[];
};

// TODO: 수정 페이지의 기존 이미지 목록 API 연동시, PostFormInitialValues에 추가해주기
type PostFormInitialValuesSource = Pick<PostDetailResponse, "content" | "title"> & {
  categories: string[];
};

export function isPostCategoryValue(value: string): value is PostCategoryValue {
  return POST_CATEGORY_VALUES.includes(value as PostCategoryValue);
}

export function getPrimaryPostCategoryValue(post: Pick<HomePostItemResponse, "categories">): PostCategoryValue {
  return post.categories.find(isPostCategoryValue) ?? "ETC";
}

export function getPrimaryPostCategoryLabel(post: Pick<HomePostItemResponse, "categories">): PostCategoryLabel {
  return toPostCategoryLabel(getPrimaryPostCategoryValue(post));
}

export function createPostFormInitialValues(post: PostFormInitialValuesSource): PostFormInitialValues {
  return {
    title: post.title,
    content: post.content,
    selectedCategories: post.categories.filter(isPostCategoryValue).map(toPostCategoryLabel),
  };
}
