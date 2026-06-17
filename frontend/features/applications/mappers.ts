import type {
  ApplicationFormValues,
  JobApplication,
  JobApplicationApi,
  JobApplicationPayload,
} from "@/features/applications/types"

const emptyToNull = (value: string) => (value.trim() ? value : null)

const numberOrNull = (value: string) => {
  if (!value.trim()) {
    return null
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export const toJobApplication = (application: JobApplicationApi): JobApplication => ({
  id: String(application.id),
  title: application.title,
  companyId: application.company === null ? null : String(application.company),
  companyName: application.company_name ?? "No company",
  jobUrl: application.job_url,
  location: application.location,
  workplaceType: application.workplace_type,
  status: application.status,
  priority: application.priority,
  currency: application.currency,
  salaryMin: application.salary_min,
  salaryMax: application.salary_max,
  dateApplied: application.date_applied ?? "",
  deadline: application.deadline,
  description: application.description,
  notes: application.notes,
  active: application.active,
  createdAt: application.created_at,
  updatedAt: application.updated_at,
})

export const toApplicationFormValues = (
  application?: JobApplication
): ApplicationFormValues => ({
  companyId: application?.companyId ?? "none",
  title: application?.title ?? "",
  jobUrl: application?.jobUrl ?? "",
  location: application?.location ?? "",
  workplaceType: application?.workplaceType ?? "",
  status: application?.status ?? "applied",
  priority: application?.priority ?? "medium",
  currency: application?.currency ?? "EUR",
  salaryMin: application?.salaryMin === null || application?.salaryMin === undefined ? "" : String(application.salaryMin),
  salaryMax: application?.salaryMax === null || application?.salaryMax === undefined ? "" : String(application.salaryMax),
  dateApplied: application?.dateApplied ?? "",
  deadline: application?.deadline ?? "",
  description: application?.description ?? "",
  notes: application?.notes ?? "",
  active: application?.active ?? true,
})

export const toApplicationPayload = (
  values: ApplicationFormValues
): JobApplicationPayload => ({
  company: values.companyId === "none" ? null : Number(values.companyId),
  title: values.title.trim(),
  job_url: values.jobUrl.trim(),
  location: values.location.trim(),
  workplace_type: values.workplaceType,
  status: values.status,
  priority: values.priority,
  currency: values.currency,
  salary_min: numberOrNull(values.salaryMin),
  salary_max: numberOrNull(values.salaryMax),
  date_applied: emptyToNull(values.dateApplied),
  deadline: emptyToNull(values.deadline),
  description: values.description.trim(),
  notes: values.notes.trim(),
  active: values.active,
})

export const formatSalary = (application: Pick<JobApplication, "currency" | "salaryMin" | "salaryMax">) => {
  if (!application.salaryMin && !application.salaryMax) {
    return "Salary not listed"
  }

  const formatter = new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
    notation: "compact",
  })

  const min = application.salaryMin
    ? formatter.format(application.salaryMin)
    : "?"
  const max = application.salaryMax
    ? formatter.format(application.salaryMax)
    : "?"

  return `${application.currency} ${min}-${max}`
}

export const formatDate = (value: string | null | undefined) => {
  if (!value) {
    return "None"
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value))
}

export const formatRelativeDate = (value: string | null | undefined) => {
  if (!value) {
    return "No activity"
  }

  const date = new Date(value)
  const today = new Date()
  const diffMs = today.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86_400_000)

  if (diffDays <= 0) {
    return "Today"
  }

  if (diffDays === 1) {
    return "Yesterday"
  }

  if (diffDays < 7) {
    return `${diffDays} days ago`
  }

  return formatDate(value)
}
