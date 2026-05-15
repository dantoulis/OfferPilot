"use client"

import { Moon, Sun } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { useAppTheme } from "@/lib/theme"

export const ThemeToggle = () => {
  const { theme, setTheme } = useAppTheme()
  const isDark = theme === "dark"

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        <span>{isDark ? "Dark" : "Light"}</span>
      </div>
      <Switch
        aria-label="Toggle dark mode"
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
  )
}
