"use client"

import Link from "next/link"
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  FileText,
  MapPin,
  MoreHorizontal,
  Pencil,
} from "lucide-react"
import { toast } from "sonner"

import { ApplicationDetail } from "@/components/offerpilot/application-detail"
import { ApplicationFormDialog } from "@/components/offerpilot/application-form-dialog"
import { ApplicationNextAction } from "@/components/offerpilot/application-next-action"
import { AppShell } from "@/components/offerpilot/app-shell"
import { DeleteApplicationDialog } from "@/components/offerpilot/delete-application-dialog"
import { PriorityBadge } from "@/components/offerpilot/priority-badge"
import { StatusBadge } from "@/components/offerpilot/status-badge"
import { WorkplaceBadge } from "@/components/offerpilot/workplace-badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { statusLabels, statusOrder } from "@/features/applications/constants"
import {
  formatDate,
  formatRelativeDate,
  formatSalary,
} from "@/features/applications/mappers"
import {
  useApplicationQuery,
  useMoveApplicationStatusMutation,
} from "@/features/applications/hooks"
import type { ApplicationStatus } from "@/features/applications/types"
import { getApiErrorMessage } from "@/lib/api-client"

export const ApplicationDetailsPage = ({ id }: { id: string }) => {
  const applicationQuery = useApplicationQuery(id)
  const moveMutation = useMoveApplicationStatusMutation()
  const application = applicationQuery.data

  const handleStatusChange = async (status: ApplicationStatus) => {
    if (!application || application.status === status) {
      return
    }

    try {
      await moveMutation.moveApplication(application.id, status)
      toast.success(`Status updated to ${statusLabels[status]}`)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not update status"))
    }
  }

  return (
    <AppShell>
      <div className="flex w-full max-w-none flex-col gap-6 px-3 py-6 sm:px-4 lg:px-5 xl:px-6">
        {applicationQuery.isLoading ? (
          <div className="rounded-xl border border-dashed bg-card p-8 text-sm text-muted-foreground">
            Loading application...
          </div>
        ) : applicationQuery.isError || !application ? (
          <div className="rounded-xl border border-dashed bg-card p-8 text-sm text-destructive">
            Could not load this application.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0">
                <Button
                  nativeButton={false}
                  render={<Link href="/applications" />}
                  variant="ghost"
                  className="mb-4 -ml-2"
                >
                  <ArrowLeft className="size-4" />
                  Back to applications
                </Button>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={application.status} />
                  <PriorityBadge priority={application.priority} />
                  <WorkplaceBadge workplaceType={application.workplaceType} />
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-normal sm:text-3xl">
                  {application.title}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {application.companyName} - {application.location || "No location"}
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <ApplicationFormDialog application={application} label="Edit application" />
                {application.jobUrl ? (
                  <Button
                    nativeButton={false}
                    render={<Link href={application.jobUrl} />}
                    variant="outline"
                  >
                    <ExternalLink className="size-4" />
                    Open job
                  </Button>
                ) : null}
                <DeleteApplicationDialog
                  applicationId={application.id}
                  redirectAfterDelete
                  title={application.title}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button size="icon" variant="outline" />}>
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">More actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Pencil className="size-4" />
                      Duplicate later
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleStatusChange("withdrawn")}
                    >
                      Mark withdrawn
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Application overview</CardTitle>
                    <CardDescription>Key details from the backend application model.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    <ApplicationDetail label="Company" value={application.companyName} />
                    <ApplicationDetail label="Salary" value={formatSalary(application)} />
                    <ApplicationDetail
                      label="Date applied"
                      value={application.dateApplied ? formatDate(application.dateApplied) : "Not applied"}
                    />
                    <ApplicationDetail
                      label="Deadline"
                      value={application.deadline ? formatDate(application.deadline) : "No deadline"}
                    />
                    <ApplicationDetail
                      label="Location"
                      value={application.location || "No location"}
                    />
                    <ApplicationDetail
                      label="Last updated"
                      value={formatRelativeDate(application.updatedAt)}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                    <CardDescription>Role context and fit.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="leading-7 text-muted-foreground">
                      {application.description || "No description yet."}
                    </p>
                    <Separator />
                    <div>
                      <h3 className="mb-2 font-medium">Private notes</h3>
                      <p className="leading-7 text-muted-foreground">
                        {application.notes || "No private notes yet."}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Timeline</CardTitle>
                    <CardDescription>Important application events.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-5">
                    {[
                      [formatRelativeDate(application.updatedAt), `Status is ${statusLabels[application.status]}.`],
                      [
                        application.dateApplied
                          ? formatDate(application.dateApplied)
                          : formatRelativeDate(application.createdAt),
                        "Application added to OfferPilot.",
                      ],
                    ].map(([date, event]) => (
                      <div className="flex gap-3" key={`${date}-${event}`}>
                        <div className="mt-1 size-2.5 shrink-0 rounded-full bg-primary" />
                        <div>
                          <p className="text-sm font-medium">{date}</p>
                          <p className="text-sm text-muted-foreground">{event}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <aside className="grid gap-6 self-start">
                <Card>
                  <CardHeader>
                    <CardTitle>Update status</CardTitle>
                    <CardDescription>Move this application through the pipeline.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <Select
                      value={application.status}
                      onValueChange={(value) =>
                        handleStatusChange(value as ApplicationStatus)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOrder.map((status) => (
                          <SelectItem key={status} value={status}>
                            {statusLabels[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Next actions</CardTitle>
                    <CardDescription>What the user should do next.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    <ApplicationNextAction icon={<CalendarDays className="size-4" />} text="Review upcoming deadlines" />
                    <ApplicationNextAction icon={<MapPin className="size-4" />} text="Confirm remote/hybrid expectations" />
                    <ApplicationNextAction icon={<FileText className="size-4" />} text="Update salary comparison notes" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Company snapshot</CardTitle>
                    <CardDescription>Later this card can include a company image.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 font-semibold text-primary">
                        {application.companyName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{application.companyName}</p>
                        <p className="text-sm text-muted-foreground">
                          {application.location || "No location"}
                        </p>
                      </div>
                    </div>
                    <Button
                      nativeButton={false}
                      render={<Link href="/companies" />}
                      className="mt-4 w-full"
                      variant="outline"
                    >
                      View companies
                    </Button>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </>
        )}
      </div>
    </AppShell>
  )
}
