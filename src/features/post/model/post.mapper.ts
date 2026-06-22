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
  images: string[];
};

export type PostWriteImageItem = {
  id: string;
  imageUrl?: string;
  file?: File;
  isThumbnail: boolean;
};

type PostFormInitialValuesSource = Pick<PostDetailResponse, "content" | "images" | "title"> & {
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
    images: post.images ?? [],
  };
}
