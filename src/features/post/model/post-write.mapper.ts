import { POST_CATEGORY_VALUE_BY_LABEL } from "@/features/post/constants/post-filter.constants";
import type { PostCreateRequest, PostUpdateRequest } from "@/shared/api/generated";
import type { PostWriteSchemaType } from "./post-write.schema";

type PostWriteFormValues = Pick<PostWriteSchemaType, "content" | "selectedCategories" | "title">;

export function createPostCreateRequest(values: PostWriteFormValues): PostCreateRequest {
  return {
    title: values.title.trim(),
    categories: values.selectedCategories.map((category) => POST_CATEGORY_VALUE_BY_LABEL[category]),
    content: values.content.trim(),
    // TODO: 이미지 업로드 연동 시 PostImageRequest[]로 교체한다.
    images: [],
  };
}

export function createPostUpdateRequest(values: PostWriteFormValues): PostUpdateRequest {
  return {
    title: values.title.trim(),
    categories: values.selectedCategories.map((category) => POST_CATEGORY_VALUE_BY_LABEL[category]),
    content: values.content.trim(),
    // TODO: 이미지 변경 연동 시 기존 이미지와 신규 이미지를 함께 반영한다.
  };
}
