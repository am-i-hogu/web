import { POST_CATEGORY_VALUE_BY_LABEL } from "@/features/post/constants/post-filter.constants";
import type { PostCreateRequest, PostUpdateRequest } from "@/shared/api/generated";
import type { PostWriteSchemaType } from "./post-write.schema";

type PostWriteFormValues = Pick<PostWriteSchemaType, "content" | "selectedCategories" | "title">;

function normalizePostWriteValues(values: PostWriteFormValues): PostWriteFormValues {
  return {
    title: values.title.trim(),
    selectedCategories: values.selectedCategories,
    content: values.content.trim(),
  };
}

function areSameCategories(
  left: PostWriteFormValues["selectedCategories"],
  right: PostWriteFormValues["selectedCategories"],
) {
  return left.length === right.length && left.every((category, index) => category === right[index]);
}

export function createPostCreateRequest(values: PostWriteFormValues): PostCreateRequest {
  return {
    title: values.title.trim(),
    categories: values.selectedCategories.map((category) => POST_CATEGORY_VALUE_BY_LABEL[category]),
    content: values.content.trim(),
    // TODO: 이미지 업로드 연동 시 PostImageRequest[]로 교체한다.
    images: [],
  };
}

export function hasPostWriteFormChanged(values: PostWriteFormValues, initialValues?: PostWriteFormValues) {
  if (!initialValues) {
    return true;
  }

  const normalizedValues = normalizePostWriteValues(values);
  const normalizedInitialValues = normalizePostWriteValues(initialValues);

  return (
    normalizedValues.title !== normalizedInitialValues.title ||
    normalizedValues.content !== normalizedInitialValues.content ||
    !areSameCategories(normalizedValues.selectedCategories, normalizedInitialValues.selectedCategories)
  );
}

export function createPostUpdateRequest(
  values: PostWriteFormValues,
  initialValues?: PostWriteFormValues,
): PostUpdateRequest {
  const request: PostUpdateRequest = {};
  const normalizedValues = normalizePostWriteValues(values);
  const normalizedInitialValues = initialValues ? normalizePostWriteValues(initialValues) : null;

  // PATCH 요청은 수정된 필드만 담아 불필요한 서버 갱신과 충돌 범위를 줄인다.
  if (!normalizedInitialValues || normalizedValues.title !== normalizedInitialValues.title) {
    request.title = normalizedValues.title;
  }

  if (
    !normalizedInitialValues ||
    !areSameCategories(normalizedValues.selectedCategories, normalizedInitialValues.selectedCategories)
  ) {
    request.categories = normalizedValues.selectedCategories.map((category) => POST_CATEGORY_VALUE_BY_LABEL[category]);
  }

  if (!normalizedInitialValues || normalizedValues.content !== normalizedInitialValues.content) {
    request.content = normalizedValues.content;
  }

  // TODO: 이미지 변경 연동 시 기존 이미지와 신규 이미지를 함께 반영한다.
  return request;
}
