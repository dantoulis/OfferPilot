import Link from "next/link"
import { ArrowRight, Briefcase, CheckCircle2, Lock, Mail, UserPlus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const AuthPage = ({ mode }: { mode: "login" | "register" }) => {
  const isRegister = mode === "register"

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[0.95fr_1.05fr]">
      <section className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground text-sm font-semibold text-primary">
            OP
          </div>
          <div>
            <p className="font-semibold">OfferPilot</p>
            <p className="text-sm text-primary-foreground/75">
              Job search command center
            </p>
          </div>
        </div>
        <div className="my-auto max-w-xl">
          <Badge className="mb-6 bg-primary-foreground/15 text-primary-foreground">
            Designed for the whole journey
          </Badge>
          <h1 className="text-4xl font-semibold tracking-normal xl:text-5xl">
            Make every job application easier to understand and act on.
          </h1>
          <p className="mt-6 text-lg leading-8 text-primary-foreground/80">
            Track companies, deadlines, interviews, offers, and follow-ups in a
            calm workspace built for repeated daily use.
          </p>
          <div className="mt-10 grid gap-3">
            {[
              "Dashboard + board hybrid for overview and action",
              "Separate application details for full context",
              "Company pages ready for future images and relationship history",
            ].map((item) => (
              <div className="flex items-center gap-3" key={item}>
                <CheckCircle2 className="size-5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-8 lg:px-12">
        <Card className="w-full max-w-xl py-6">
          <CardHeader>
            <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary lg:hidden">
              <Briefcase className="size-5" />
            </div>
            <CardTitle className="text-2xl">
              {isRegister ? "Create your account" : "Welcome back"}
            </CardTitle>
            <CardDescription>
              {isRegister
                ? "Start organizing your search with a clean application pipeline."
                : "Login to continue tracking your job search pipeline."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={mode} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger nativeButton={false} render={<Link href="/login" />} value="login">
                  Login
                </TabsTrigger>
                <TabsTrigger nativeButton={false} render={<Link href="/register" />} value="register">
                  Register
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form className="grid gap-4">
              {isRegister ? (
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="dante" />
                </div>
              ) : null}
              <div className="grid gap-2">
                <Label htmlFor="email">{isRegister ? "Email" : "Email or username"}</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-2.5 top-2 size-4 text-muted-foreground" />
                  <Input id="email" className="pl-8" placeholder="dante@example.com" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-2.5 top-2 size-4 text-muted-foreground" />
                  <Input id="password" className="pl-8" type="password" placeholder="********" />
                </div>
              </div>
              <Button className="mt-2" nativeButton={false} render={<Link href="/" />}>
                {isRegister ? <UserPlus className="size-4" /> : <ArrowRight className="size-4" />}
                {isRegister ? "Create account" : "Login"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Auth API wiring will use HttpOnly JWT cookies with credentials included.
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
