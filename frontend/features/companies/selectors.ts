import { formatRelativeDate } from "@/features/applications/mappers"
import type { JobApplication } from "@/features/applications/types"
import type {
  Company,
  CompanySort,
  CompanyWithActivity,
} from "@/features/companies/types"

export const getCompaniesWithActivity = (
  companies: Company[],
  applications: JobApplication[]
): CompanyWithActivity[] =>
  companies.map((company) => {
    const relatedApplications = applications.filter(
      (application) => application.companyId === company.id
    )
    const activeApplications = relatedApplications.filter(
      (application) => application.active
    )
    const [latestApplication] = [...relatedApplications].sort(
      (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
    )

    return {
      ...company,
      activeApplications: activeApplications.length,
      lastActivity: formatRelativeDate(latestApplication?.updatedAt ?? company.updatedAt),
      topStatus: latestApplication?.status ?? "saved",
    }
  })

export const filterAndSortCompanies = (
  companies: CompanyWithActivity[],
  query: string,
  sort: CompanySort
) => {
  const normalizedQuery = query.trim().toLowerCase()
  const filtered = companies.filter((company) => {
    if (!normalizedQuery) {
      return true
    }

    return [company.name, company.location, company.notes].some((value) =>
      value.toLowerCase().includes(normalizedQuery)
    )
  })

  return [...filtered].sort((left, right) => {
    if (sort === "name_asc") {
      return left.name.localeCompare(right.name)
    }

    if (sort === "updated_desc") {
      return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
    }

    return right.activeApplications - left.activeApplications
  })
}
