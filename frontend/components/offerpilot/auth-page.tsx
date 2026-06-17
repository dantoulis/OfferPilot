"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
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
import {
  useLoginMutation,
  useMeQuery,
  useRegisterMutation,
} from "@/features/auth/hooks"
import {
  loginSchema,
  registerSchema,
  type LoginFormValues,
  type RegisterFormValues,
} from "@/features/auth/schemas"
import { getApiErrorMessage } from "@/lib/api-client"

export const AuthPage = ({ mode }: { mode: "login" | "register" }) => {
  const isRegister = mode === "register"
  const router = useRouter()
  const meQuery = useMeQuery()
  const loginMutation = useLoginMutation()
  const registerMutation = useRegisterMutation()
  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      password: "",
      username: "",
    },
    resolver: zodResolver(loginSchema),
  })
  const registerForm = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    resolver: zodResolver(registerSchema),
  })
  const isSubmitting = loginMutation.isPending || registerMutation.isPending

  useEffect(() => {
    if (meQuery.isSuccess && !meQuery.isFetching) {
      router.replace("/")
    }
  }, [meQuery.isFetching, meQuery.isSuccess, router])

  const handleLogin = loginForm.handleSubmit(async (values) => {
    try {
      await loginMutation.mutateAsync(values)
      toast.success("Welcome back")
      router.push("/")
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not log in"))
    }
  })

  const handleRegister = registerForm.handleSubmit(async (values) => {
    try {
      await registerMutation.mutateAsync(values)
      toast.success("Account created")
      router.push("/")
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not create account"))
    }
  })

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

            <form
              className="grid gap-4"
              onSubmit={isRegister ? handleRegister : handleLogin}
            >
              {isRegister ? (
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="dante"
                    {...registerForm.register("username")}
                  />
                  {registerForm.formState.errors.username?.message ? (
                    <p className="text-xs text-destructive">
                      {registerForm.formState.errors.username.message}
                    </p>
                  ) : null}
                </div>
              ) : null}
              <div className="grid gap-2">
                <Label htmlFor={isRegister ? "email" : "login-username"}>
                  {isRegister ? "Email" : "Username or email"}
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-2.5 top-2 size-4 text-muted-foreground" />
                  <Input
                    id={isRegister ? "email" : "login-username"}
                    className="pl-8"
                    placeholder={isRegister ? "you@example.com" : "username or email"}
                    {...(isRegister
                      ? registerForm.register("email")
                      : loginForm.register("username"))}
                  />
                </div>
                {isRegister && registerForm.formState.errors.email?.message ? (
                  <p className="text-xs text-destructive">
                    {registerForm.formState.errors.email.message}
                  </p>
                ) : null}
                {!isRegister && loginForm.formState.errors.username?.message ? (
                  <p className="text-xs text-destructive">
                    {loginForm.formState.errors.username.message}
                  </p>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-2.5 top-2 size-4 text-muted-foreground" />
                  <Input
                    id="password"
                    className="pl-8"
                    type="password"
                    placeholder="********"
                    {...(isRegister
                      ? registerForm.register("password")
                      : loginForm.register("password"))}
                  />
                </div>
                {isRegister && registerForm.formState.errors.password?.message ? (
                  <p className="text-xs text-destructive">
                    {registerForm.formState.errors.password.message}
                  </p>
                ) : null}
                {!isRegister && loginForm.formState.errors.password?.message ? (
                  <p className="text-xs text-destructive">
                    {loginForm.formState.errors.password.message}
                  </p>
                ) : null}
              </div>
              <Button className="mt-2" disabled={isSubmitting} type="submit">
                {isRegister ? <UserPlus className="size-4" /> : <ArrowRight className="size-4" />}
                {isSubmitting
                  ? "Working..."
                  : isRegister
                    ? "Create account"
                    : "Login"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Auth uses HttpOnly JWT cookies, so tokens stay out of the browser runtime.
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
