"use client";

import { authenticatedApiClient } from "@/features/auth/api";
import type {
  GetHoguReportResponse,
  GetMyBookmarksQueryParams,
  GetMyBookmarksResponse,
  GetMyCommentsQueryParams,
  GetMyCommentsResponse,
  GetMyPageResponse,
  GetMyPostsQueryParams,
  GetMyPostsResponse,
  GetMyVotesQueryParams,
  GetMyVotesResponse,
} from "./mypage.service";

export async function getMyPageWithAuth() {
  return authenticatedApiClient<GetMyPageResponse>("/api/users/me", {
    method: "GET",
  });
}

export async function getHoguReportWithAuth() {
  return authenticatedApiClient<GetHoguReportResponse>("/api/users/me/report", {
    method: "GET",
  });
}

export async function getMyBookmarksWithAuth(params: GetMyBookmarksQueryParams = {}) {
  return authenticatedApiClient<GetMyBookmarksResponse>("/api/users/me/bookmarks", {
    method: "GET",
    query: params,
  });
}

export async function getMyCommentsWithAuth(params: GetMyCommentsQueryParams = {}) {
  return authenticatedApiClient<GetMyCommentsResponse>("/api/users/me/comments", {
    method: "GET",
    query: params,
  });
}

export async function getMyPostsWithAuth(params: GetMyPostsQueryParams = {}) {
  return authenticatedApiClient<GetMyPostsResponse>("/api/users/me/posts", {
    method: "GET",
    query: params,
  });
}

export async function getMyVotesWithAuth(params: GetMyVotesQueryParams = {}) {
  return authenticatedApiClient<GetMyVotesResponse>("/api/users/me/votes", {
    method: "GET",
    query: params,
  });
}
