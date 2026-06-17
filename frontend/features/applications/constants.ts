import type {
  ApplicationSort,
  ApplicationStatus,
  Priority,
  WorkplaceType,
} from "@/features/applications/types"

export const statusLabels: Record<ApplicationStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  in_review: "In Review",
  interviewing: "Interviewing",
  technical_test: "Technical Test",
  offer: "Offer",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
  ghosted: "Ghosted",
}

export const statusOrder: ApplicationStatus[] = [
  "saved",
  "applied",
  "in_review",
  "interviewing",
  "technical_test",
  "offer",
  "rejected",
  "withdrawn",
  "ghosted",
]

export const priorityLabels: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
}

export const workplaceLabels: Record<WorkplaceType, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
}

export const applicationSortLabels: Record<ApplicationSort, string> = {
  updated_desc: "Recently updated",
  deadline_asc: "Deadline first",
  company_asc: "Company A-Z",
  priority_desc: "Priority",
}

export const priorityRank: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
}
