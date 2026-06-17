import { z } from "zod"

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
  username: z.string().trim().min(1, "Username or email is required"),
})

export const registerSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string().trim().min(1, "Username is required"),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
