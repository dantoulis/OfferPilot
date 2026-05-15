import { Bell, Palette, ShieldCheck, UserRound } from "lucide-react"

import { AppShell } from "@/components/offerpilot/app-shell"
import { ThemeToggle } from "@/components/offerpilot/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const SettingsPage = () => (
  <AppShell>
      <div className="flex w-full max-w-none flex-col gap-6 px-3 py-6 sm:px-4 lg:px-5 xl:px-6">
        <section>
          <p className="text-sm text-muted-foreground">Workspace preferences</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
            Settings
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Control the look and behavior of OfferPilot without depending on system
            appearance.
          </p>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="size-5 text-primary" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Manual light/dark mode. System mode stays ignored by design.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <ThemeToggle />
                <Separator />
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl border bg-background p-4">
                    <p className="font-medium">Light workspace</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Soft mint surfaces with teal actions.
                    </p>
                  </div>
                  <div className="rounded-xl border bg-background p-4">
                    <p className="font-medium">Dark workspace</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Low-glare green-black with brighter accents.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="size-5 text-primary" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Preview controls for deadlines, interviews, and follow-ups.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {[
                  ["Deadline reminders", "Warn me before application deadlines."],
                  ["Interview prep nudges", "Surface prep notes before an interview."],
                  ["Follow-up reminders", "Prompt me when an application goes quiet."],
                ].map(([title, description]) => (
                  <div className="flex items-center justify-between gap-4" key={title}>
                    <div>
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <aside className="grid gap-6 self-start">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserRound className="size-5 text-primary" />
                  Profile
                </CardTitle>
                <CardDescription>Display information for the app shell.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Name</Label>
                  <Input defaultValue="Dante" />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input defaultValue="dante@example.com" />
                </div>
                <Button>Save profile</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-primary" />
                  Security
                </CardTitle>
                <CardDescription>
                  Auth uses HttpOnly JWT cookies on the backend.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Logout all sessions
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
  </AppShell>
)

export default SettingsPage
