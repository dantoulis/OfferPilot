import { apiFetch } from "@/lib/api-client"
import { toCompany } from "@/features/companies/mappers"
import type {
  Company,
  CompanyApi,
  CompanyPayload,
} from "@/features/companies/types"

export const companyKeys = {
  all: ["companies"] as const,
  detail: (id: string) => ["companies", id] as const,
}

export const listCompanies = async (): Promise<Company[]> => {
  const data = await apiFetch<CompanyApi[]>("/companies/")
  return data.map(toCompany)
}

export const createCompany = async (payload: CompanyPayload): Promise<Company> => {
  const data = await apiFetch<CompanyApi>("/companies/", {
    body: payload,
    method: "POST",
  })
  return toCompany(data)
}

export const updateCompany = async ({
  id,
  payload,
}: {
  id: string
  payload: CompanyPayload
}): Promise<Company> => {
  const data = await apiFetch<CompanyApi>(`/companies/${id}/`, {
    body: payload,
    method: "PUT",
  })
  return toCompany(data)
}

export const deleteCompany = async (id: string) => {
  await apiFetch<null>(`/companies/${id}/`, {
    method: "DELETE",
  })
}
