import { z } from "zod"

import { statusOrder } from "@/features/applications/constants"

const optionalUrl = z
  .string()
  .trim()
  .refine((value) => !value || URL.canParse(value), "Enter a valid URL")

const optionalNumber = z
  .string()
  .trim()
  .refine((value) => !value || Number(value) >= 0, "Enter a positive number")

export const applicationFormSchema = z
  .object({
    companyId: z.string(),
    title: z.string().trim().min(1, "Job title is required"),
    jobUrl: optionalUrl,
    location: z.string(),
    workplaceType: z.union([
      z.literal(""),
      z.literal("remote"),
      z.literal("hybrid"),
      z.literal("onsite"),
    ]),
    status: z.enum(statusOrder),
    priority: z.enum(["low", "medium", "high"]),
    currency: z.enum(["EUR", "USD"]),
    salaryMin: optionalNumber,
    salaryMax: optionalNumber,
    dateApplied: z.string(),
    deadline: z.string(),
    description: z.string(),
    notes: z.string(),
    active: z.boolean(),
  })
  .refine(
    (values) => {
      if (!values.salaryMin || !values.salaryMax) {
        return true
      }

      return Number(values.salaryMin) <= Number(values.salaryMax)
    },
    {
      message: "Salary max must be greater than or equal to salary min",
      path: ["salaryMax"],
    }
  )

export type ApplicationFormSchema = z.infer<typeof applicationFormSchema>
