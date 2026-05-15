export const ApplicationNextAction = ({
  icon,
  text,
}: {
  icon: React.ReactNode
  text: string
}) => (
  <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
    <div className="text-primary">{icon}</div>
    <span>{text}</span>
  </div>
)
