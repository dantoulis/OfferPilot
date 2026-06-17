export type User = {
  id: number
  username: string
  email: string
}

export type AuthResponse = {
  user: User
}

export type LoginPayload = {
  username: string
  password: string
}

export type RegisterPayload = {
  username: string
  email: string
  password: string
}
