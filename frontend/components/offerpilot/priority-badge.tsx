import { Badge } from "@/components/ui/badge"
import type { Priority } from "@/features/applications/types"
import { cn } from "@/lib/utils"

const priorityClassName: Record<Priority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  high: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
}

export const PriorityBadge = ({ priority }: { priority: Priority }) => (
  <Badge className={cn("border-transparent capitalize", priorityClassName[priority])}>
    {priority}
  </Badge>
)
