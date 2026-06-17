"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  applicationKeys,
  createApplication,
  deleteApplication,
  getApplication,
  listApplications,
  patchApplication,
  updateApplication,
} from "@/features/applications/api"
import {
  filterAndSortApplications,
  getApplicationMetrics,
  getStatusChartData,
  getTodayFocus,
  getTrendChartData,
  groupApplicationsByStatus,
} from "@/features/applications/selectors"
import type {
  ApplicationFilters,
  JobApplicationPayload,
} from "@/features/applications/types"
import { useAppSelector } from "@/store/hooks"

export const useApplicationsQuery = () =>
  useQuery({
    queryFn: listApplications,
    queryKey: applicationKeys.all,
  })

export const useApplicationQuery = (id: string) =>
  useQuery({
    queryFn: () => getApplication(id),
    queryKey: applicationKeys.detail(id),
  })

export const useCreateApplicationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createApplication,
    onSuccess: (application) => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.all })
      queryClient.setQueryData(applicationKeys.detail(application.id), application)
    },
  })
}

export const useUpdateApplicationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateApplication,
    onSuccess: (application) => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.all })
      queryClient.setQueryData(applicationKeys.detail(application.id), application)
    },
  })
}

export const usePatchApplicationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: patchApplication,
    onSuccess: (application) => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.all })
      queryClient.setQueryData(applicationKeys.detail(application.id), application)
    },
  })
}

export const useDeleteApplicationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.all })
      queryClient.removeQueries({ queryKey: applicationKeys.detail(id) })
    },
  })
}

export const useApplicationFilters = (): ApplicationFilters => {
  const query = useAppSelector((state) => state.ui.applicationSearch)
  const status = useAppSelector((state) => state.ui.applicationStatusFilter)
  const priority = useAppSelector((state) => state.ui.applicationPriorityFilter)
  const sort = useAppSelector((state) => state.ui.applicationSort)

  return {
    priority,
    query,
    sort,
    status,
  }
}

export const useApplicationsViewModel = () => {
  const applicationsQuery = useApplicationsQuery()
  const filters = useApplicationFilters()
  const applications = applicationsQuery.data ?? []
  const filteredApplications = filterAndSortApplications(applications, filters)

  return {
    applications,
    filteredApplications,
    filters,
    isError: applicationsQuery.isError,
    isLoading: applicationsQuery.isLoading,
  }
}

export const useDashboardViewModel = () => {
  const applicationsQuery = useApplicationsQuery()
  const filters = useApplicationFilters()
  const applications = applicationsQuery.data ?? []
  const filteredApplications = filterAndSortApplications(applications, filters)

  return {
    applications,
    filteredApplications,
    filters,
    groupedApplications: groupApplicationsByStatus(filteredApplications),
    isError: applicationsQuery.isError,
    isLoading: applicationsQuery.isLoading,
    metrics: getApplicationMetrics(applications),
    statusChartData: getStatusChartData(applications),
    todayFocus: getTodayFocus(applications),
    trendChartData: getTrendChartData(applications),
  }
}

export const useMoveApplicationStatusMutation = () => {
  const patchMutation = usePatchApplicationMutation()

  return {
    ...patchMutation,
    moveApplication: (id: string, status: JobApplicationPayload["status"]) =>
      patchMutation.mutateAsync({ id, payload: { status } }),
  }
}
