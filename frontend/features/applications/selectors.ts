import {
  priorityRank,
  statusLabels,
  statusOrder,
} from "@/features/applications/constants"
import {
  formatRelativeDate,
} from "@/features/applications/mappers"
import type {
  ApplicationFilters,
  ApplicationMetric,
  ApplicationStatus,
  JobApplication,
} from "@/features/applications/types"

const emptyGroups = () =>
  statusOrder.reduce<Record<ApplicationStatus, JobApplication[]>>(
    (groups, status) => {
      groups[status] = []
      return groups
    },
    {
      saved: [],
      applied: [],
      in_review: [],
      interviewing: [],
      technical_test: [],
      offer: [],
      rejected: [],
      withdrawn: [],
      ghosted: [],
    }
  )

const matchesQuery = (application: JobApplication, query: string) => {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return true
  }

  return [
    application.title,
    application.companyName,
    application.location,
    application.description,
    application.notes,
  ].some((value) => value.toLowerCase().includes(normalizedQuery))
}

const deadlineTime = (application: JobApplication) =>
  application.deadline ? new Date(application.deadline).getTime() : Number.MAX_SAFE_INTEGER

export const filterAndSortApplications = (
  applications: JobApplication[],
  filters: ApplicationFilters
) => {
  const filtered = applications.filter((application) => {
    if (!application.active) {
      return false
    }

    if (!matchesQuery(application, filters.query)) {
      return false
    }

    if (filters.status !== "all" && application.status !== filters.status) {
      return false
    }

    if (filters.priority !== "all" && application.priority !== filters.priority) {
      return false
    }

    return true
  })

  return [...filtered].sort((left, right) => {
    if (filters.sort === "deadline_asc") {
      return deadlineTime(left) - deadlineTime(right)
    }

    if (filters.sort === "company_asc") {
      return left.companyName.localeCompare(right.companyName)
    }

    if (filters.sort === "priority_desc") {
      return priorityRank[right.priority] - priorityRank[left.priority]
    }

    return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
  })
}

export const groupApplicationsByStatus = (applications: JobApplication[]) => {
  const grouped = emptyGroups()

  applications.forEach((application) => {
    grouped[application.status].push(application)
  })

  return grouped
}

export const getApplicationMetrics = (
  applications: JobApplication[]
): ApplicationMetric[] => {
  const activeApplications = applications.filter((application) => application.active)
  const interviews = activeApplications.filter((application) =>
    ["interviewing", "technical_test"].includes(application.status)
  )
  const offers = activeApplications.filter((application) => application.status === "offer")
  const now = new Date()
  const weekFromNow = new Date(now)
  weekFromNow.setDate(now.getDate() + 7)
  const deadlines = activeApplications.filter((application) => {
    if (!application.deadline) {
      return false
    }

    const deadline = new Date(application.deadline)
    return deadline >= now && deadline <= weekFromNow
  })
  const responses = activeApplications.filter(
    (application) => application.status !== "saved" && application.status !== "applied"
  )
  const responseRate = activeApplications.length
    ? Math.round((responses.length / activeApplications.length) * 100)
    : 0

  return [
    {
      title: "Active applications",
      value: String(activeApplications.length),
      detail: `${responses.length} have moved beyond applied`,
    },
    {
      title: "Interviews",
      value: String(interviews.length),
      detail: `${interviews.filter((item) => item.priority === "high").length} high priority`,
      tone: "amber",
    },
    {
      title: "Offers",
      value: String(offers.length),
      detail: offers.length ? "Compare fit before responding" : "No active offers yet",
      tone: "green",
    },
    {
      title: "Deadlines",
      value: String(deadlines.length),
      detail: "Due in the next 7 days",
      tone: "red",
    },
    {
      title: "Response rate",
      value: `${responseRate}%`,
      detail: "Applications with meaningful movement",
      tone: "blue",
    },
  ]
}

export const getTodayFocus = (applications: JobApplication[]) =>
  [...applications]
    .filter((application) => application.active)
    .sort((left, right) => {
      const priorityDiff = priorityRank[right.priority] - priorityRank[left.priority]

      if (priorityDiff !== 0) {
        return priorityDiff
      }

      return deadlineTime(left) - deadlineTime(right)
    })
    .slice(0, 3)
    .map((application) => {
      if (application.deadline) {
        return `${application.title} at ${application.companyName}: deadline ${application.deadline}`
      }

      return `${application.title} at ${application.companyName}: ${statusLabels[application.status]}`
    })

export const getStatusChartData = (applications: JobApplication[]) =>
  statusOrder
    .map((status) => ({
      count: applications.filter((application) => application.status === status).length,
      status: statusLabels[status],
    }))
    .filter((item) => item.count > 0)

export const getTrendChartData = (applications: JobApplication[]) => {
  const buckets = new Map<string, { applications: number; interviews: number; week: string }>()

  applications.forEach((application) => {
    const sourceDate = application.dateApplied || application.createdAt
    const date = new Date(sourceDate)
    const weekStart = new Date(date)
    weekStart.setDate(date.getDate() - date.getDay())

    const key = weekStart.toISOString().slice(0, 10)
    const label = new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
    }).format(weekStart)
    const bucket = buckets.get(key) ?? {
      applications: 0,
      interviews: 0,
      week: label,
    }

    bucket.applications += 1

    if (["interviewing", "technical_test", "offer"].includes(application.status)) {
      bucket.interviews += 1
    }

    buckets.set(key, bucket)
  })

  return [...buckets.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([, value]) => value)
}

export const getLastUpdatedLabel = (applications: JobApplication[]) => {
  const [latest] = [...applications].sort(
    (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
  )

  return formatRelativeDate(latest?.updatedAt)
}
