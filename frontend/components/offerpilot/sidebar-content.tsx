"use client"

import Link from "next/link"
import {
  BarChart3,
  Briefcase,
  Building2,
  Home,
  LogOut,
  Settings,
} from "lucide-react"

import { ThemeToggle } from "@/components/offerpilot/theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { User } from "@/features/auth/types"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/applications", label: "Applications", icon: Briefcase },
  { href: "/companies", label: "Companies", icon: Building2 },
  { href: "/#analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
]

const getInitials = (user?: User) => {
  const source = user?.username || user?.email || "OfferPilot"
  return source.slice(0, 2).toUpperCase()
}

export const SidebarContent = ({
  pathname,
  user,
  onLogout,
}: {
  pathname: string
  user?: User
  onLogout?: () => void
}) => (
  <div className="flex h-full flex-col p-4">
    <Link className="mb-8 flex items-center gap-3 rounded-lg px-2 py-2" href="/">
      <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
        OP
      </div>
      <div>
        <p className="font-semibold">OfferPilot</p>
        <p className="text-xs text-sidebar-foreground/65">Find the right role</p>
      </div>
    </Link>
    <nav className="grid gap-1">
      {navItems.map((item) => {
        const Icon = item.icon
        const route = item.href.split("#")[0]
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : route !== "/" && pathname.startsWith(route)

        return (
          <Link
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-all hover:translate-x-0.5 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive &&
                "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm ring-1 ring-sidebar-border"
            )}
            href={item.href}
            key={item.href}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        )
      })}
    </nav>
    <div className="mt-auto grid gap-4">
      <ThemeToggle />
      <Separator />
      <div className="flex items-center gap-3 px-2">
        <Avatar size="sm">
          <AvatarFallback>{getInitials(user)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">
            {user?.username ?? "Account"}
          </p>
          <p className="truncate text-xs text-sidebar-foreground/65">
            {user?.email ?? "Signed in"}
          </p>
        </div>
        <Button size="icon-sm" variant="ghost" onClick={onLogout}>
          <LogOut className="size-4" />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </div>
  </div>
)
