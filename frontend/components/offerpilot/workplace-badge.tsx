import { Badge } from "@/components/ui/badge"
import type { WorkplaceType } from "@/lib/mock-data"

const workplaceLabel: Record<WorkplaceType, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
}

export const WorkplaceBadge = ({
  workplaceType,
}: {
  workplaceType: WorkplaceType
}) => <Badge variant="outline">{workplaceLabel[workplaceType]}</Badge>
