"use client"

import { useState } from "react"

import { ApplicationCard } from "@/components/offerpilot/application-card"
import { Badge } from "@/components/ui/badge"
import { statusLabels, statusOrder } from "@/features/applications/constants"
import type {
  ApplicationStatus,
  JobApplication,
} from "@/features/applications/types"

export const ApplicationBoard = ({
  groupedApplications,
  onMoveApplication,
}: {
  groupedApplications: Record<ApplicationStatus, JobApplication[]>
  onMoveApplication: (application: JobApplication, status: ApplicationStatus) => void
}) => {
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverStatus, setDragOverStatus] = useState<ApplicationStatus | null>(null)

  const applications = Object.values(groupedApplications).flat()

  const moveApplication = (applicationId: string, nextStatus: ApplicationStatus) => {
    const application = applications.find((item) => item.id === applicationId)
    if (!application || application.status === nextStatus) {
      return
    }

    onMoveApplication(application, nextStatus)
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {statusOrder.map((status) => {
        const columnItems = groupedApplications[status]

        return (
          <div
            className="min-h-[420px] w-[260px] shrink-0 rounded-xl border bg-muted/65 p-3 transition-colors data-[drag-over=true]:border-primary data-[drag-over=true]:bg-primary/10 dark:border-border/80"
            data-drag-over={dragOverStatus === status ? true : undefined}
            onDragLeave={() => setDragOverStatus(null)}
            onDragOver={(event) => {
              event.preventDefault()
              setDragOverStatus(status)
            }}
            onDrop={(event) => {
              event.preventDefault()
              const applicationId = event.dataTransfer.getData("text/plain") || draggingId

              if (applicationId) {
                moveApplication(applicationId, status)
              }

              setDraggingId(null)
              setDragOverStatus(null)
            }}
            key={status}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">{statusLabels[status]}</h3>
              <Badge variant="secondary">{columnItems.length}</Badge>
            </div>
            <div className="grid gap-3">
              {columnItems.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  dragging={draggingId === application.id}
                  onDragEnd={() => {
                    setDraggingId(null)
                    setDragOverStatus(null)
                  }}
                  onDragStart={(event) => {
                    setDraggingId(application.id)
                    event.dataTransfer.effectAllowed = "move"
                    event.dataTransfer.setData("text/plain", application.id)
                  }}
                />
              ))}
              {!columnItems.length ? (
                <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                  Drop an application here.
                </div>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
