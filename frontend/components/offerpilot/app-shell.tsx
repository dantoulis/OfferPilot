"use client"

import { usePathname } from "next/navigation"
import {
  Bell,
  Menu,
} from "lucide-react"

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

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <div className="app-surface min-h-screen text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-card lg:flex lg:flex-col">
        <SidebarContent pathname={pathname} />
      </aside>
      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur lg:ml-64 lg:px-8">
        <Sheet>
          <SheetTrigger render={<Button className="lg:hidden" size="icon" variant="outline" />}>
            <Menu className="size-4" />
            <span className="sr-only">Open navigation</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0" showCloseButton={false}>
            <SheetHeader className="sr-only">
              <SheetTitle>OfferPilot navigation</SheetTitle>
            </SheetHeader>
            <SidebarContent pathname={pathname} />
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
          <AvatarFallback>DA</AvatarFallback>
        </Avatar>
      </header>
      <main className="lg:ml-64">{children}</main>
    </div>
  )
}
