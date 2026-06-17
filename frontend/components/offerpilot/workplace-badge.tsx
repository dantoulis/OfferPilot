import { Badge } from "@/components/ui/badge"
import { workplaceLabels } from "@/features/applications/constants"
import type { WorkplaceType } from "@/features/applications/types"

export const WorkplaceBadge = ({
  workplaceType,
}: {
  workplaceType: WorkplaceType | ""
}) => (
  <Badge variant="outline">
    {workplaceType ? workplaceLabels[workplaceType] : "Workplace not set"}
  </Badge>
)
