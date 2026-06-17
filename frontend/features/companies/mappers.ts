import type {
  Company,
  CompanyApi,
  CompanyFormValues,
  CompanyPayload,
} from "@/features/companies/types"

export const toCompany = (company: CompanyApi): Company => ({
  id: String(company.id),
  name: company.name,
  website: company.website,
  location: company.location,
  notes: company.notes,
  createdAt: company.created_at,
  updatedAt: company.updated_at,
})

export const toCompanyFormValues = (company?: Company): CompanyFormValues => ({
  name: company?.name ?? "",
  website: company?.website ?? "",
  location: company?.location ?? "",
  notes: company?.notes ?? "",
})

export const toCompanyPayload = (values: CompanyFormValues): CompanyPayload => ({
  location: values.location.trim(),
  name: values.name.trim(),
  notes: values.notes.trim(),
  website: values.website.trim(),
})
