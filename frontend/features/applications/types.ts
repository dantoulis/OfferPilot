export type ApplicationStatus =
  | "saved"
  | "applied"
  | "in_review"
  | "interviewing"
  | "technical_test"
  | "offer"
  | "rejected"
  | "withdrawn"
  | "ghosted"

export type Priority = "low" | "medium" | "high"
export type WorkplaceType = "remote" | "hybrid" | "onsite"
export type Currency = "EUR" | "USD"

export type ApplicationStatusFilter = ApplicationStatus | "all"
export type ApplicationPriorityFilter = Priority | "all"

export type ApplicationSort =
  | "updated_desc"
  | "deadline_asc"
  | "company_asc"
  | "priority_desc"

export type JobApplication = {
  id: string
  title: string
  companyId: string | null
  companyName: string
  jobUrl: string
  location: string
  workplaceType: WorkplaceType | ""
  status: ApplicationStatus
  priority: Priority
  currency: Currency
  salaryMin: number | null
  salaryMax: number | null
  dateApplied: string
  deadline: string | null
  description: string
  notes: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export type JobApplicationApi = {
  id: number
  company: number | null
  company_name: string | null
  title: string
  job_url: string
  location: string
  workplace_type: WorkplaceType | ""
  status: ApplicationStatus
  priority: Priority
  currency: Currency
  salary_min: number | null
  salary_max: number | null
  date_applied: string | null
  deadline: string | null
  description: string
  notes: string
  active: boolean
  created_at: string
  updated_at: string
}

export type JobApplicationPayload = {
  company: number | null
  title: string
  job_url: string
  location: string
  workplace_type: WorkplaceType | ""
  status: ApplicationStatus
  priority: Priority
  currency: Currency
  salary_min: number | null
  salary_max: number | null
  date_applied: string | null
  deadline: string | null
  description: string
  notes: string
  active: boolean
}

export type ApplicationFilters = {
  query: string
  status: ApplicationStatusFilter
  priority: ApplicationPriorityFilter
  sort: ApplicationSort
}

export type ApplicationFormValues = {
  companyId: string
  title: string
  jobUrl: string
  location: string
  workplaceType: WorkplaceType | ""
  status: ApplicationStatus
  priority: Priority
  currency: Currency
  salaryMin: string
  salaryMax: string
  dateApplied: string
  deadline: string
  description: string
  notes: string
  active: boolean
}

export type ApplicationMetric = {
  title: string
  value: string
  detail: string
  tone?: "default" | "green" | "amber" | "blue" | "red"
}
