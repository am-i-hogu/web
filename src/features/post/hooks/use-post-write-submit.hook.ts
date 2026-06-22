"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadPostImageWithAuth, useCreatePostMutation, useUpdatePostMutation } from "@/features/post/api";
import {
  createPostCreateRequest,
  createPostUpdateRequest,
  type PostFormInitialValues,
  type PostWriteImageItem,
  type PostWriteSchemaType,
} from "@/features/post/model";
import { isApiError, toApiError } from "@/shared/api";
import { useToastStore } from "@/shared/model";

type UsePostWriteSubmitParams = {
  mode: "create" | "edit";
  postId?: string | number;
  isFormValid: boolean;
  isFormChanged: boolean;
  initialValues?: PostFormInitialValues;
  values: Pick<PostWriteSchemaType, "content" | "selectedCategories" | "title"> & {
    images: PostWriteImageItem[];
  };
};

export function usePostWriteSubmit({
  mode,
  postId,
  isFormValid,
  isFormChanged,
  initialValues,
  values,
}: UsePostWriteSubmitParams) {
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);
  const createPostMutation = useCreatePostMutation();
  const updatePostMutation = useUpdatePostMutation(postId);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const isSubmitting = isUploadingImages || createPostMutation.isPending || updatePostMutation.isPending;

  const handleAuthRequiredError = (error: unknown) => {
    if (isApiError(error) && error.status === 401) {
      router.replace("/login?errorCode=AUTH_REQUIRED");
      return true;
    }

    return false;
  };

  const handleSubmit = async () => {
    if (!isFormValid || isSubmitting || (mode === "edit" && !isFormChanged)) {
      return;
    }

    setSubmitErrorMessage(null);
    setIsUploadingImages(true);

    try {
      if (mode === "edit" && !postId) {
        throw new Error("수정할 게시글 정보를 찾을 수 없습니다.");
      }

      // 게시글 API는 imageUrl 목록만 받기 때문에, 신규 파일은 저장 요청 전에 이미지 서버에 먼저 업로드한다.
      const uploadedImages = await Promise.all(
        values.images.map(async (image) => {
          if (!image.file) {
            return image;
          }

          const response = await uploadPostImageWithAuth(image.file);
          return {
            ...image,
            imageUrl: response.imageUrl,
            file: undefined,
          };
        }),
      );
      const requestValues = {
        ...values,
        images: uploadedImages,
      };

      if (mode === "edit") {
        const response = await updatePostMutation.mutateAsync(createPostUpdateRequest(requestValues, initialValues));
        showToast({ message: "게시글이 수정되었습니다." });
        router.replace(`/post/${response.postId}`);
        return;
      }

      const response = await createPostMutation.mutateAsync(createPostCreateRequest(requestValues));
      showToast({ message: "게시글이 등록되었습니다." });
      router.replace(`/post/${response.postId}`);
    } catch (error) {
      if (handleAuthRequiredError(error)) {
        return;
      }

      setSubmitErrorMessage(toApiError(error).message);
    } finally {
      setIsUploadingImages(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    submitErrorMessage,
  };
}
