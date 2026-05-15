import { Label } from "@/components/ui/label"

export const ApplicationFormField = ({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) => (
  <div className={className}>
    <Label className="mb-2 block">{label}</Label>
    {children}
  </div>
)
