"use client"

import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Columns3,
  ListFilter,
  Search,
  TrendingUp,
} from "lucide-react"
import { toast } from "sonner"

import { AnalyticsCards } from "@/components/offerpilot/analytics-cards"
import { ApplicationBoard } from "@/components/offerpilot/application-board"
import { ApplicationFormDialog } from "@/components/offerpilot/application-form-dialog"
import { AppShell } from "@/components/offerpilot/app-shell"
import { MetricCard } from "@/components/offerpilot/metric-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  applicationSortLabels,
  statusLabels,
  statusOrder,
} from "@/features/applications/constants"
import {
  useDashboardViewModel,
  useMoveApplicationStatusMutation,
} from "@/features/applications/hooks"
import type { ApplicationStatus } from "@/features/applications/types"
import { useMeQuery } from "@/features/auth/hooks"
import { getApiErrorMessage } from "@/lib/api-client"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  setApplicationSearch,
  setApplicationSort,
  setApplicationStatusFilter,
  setDashboardView,
} from "@/store/ui-slice"

export const Dashboard = () => {
  const dispatch = useAppDispatch()
  const dashboardView = useAppSelector((state) => state.ui.dashboardView)
  const viewModel = useDashboardViewModel()
  const moveMutation = useMoveApplicationStatusMutation()
  const meQuery = useMeQuery()
  const metricIcons = [Briefcase, CalendarDays, CheckCircle2, Clock3, TrendingUp]
  const responseRate = Number(
    viewModel.metrics[4]?.value.replace("%", "") ?? 0
  )

  const handleMoveApplication = async (
    application: { id: string; title: string },
    status: ApplicationStatus
  ) => {
    try {
      await moveMutation.moveApplication(application.id, status)
      toast.success(`${application.title} moved to ${statusLabels[status]}`)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not move application"))
    }
  }

  return (
    <AppShell>
      <div className="flex w-full max-w-none flex-col gap-6 px-3 py-6 sm:px-4 lg:px-5 xl:px-6">
        <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <Badge variant="outline" className="mb-3">
              Dashboard + board hybrid
            </Badge>
            <h2 className="text-2xl font-semibold tracking-normal sm:text-3xl">
              Good morning, {meQuery.data?.username ?? "there"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Track every opportunity, spot the next action, and keep your job
              search moving without living inside a spreadsheet.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <ApplicationFormDialog />
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {viewModel.metrics.map((metric, index) => (
            <MetricCard
              detail={metric.detail}
              icon={metricIcons[index]}
              key={metric.title}
              title={metric.title}
              tone={metric.tone}
              value={metric.value}
            />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <Card className="min-w-0">
            <CardHeader className="gap-4 xl:flex xl:flex-row xl:items-center xl:justify-between">
              <div>
                <CardTitle>Application workspace</CardTitle>
                <CardDescription>
                  Switch between a visual board and quick analytics.
                </CardDescription>
              </div>
              <div className="grid gap-2 sm:grid-cols-[minmax(220px,1fr)_auto_auto_auto] xl:w-[760px]">
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
                  <SelectTrigger className="w-full sm:w-32">
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
                  value={viewModel.filters.sort}
                  onValueChange={(value) =>
                    dispatch(setApplicationSort(value as typeof viewModel.filters.sort))
                  }
                >
                  <SelectTrigger className="w-full sm:w-32">
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
                <Button variant="outline">
                  <ListFilter className="size-4" />
                  More
                </Button>
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
              ) : (
              <Tabs
                value={dashboardView}
                onValueChange={(value) =>
                  dispatch(setDashboardView(value as typeof dashboardView))
                }
              >
                <TabsList>
                  <TabsTrigger value="board">
                    <Columns3 className="size-4" />
                    Board
                  </TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="board" className="mt-4">
                  <ApplicationBoard
                    groupedApplications={viewModel.groupedApplications}
                    onMoveApplication={handleMoveApplication}
                  />
                </TabsContent>
                <TabsContent value="analytics" className="mt-4">
                  <AnalyticsCards
                    statusChartData={viewModel.statusChartData}
                    trendChartData={viewModel.trendChartData}
                  />
                </TabsContent>
              </Tabs>
              )}
            </CardContent>
          </Card>

          <aside className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s focus</CardTitle>
                <CardDescription>Highest impact actions for this week.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {(viewModel.todayFocus.length
                  ? viewModel.todayFocus
                  : ["Create your first application"]).map((item, index) => (
                  <div className="flex items-center gap-3" key={item}>
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      {index + 1}
                    </div>
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card id="analytics">
              <CardHeader>
                <CardTitle>Pipeline health</CardTitle>
                <CardDescription>Interview momentum and response quality.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Progress value={responseRate}>
                  <div className="flex w-full items-center justify-between text-sm">
                    <span>Goal progress</span>
                    <span className="text-muted-foreground">
                      {viewModel.metrics[4]?.value ?? "0%"}
                    </span>
                  </div>
                </Progress>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-muted-foreground">Avg. response</p>
                    <p className="mt-1 font-semibold">
                      {viewModel.applications.length ? "Tracked" : "No data"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-muted-foreground">High priority</p>
                    <p className="mt-1 font-semibold">
                      {
                        viewModel.applications.filter(
                          (application) => application.priority === "high"
                        ).length
                      } roles
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </AppShell>
  )
}
