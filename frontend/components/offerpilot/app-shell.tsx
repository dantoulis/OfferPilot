"use client"

import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import {
  Bell,
  Menu,
} from "lucide-react"
import { toast } from "sonner"

import { SidebarContent } from "@/components/offerpilot/sidebar-content"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { authKeys } from "@/features/auth/api"
import { useLogoutMutation, useMeQuery } from "@/features/auth/hooks"
import { getApiErrorMessage } from "@/lib/api-client"

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()
  const queryClient = useQueryClient()
  const meQuery = useMeQuery()
  const logoutMutation = useLogoutMutation()
  const user = meQuery.data

  useEffect(() => {
    if (meQuery.isError) {
      queryClient.removeQueries({ queryKey: authKeys.me })
      router.replace("/login")
    }
  }, [meQuery.isError, queryClient, router])

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      router.push("/login")
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not log out"))
    }
  }

  if (meQuery.isLoading || meQuery.isError) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-foreground">
        <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground shadow-sm">
          {meQuery.isError ? "Redirecting to login..." : "Loading OfferPilot..."}
        </div>
      </div>
    )
  }

  return (
    <div className="app-surface min-h-screen text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex lg:flex-col">
        <SidebarContent pathname={pathname} user={user} onLogout={handleLogout} />
      </aside>
      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur lg:ml-64 lg:px-8">
        <Sheet>
          <SheetTrigger render={<Button className="lg:hidden" size="icon" variant="outline" />}>
            <Menu className="size-4" />
            <span className="sr-only">Open navigation</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-sidebar p-0 text-sidebar-foreground" showCloseButton={false}>
            <SheetHeader className="sr-only">
              <SheetTitle>OfferPilot navigation</SheetTitle>
            </SheetHeader>
            <SidebarContent pathname={pathname} user={user} onLogout={handleLogout} />
          </SheetContent>
        </Sheet>
        <h1 className="min-w-0 flex-1 truncate text-base font-semibold sm:text-lg">
          OfferPilot
        </h1>
        <Tooltip>
          <TooltipTrigger render={<Button size="icon" variant="outline" />}>
            <Bell className="size-4" />
            <span className="sr-only">Notifications</span>
          </TooltipTrigger>
          <TooltipContent>Follow-ups and deadline alerts</TooltipContent>
        </Tooltip>
        <Avatar>
          <AvatarFallback>
            {(user?.username || user?.email || "OP").slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </header>
      <main className="lg:ml-64">{children}</main>
    </div>
  )
}
