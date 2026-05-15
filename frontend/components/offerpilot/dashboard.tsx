"use client"

import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Columns3,
  Filter,
  ListFilter,
  Search,
  TrendingUp,
} from "lucide-react"

import { AnalyticsCards } from "@/components/offerpilot/analytics-cards"
import { ApplicationFormPreview } from "@/components/offerpilot/application-form-preview"
import { ApplicationBoard } from "@/components/offerpilot/application-board"
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
import {
  applications,
} from "@/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export const Dashboard = () => {
  const activeApplications = applications.filter((item) => item.active)
  const interviews = applications.filter((item) =>
    ["interviewing", "technical_test"].includes(item.status)
  )
  const offers = applications.filter((item) => item.status === "offer")
  const deadlines = applications.filter((item) => item.deadline)

  return (
    <AppShell>
      <div className="flex w-full max-w-none flex-col gap-6 px-3 py-6 sm:px-4 lg:px-5 xl:px-6">
        <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <Badge variant="outline" className="mb-3">
              Dashboard + board hybrid
            </Badge>
            <h2 className="text-2xl font-semibold tracking-normal sm:text-3xl">
              Good morning, Dante
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Track every opportunity, spot the next action, and keep your job
              search moving without living inside a spreadsheet.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline">
              <Filter className="size-4" />
              Saved filters
            </Button>
            <ApplicationFormPreview />
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <MetricCard
            detail="8 currently in review"
            icon={Briefcase}
            title="Active applications"
            value={String(activeApplications.length)}
          />
          <MetricCard
            detail="2 need prep this week"
            icon={CalendarDays}
            title="Interviews"
            tone="amber"
            value={String(interviews.length)}
          />
          <MetricCard
            detail="1 response due soon"
            icon={CheckCircle2}
            title="Offers"
            tone="green"
            value={String(offers.length)}
          />
          <MetricCard
            detail="Deadlines in next 7 days"
            icon={Clock3}
            title="Deadlines"
            tone="red"
            value={String(deadlines.length)}
          />
          <MetricCard
            detail="+6% from last month"
            icon={TrendingUp}
            title="Response rate"
            tone="blue"
            value="38%"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <Card className="min-w-0">
            <CardHeader className="gap-4 xl:flex xl:flex-row xl:items-center xl:justify-between">
              <div>
                <CardTitle>Application workspace</CardTitle>
                <CardDescription>
                  Switch between a visual board, sortable table, and quick analytics.
                </CardDescription>
              </div>
              <div className="grid gap-2 sm:grid-cols-[minmax(220px,1fr)_auto_auto_auto] xl:w-[760px]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-2 size-4 text-muted-foreground" />
                  <Input className="pl-8" placeholder="Search roles, companies, locations" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="deadline">Deadline soon</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="priority">
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <ListFilter className="size-4" />
                  More
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="board">
                <TabsList>
                  <TabsTrigger value="board">
                    <Columns3 className="size-4" />
                    Board
                  </TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="board" className="mt-4">
                  <ApplicationBoard />
                </TabsContent>
                <TabsContent value="analytics" className="mt-4">
                  <AnalyticsCards />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <aside className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s focus</CardTitle>
                <CardDescription>Highest impact actions for this week.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {[
                  "Prepare Spotify interview notes",
                  "Respond to Wise offer by deadline",
                  "Follow up with GitLab recruiter",
                ].map((item, index) => (
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
                <Progress value={62}>
                  <div className="flex w-full items-center justify-between text-sm">
                    <span>Goal progress</span>
                    <span className="text-muted-foreground">62%</span>
                  </div>
                </Progress>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-muted-foreground">Avg. response</p>
                    <p className="mt-1 font-semibold">4.2 days</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-muted-foreground">High priority</p>
                    <p className="mt-1 font-semibold">6 roles</p>
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
