import { z } from "zod"

const optionalUrl = z
  .string()
  .trim()
  .refine((value) => !value || URL.canParse(value), "Enter a valid URL")

export const companyFormSchema = z.object({
  location: z.string(),
  name: z.string().trim().min(1, "Company name is required"),
  notes: z.string(),
  website: optionalUrl,
})

export type CompanyFormSchema = z.infer<typeof companyFormSchema>
