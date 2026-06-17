import { apiFetch } from "@/lib/api-client"
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/features/auth/types"

export const authKeys = {
  me: ["auth", "me"] as const,
}

export const getCurrentUser = () => apiFetch<User>("/auth/me/")

export const login = (payload: LoginPayload) =>
  apiFetch<AuthResponse>("/auth/login/", {
    body: payload,
    method: "POST",
    retryAuth: false,
  })

export const register = (payload: RegisterPayload) =>
  apiFetch<AuthResponse>("/auth/register/", {
    body: payload,
    method: "POST",
    retryAuth: false,
  })

export const logout = () =>
  apiFetch<null>("/auth/logout/", {
    method: "POST",
    retryAuth: false,
  })
