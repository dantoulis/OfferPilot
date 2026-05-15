import type { LucideIcon } from "lucide-react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type MetricCardProps = {
  title: string
  value: string
  detail: string
  icon: LucideIcon
  tone?: "default" | "green" | "amber" | "blue" | "red"
}

const toneClassName: Record<NonNullable<MetricCardProps["tone"]>, string> = {
  default: "bg-primary/10 text-primary",
  green: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  blue: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  red: "bg-destructive/10 text-destructive",
}

export const MetricCard = ({
  title,
  value,
  detail,
  icon: Icon,
  tone = "default",
}: MetricCardProps) => (
  <Card>
    <CardHeader>
      <div>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="mt-1 text-2xl font-semibold tracking-normal">
          {value}
        </CardTitle>
      </div>
      <CardAction>
        <div className={cn("rounded-lg p-2", toneClassName[tone])}>
          <Icon className="size-4" />
        </div>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p className="text-xs text-muted-foreground">{detail}</p>
    </CardContent>
  </Card>
)
