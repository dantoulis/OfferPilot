import { Label } from "@/components/ui/label"

export const ApplicationFormField = ({
  label,
  error,
  className,
  children,
}: {
  label: string
  error?: string
  className?: string
  children: React.ReactNode
}) => (
  <div className={className}>
    <Label className="mb-2 block">{label}</Label>
    {children}
    {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
  </div>
)
