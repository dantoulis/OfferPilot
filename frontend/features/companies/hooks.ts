"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  companyKeys,
  createCompany,
  deleteCompany,
  listCompanies,
  updateCompany,
} from "@/features/companies/api"
import {
  filterAndSortCompanies,
  getCompaniesWithActivity,
} from "@/features/companies/selectors"
import { useApplicationsQuery } from "@/features/applications/hooks"
import { useAppSelector } from "@/store/hooks"

export const useCompaniesQuery = () =>
  useQuery({
    queryFn: listCompanies,
    queryKey: companyKeys.all,
  })

export const useCreateCompanyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCompany,
    onSuccess: (company) => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all })
      queryClient.setQueryData(companyKeys.detail(company.id), company)
    },
  })
}

export const useUpdateCompanyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCompany,
    onSuccess: (company) => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all })
      queryClient.setQueryData(companyKeys.detail(company.id), company)
    },
  })
}

export const useDeleteCompanyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all })
      queryClient.removeQueries({ queryKey: companyKeys.detail(id) })
    },
  })
}

export const useCompaniesViewModel = () => {
  const companiesQuery = useCompaniesQuery()
  const applicationsQuery = useApplicationsQuery()
  const query = useAppSelector((state) => state.ui.companySearch)
  const sort = useAppSelector((state) => state.ui.companySort)
  const companies = getCompaniesWithActivity(
    companiesQuery.data ?? [],
    applicationsQuery.data ?? []
  )

  return {
    companies: filterAndSortCompanies(companies, query, sort),
    isError: companiesQuery.isError || applicationsQuery.isError,
    isLoading: companiesQuery.isLoading || applicationsQuery.isLoading,
    query,
    sort,
  }
}
