import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { statusChartData, trendChartData } from "@/lib/mock-data"

const statusConfig = {
  count: {
    label: "Applications",
    color: "var(--primary)",
  },
} satisfies ChartConfig

const trendConfig = {
  applications: {
    label: "Applications",
    color: "var(--primary)",
  },
  interviews: {
    label: "Interviews",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export const AnalyticsCards = () => (
  <div className="grid gap-4 xl:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>Status distribution</CardTitle>
        <CardDescription>Where the current pipeline sits.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[260px] w-full" config={statusConfig}>
          <BarChart data={statusChartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="status" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={28} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-count)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Weekly momentum</CardTitle>
        <CardDescription>Applications and interviews over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[260px] w-full" config={trendConfig}>
          <LineChart data={trendChartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="week" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={28} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="applications"
              stroke="var(--color-applications)"
              strokeWidth={2}
              type="monotone"
            />
            <Line
              dataKey="interviews"
              stroke="var(--color-interviews)"
              strokeWidth={2}
              type="monotone"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  </div>
)
