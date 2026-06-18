"use client";

import { authenticatedApiClient } from "@/features/auth/api";
import type {
  CommentCreateRequest,
  CommentCreateResponse,
  CommentHelpfulResponse,
  CommentUpdateRequest,
  CommentUpdateResponse,
  CreateBookmarkPath,
  CreateCommentHelpfulPath,
  CreateCommentPath,
  DeleteBookmarkPath,
  DeleteCommentHelpfulPath,
  DeleteCommentPath,
  DeletePostPath,
  PostBookmarkResponse,
  UpdateCommentPath,
} from "@/shared/api/generated";

export async function createBookmarkWithAuth({ postId }: CreateBookmarkPath) {
  return authenticatedApiClient<PostBookmarkResponse>(`/api/posts/${postId}/bookmarks`, {
    method: "POST",
  });
}

export async function deleteBookmarkWithAuth({ postId }: DeleteBookmarkPath) {
  return authenticatedApiClient<PostBookmarkResponse>(`/api/posts/${postId}/bookmarks`, {
    method: "DELETE",
  });
}

export async function deletePostWithAuth({ postId }: DeletePostPath) {
  return authenticatedApiClient<void>(`/api/posts/${postId}`, {
    method: "DELETE",
  });
}

export async function createCommentWithAuth({ postId }: CreateCommentPath, request: CommentCreateRequest) {
  return authenticatedApiClient<CommentCreateResponse>(`/api/posts/${postId}/comments`, {
    method: "POST",
    body: request,
  });
}

export async function updateCommentWithAuth({ postId, commentId }: UpdateCommentPath, request: CommentUpdateRequest) {
  return authenticatedApiClient<CommentUpdateResponse>(`/api/posts/${postId}/comments/${commentId}`, {
    method: "PATCH",
    body: request,
  });
}

export async function deleteCommentWithAuth({ postId, commentId }: DeleteCommentPath) {
  return authenticatedApiClient<void>(`/api/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
  });
}

export async function createCommentHelpfulWithAuth({ postId, commentId }: CreateCommentHelpfulPath) {
  return authenticatedApiClient<CommentHelpfulResponse>(`/api/posts/${postId}/comments/${commentId}/helpful`, {
    method: "POST",
  });
}

export async function deleteCommentHelpfulWithAuth({ postId, commentId }: DeleteCommentHelpfulPath) {
  return authenticatedApiClient<CommentHelpfulResponse>(`/api/posts/${postId}/comments/${commentId}/helpful`, {
    method: "DELETE",
  });
}
