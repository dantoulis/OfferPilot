"use client"

import Link from "next/link"
import type { DragEvent } from "react"

import { PriorityBadge } from "@/components/offerpilot/priority-badge"
import { StatusBadge } from "@/components/offerpilot/status-badge"
import { WorkplaceBadge } from "@/components/offerpilot/workplace-badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { formatSalary, type JobApplication } from "@/lib/mock-data"

export const ApplicationCard = ({
  application,
  dragging = false,
  onDragEnd,
  onDragStart,
}: {
  application: JobApplication
  dragging?: boolean
  onDragEnd?: () => void
  onDragStart?: (event: DragEvent<HTMLElement>) => void
}) => (
  <Card
    className="cursor-grab gap-3 py-3 transition active:cursor-grabbing data-[dragging=true]:scale-[0.98] data-[dragging=true]:opacity-60"
    data-dragging={dragging ? true : undefined}
    draggable
    onDragEnd={onDragEnd}
    onDragStart={onDragStart}
  >
    <CardHeader className="px-3">
      <div className="min-w-0">
        <Link
          className="line-clamp-2 text-sm font-semibold hover:text-primary"
          href={`/applications/${application.id}`}
        >
          {application.title}
        </Link>
        <CardDescription>{application.companyName}</CardDescription>
      </div>
    </CardHeader>
    <CardContent className="grid gap-3 px-3">
      <div className="flex flex-wrap gap-1.5">
        <StatusBadge status={application.status} />
        <PriorityBadge priority={application.priority} />
      </div>
      <p className="text-xs text-muted-foreground">{formatSalary(application)}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{application.updatedAt}</span>
        <WorkplaceBadge workplaceType={application.workplaceType} />
      </div>
    </CardContent>
  </Card>
)
