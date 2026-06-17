"use client"

import Link from "next/link"
import {
  ArrowUpDown,
  CalendarDays,
  ExternalLink,
  Search,
} from "lucide-react"

import { ApplicationFormDialog } from "@/components/offerpilot/application-form-dialog"
import { AppShell } from "@/components/offerpilot/app-shell"
import { PriorityBadge } from "@/components/offerpilot/priority-badge"
import { StatusBadge } from "@/components/offerpilot/status-badge"
import { WorkplaceBadge } from "@/components/offerpilot/workplace-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  applicationSortLabels,
  priorityLabels,
  statusLabels,
  statusOrder,
} from "@/features/applications/constants"
import {
  formatDate,
  formatRelativeDate,
  formatSalary,
} from "@/features/applications/mappers"
import { useApplicationsViewModel } from "@/features/applications/hooks"
import { getApplicationMetrics } from "@/features/applications/selectors"
import { useAppDispatch } from "@/store/hooks"
import {
  setApplicationPriorityFilter,
  setApplicationSearch,
  setApplicationSort,
  setApplicationStatusFilter,
} from "@/store/ui-slice"

const ApplicationsPage = () => {
  const dispatch = useAppDispatch()
  const viewModel = useApplicationsViewModel()
  const metrics = getApplicationMetrics(viewModel.applications)
  const activeCount = metrics[0]?.value ?? "0"
  const interviewCount = metrics[1]?.value ?? "0"
  const deadlineCount = metrics[3]?.value ?? "0"

  return (
    <AppShell>
      <div className="flex w-full max-w-none flex-col gap-6 px-3 py-6 sm:px-4 lg:px-5 xl:px-6">
        <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal sm:text-3xl">
              Applications
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Browse every role in your pipeline, scan status and priority, then open
              a dedicated application page for the full context.
            </p>
          </div>
          <ApplicationFormDialog />
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>Active applications</CardDescription>
              <CardTitle className="text-3xl">{activeCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Interview track</CardDescription>
              <CardTitle className="text-3xl">{interviewCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Upcoming deadlines</CardDescription>
              <CardTitle className="text-3xl">{deadlineCount}</CardTitle>
            </CardHeader>
          </Card>
        </section>

        <Card>
          <CardHeader className="gap-4 xl:flex xl:flex-row xl:items-center xl:justify-between">
            <div>
              <CardTitle>Application list</CardTitle>
              <CardDescription>
                Search, filter, sort, and open any role for detailed editing.
              </CardDescription>
            </div>
            <div className="grid gap-2 sm:grid-cols-[minmax(240px,1fr)_auto_auto_auto] xl:w-[820px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-2 size-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="Search roles, companies, locations"
                  value={viewModel.filters.query}
                  onChange={(event) =>
                    dispatch(setApplicationSearch(event.target.value))
                  }
                />
              </div>
              <Select
                value={viewModel.filters.status}
                onValueChange={(value) =>
                  dispatch(setApplicationStatusFilter(value as typeof viewModel.filters.status))
                }
              >
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {statusOrder.map((status) => (
                    <SelectItem key={status} value={status}>
                      {statusLabels[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={viewModel.filters.priority}
                onValueChange={(value) =>
                  dispatch(setApplicationPriorityFilter(value as typeof viewModel.filters.priority))
                }
              >
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All priorities</SelectItem>
                  {Object.entries(priorityLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={viewModel.filters.sort}
                onValueChange={(value) =>
                  dispatch(setApplicationSort(value as typeof viewModel.filters.sort))
                }
              >
                <SelectTrigger className="w-full sm:w-40">
                  <ArrowUpDown className="size-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(applicationSortLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {viewModel.isLoading ? (
              <div className="rounded-xl border border-dashed p-8 text-sm text-muted-foreground">
                Loading applications...
              </div>
            ) : viewModel.isError ? (
              <div className="rounded-xl border border-dashed p-8 text-sm text-destructive">
                Could not load applications.
              </div>
            ) : viewModel.filteredApplications.length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-sm text-muted-foreground">
                No applications match the current filters.
              </div>
            ) : (
              <>
                <div className="grid gap-3 lg:hidden">
                  {viewModel.filteredApplications.map((application) => (
                    <Link
                      className="rounded-xl border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
                      href={`/applications/${application.id}`}
                      key={application.id}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="line-clamp-2 font-semibold">{application.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {application.companyName} - {application.location || "No location"}
                          </p>
                        </div>
                        <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <StatusBadge status={application.status} />
                        <PriorityBadge priority={application.priority} />
                        <WorkplaceBadge workplaceType={application.workplaceType} />
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                        <span>{formatSalary(application)}</span>
                        <span>{formatRelativeDate(application.updatedAt)}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead className="text-right">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {viewModel.filteredApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            <Link
                              className="font-medium hover:text-primary"
                              href={`/applications/${application.id}`}
                            >
                              {application.title}
                            </Link>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {application.location || "No location"}
                            </p>
                          </TableCell>
                          <TableCell>{application.companyName}</TableCell>
                          <TableCell>
                            <StatusBadge status={application.status} />
                          </TableCell>
                          <TableCell>
                            <PriorityBadge priority={application.priority} />
                          </TableCell>
                          <TableCell>{formatSalary(application)}</TableCell>
                          <TableCell>
                            {application.deadline ? (
                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays className="size-3.5 text-muted-foreground" />
                                {formatDate(application.deadline)}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">None</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              nativeButton={false}
                              render={<Link href={`/applications/${application.id}`} />}
                              size="sm"
                              variant="outline"
                            >
                              Open
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status overview</CardTitle>
            <CardDescription>Counts update from your live application data.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {statusOrder.map((status) => {
              const count = viewModel.applications.filter(
                (item) => item.status === status
              ).length

              return (
                <Badge key={status} variant="secondary">
                  {statusLabels[status]}: {count}
                </Badge>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}

export default ApplicationsPage
