"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDomainQueryKeys, unwrapApiResult } from "@/shared/api";
import {
  checkNicknameAction,
  createUserAction,
  deleteUserAction,
  getMyBookmarksAction,
  getMyCommentsAction,
  getMyPostsAction,
  getMyVotesAction,
  updateProfileAction,
} from "./mypage.action";
import { getHoguReportWithAuth, getMyPageWithAuth } from "./mypage.client-service";
import type {
  CheckNicknameQueryParams,
  CreateUserBody,
  GetMyBookmarksQueryParams,
  GetMyCommentsQueryParams,
  GetMyPostsQueryParams,
  GetMyVotesQueryParams,
  UpdateProfileBody,
} from "./mypage.service";

export const mypageQueryKeys = {
  ...createDomainQueryKeys("users"),
  myPage: () => ["users", "me"] as const,
  hoguReport: () => ["users", "me", "report"] as const,
  myBookmarks: (params: GetMyBookmarksQueryParams = {}) => ["users", "me", "bookmarks", params] as const,
  myComments: (params: GetMyCommentsQueryParams = {}) => ["users", "me", "comments", params] as const,
  myPosts: (params: GetMyPostsQueryParams = {}) => ["users", "me", "posts", params] as const,
  myVotes: (params: GetMyVotesQueryParams = {}) => ["users", "me", "votes", params] as const,
};

export function useCheckNicknameQuery(params: CheckNicknameQueryParams) {
  return useQuery({
    queryKey: mypageQueryKeys.list(params),
    queryFn: () => checkNicknameAction(params).then(unwrapApiResult),
  });
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ body }: { body: CreateUserBody }) => createUserAction(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mypageQueryKeys.all });
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteUserAction(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mypageQueryKeys.all });
    },
  });
}

export function useGetHoguReportQuery() {
  return useQuery({
    queryKey: mypageQueryKeys.hoguReport(),
    queryFn: getHoguReportWithAuth,
  });
}

export function useGetMyBookmarksQuery(params: GetMyBookmarksQueryParams = {}) {
  return useQuery({
    queryKey: mypageQueryKeys.myBookmarks(params),
    queryFn: () => getMyBookmarksAction(params).then(unwrapApiResult),
  });
}

export function useGetMyCommentsQuery(params: GetMyCommentsQueryParams = {}) {
  return useQuery({
    queryKey: mypageQueryKeys.myComments(params),
    queryFn: () => getMyCommentsAction(params).then(unwrapApiResult),
  });
}

export function useGetMyPageQuery() {
  return useQuery({
    queryKey: mypageQueryKeys.myPage(),
    queryFn: getMyPageWithAuth,
  });
}

export function useGetMyPostsQuery(params: GetMyPostsQueryParams = {}) {
  return useQuery({
    queryKey: mypageQueryKeys.myPosts(params),
    queryFn: () => getMyPostsAction(params).then(unwrapApiResult),
  });
}

export function useGetMyVotesQuery(params: GetMyVotesQueryParams = {}) {
  return useQuery({
    queryKey: mypageQueryKeys.myVotes(params),
    queryFn: () => getMyVotesAction(params).then(unwrapApiResult),
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ body }: { body: UpdateProfileBody }) => updateProfileAction(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mypageQueryKeys.all });
    },
  });
}
