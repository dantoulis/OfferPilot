import { apiFetch } from "@/lib/api-client"
import { toJobApplication } from "@/features/applications/mappers"
import type {
  JobApplication,
  JobApplicationApi,
  JobApplicationPayload,
} from "@/features/applications/types"

export const applicationKeys = {
  all: ["applications"] as const,
  detail: (id: string) => ["applications", id] as const,
}

export const listApplications = async (): Promise<JobApplication[]> => {
  const data = await apiFetch<JobApplicationApi[]>("/applications/")
  return data.map(toJobApplication)
}

export const getApplication = async (id: string): Promise<JobApplication> => {
  const data = await apiFetch<JobApplicationApi>(`/applications/${id}/`)
  return toJobApplication(data)
}

export const createApplication = async (
  payload: JobApplicationPayload
): Promise<JobApplication> => {
  const data = await apiFetch<JobApplicationApi>("/applications/", {
    body: payload,
    method: "POST",
  })
  return toJobApplication(data)
}

export const updateApplication = async ({
  id,
  payload,
}: {
  id: string
  payload: JobApplicationPayload
}): Promise<JobApplication> => {
  const data = await apiFetch<JobApplicationApi>(`/applications/${id}/`, {
    body: payload,
    method: "PUT",
  })
  return toJobApplication(data)
}

export const patchApplication = async ({
  id,
  payload,
}: {
  id: string
  payload: Partial<JobApplicationPayload>
}): Promise<JobApplication> => {
  const data = await apiFetch<JobApplicationApi>(`/applications/${id}/`, {
    body: payload,
    method: "PATCH",
  })
  return toJobApplication(data)
}

export const deleteApplication = async (id: string) => {
  await apiFetch<null>(`/applications/${id}/`, {
    method: "DELETE",
  })
}
