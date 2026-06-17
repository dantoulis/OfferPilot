"use client"

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000"

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown
  retryAuth?: boolean
}

export class ApiError extends Error {
  status: number
  data: unknown

  constructor(status: number, data: unknown, message: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

const parseResponseBody = async (response: Response) => {
  if (response.status === 204) {
    return null
  }

  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

const extractErrorMessage = (data: unknown, fallback: string) => {
  if (!data) {
    return fallback
  }

  if (typeof data === "string") {
    return data
  }

  if (typeof data === "object") {
    const record = data as Record<string, unknown>
    const detail = record.detail ?? record.non_field_errors

    if (Array.isArray(detail)) {
      return detail.join(" ")
    }

    if (typeof detail === "string") {
      return detail
    }

    const firstFieldError = Object.entries(record).find(([, value]) =>
      Array.isArray(value) ? value.length > 0 : Boolean(value)
    )

    if (firstFieldError) {
      const [field, value] = firstFieldError
      const message = Array.isArray(value) ? value.join(" ") : String(value)
      return `${field}: ${message}`
    }
  }

  return fallback
}

const buildUrl = (path: string) => {
  if (path.startsWith("http")) {
    return path
  }

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    (typeof window === "undefined"
      ? API_BASE_URL
      : `${window.location.protocol}//${window.location.hostname}:8000`)

  return `${apiBaseUrl}${path}`
}

export const apiFetch = async <T>(
  path: string,
  { body, headers, retryAuth = true, ...options }: ApiRequestOptions = {}
): Promise<T> => {
  const response = await fetch(buildUrl(path), {
    ...options,
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: "include",
    headers: {
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
  })

  if (response.status === 401 && retryAuth && path !== "/auth/refresh/") {
    const refreshResponse = await fetch(buildUrl("/auth/refresh/"), {
      method: "POST",
      credentials: "include",
    })

    if (refreshResponse.ok) {
      return apiFetch<T>(path, { body, headers, retryAuth: false, ...options })
    }
  }

  const data = await parseResponseBody(response)

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data,
      extractErrorMessage(data, response.statusText || "Request failed")
    )
  }

  return data as T
}

export const getApiErrorMessage = (error: unknown, fallback = "Something went wrong") => {
  if (error instanceof ApiError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}
