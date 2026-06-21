"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreatePostMutation, useUpdatePostMutation } from "@/features/post/api";
import {
  createPostCreateRequest,
  createPostUpdateRequest,
  type PostFormInitialValues,
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
  values: Pick<PostWriteSchemaType, "content" | "selectedCategories" | "title">;
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
  const isSubmitting = createPostMutation.isPending || updatePostMutation.isPending;

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

    try {
      if (mode === "edit") {
        if (!postId) {
          throw new Error("수정할 게시글 정보를 찾을 수 없습니다.");
        }

        const response = await updatePostMutation.mutateAsync(createPostUpdateRequest(values, initialValues));
        showToast({ message: "게시글이 수정되었습니다." });
        router.replace(`/post/${response.postId}`);
        return;
      }

      const response = await createPostMutation.mutateAsync(createPostCreateRequest(values));
      showToast({ message: "게시글이 등록되었습니다." });
      router.replace(`/post/${response.postId}`);
    } catch (error) {
      if (handleAuthRequiredError(error)) {
        return;
      }

      setSubmitErrorMessage(toApiError(error).message);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    submitErrorMessage,
  };
}
