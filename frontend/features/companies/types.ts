import type { ApplicationStatus } from "@/features/applications/types"

export type Company = {
  id: string
  name: string
  website: string
  location: string
  notes: string
  createdAt: string
  updatedAt: string
}

export type CompanyApi = {
  id: number
  name: string
  website: string
  location: string
  notes: string
  created_at: string
  updated_at: string
}

export type CompanyPayload = {
  name: string
  website: string
  location: string
  notes: string
}

export type CompanyFormValues = {
  name: string
  website: string
  location: string
  notes: string
}

export type CompanySort = "active_desc" | "name_asc" | "updated_desc"

export type CompanyWithActivity = Company & {
  activeApplications: number
  lastActivity: string
  topStatus: ApplicationStatus
}
