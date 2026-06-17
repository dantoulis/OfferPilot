import { Badge } from "@/components/ui/badge"
import { statusLabels } from "@/features/applications/constants"
import type { ApplicationStatus } from "@/features/applications/types"
import { cn } from "@/lib/utils"

const statusClassName: Record<ApplicationStatus, string> = {
  saved: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  applied: "bg-primary/10 text-primary",
  in_review: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  interviewing: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  technical_test: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  offer: "bg-green-500/10 text-green-700 dark:text-green-300",
  rejected: "bg-destructive/10 text-destructive",
  withdrawn: "bg-muted text-muted-foreground",
  ghosted: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
}

export const StatusBadge = ({ status }: { status: ApplicationStatus }) => (
  <Badge className={cn("border-transparent", statusClassName[status])}>
    {statusLabels[status]}
  </Badge>
)
