"use client";

import { authenticatedApiClient } from "@/features/auth/api";
import type { DeleteBookmarkPath, PostBookmarkResponse } from "@/shared/api/generated";

export async function deleteBookmarkWithAuth({ postId }: DeleteBookmarkPath) {
  return authenticatedApiClient<PostBookmarkResponse>(`/api/posts/${postId}/bookmarks`, {
    method: "DELETE",
  });
}
