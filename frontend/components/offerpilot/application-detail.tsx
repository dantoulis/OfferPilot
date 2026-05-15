export const ApplicationDetail = ({
  label,
  value,
}: {
  label: string
  value: string
}) => (
  <div className="rounded-lg bg-muted/50 p-4">
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {label}
    </p>
    <p className="mt-2 font-medium">{value}</p>
  </div>
)
