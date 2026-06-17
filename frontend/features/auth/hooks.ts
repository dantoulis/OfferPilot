"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  authKeys,
  getCurrentUser,
  login,
  logout,
  register,
} from "@/features/auth/api"

export const useMeQuery = () =>
  useQuery({
    queryFn: getCurrentUser,
    queryKey: authKeys.me,
    retry: false,
  })

export const useLoginMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(authKeys.me, user)
    },
  })
}

export const useRegisterMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: register,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(authKeys.me, user)
    },
  })
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear()
    },
  })
}
