import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  FileText,
  MapPin,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react"

import { ApplicationFormPreview } from "@/components/offerpilot/application-form-preview"
import { AppShell } from "@/components/offerpilot/app-shell"
import { ApplicationDetail } from "@/components/offerpilot/application-detail"
import { ApplicationNextAction } from "@/components/offerpilot/application-next-action"
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
import {
  applications,
  formatSalary,
  statusLabels,
  statusOrder,
} from "@/lib/mock-data"

export const generateStaticParams = () =>
  applications.map((application) => ({ id: application.id }))

const ApplicationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const application = applications.find((item) => item.id === id)

  if (!application) {
    notFound()
  }

  return (
    <AppShell>
      <div className="flex w-full max-w-none flex-col gap-6 px-3 py-6 sm:px-4 lg:px-5 xl:px-6">
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
              {application.companyName} - {application.location}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <ApplicationFormPreview label="Edit application" />
            <Button
              nativeButton={false}
              render={<Link href={application.jobUrl} />}
              variant="outline"
            >
              <ExternalLink className="size-4" />
              Open job
            </Button>
            <DeleteApplicationDialog />
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button size="icon" variant="outline" />}>
                <MoreHorizontal className="size-4" />
                <span className="sr-only">More actions</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Pencil className="size-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2 className="size-4" />
                  Delete
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
                <CardDescription>
                  Key details mapped to the backend application model.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <ApplicationDetail label="Company" value={application.companyName} />
                <ApplicationDetail label="Salary" value={formatSalary(application)} />
                <ApplicationDetail label="Date applied" value={application.dateApplied || "Not applied"} />
                <ApplicationDetail label="Deadline" value={application.deadline ?? "No deadline"} />
                <ApplicationDetail label="Location" value={application.location} />
                <ApplicationDetail label="Last updated" value={application.updatedAt} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
                <CardDescription>Role context and fit.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="leading-7 text-muted-foreground">{application.description}</p>
                <Separator />
                <div>
                  <h3 className="mb-2 font-medium">Private notes</h3>
                  <p className="leading-7 text-muted-foreground">{application.notes}</p>
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
                  ["Today", "Reviewed next action and deadline."],
                  [application.updatedAt, `Moved to ${statusLabels[application.status]}.`],
                  [application.dateApplied || "Saved", "Application added to OfferPilot."],
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
                <CardDescription>Preview of the status update control.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Select defaultValue={application.status}>
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
                <Button>Save status</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next actions</CardTitle>
                <CardDescription>What the user should do next.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <ApplicationNextAction icon={<CalendarDays className="size-4" />} text="Prepare interview notes" />
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
                    {application.companyName.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium">{application.companyName}</p>
                    <p className="text-sm text-muted-foreground">{application.location}</p>
                  </div>
                </div>
                <Button
                  nativeButton={false}
                  render={<Link href="/companies" />}
                  className="mt-4 w-full"
                  variant="outline"
                >
                  View company page
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </AppShell>
  )
}

export default ApplicationDetailsPage
