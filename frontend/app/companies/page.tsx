import Link from "next/link"
import {
  ExternalLink,
  MoreHorizontal,
  Search,
} from "lucide-react"

import { AppShell } from "@/components/offerpilot/app-shell"
import { NewCompanyDialog } from "@/components/offerpilot/new-company-dialog"
import { StatusBadge } from "@/components/offerpilot/status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { applications, companies } from "@/lib/mock-data"

const CompaniesPage = () => {
  return (
    <AppShell>
      <div className="flex w-full max-w-none flex-col gap-6 px-3 py-6 sm:px-4 lg:px-5 xl:px-6">
        <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal sm:text-3xl">
              Companies
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Keep company notes, relationship context, and all related applications in
              one place. Logo/image support is reserved for the next iteration.
            </p>
          </div>
          <NewCompanyDialog />
        </section>

        <Card>
          <CardHeader className="gap-4 xl:flex xl:flex-row xl:items-center xl:justify-between">
            <div>
              <CardTitle>Company directory</CardTitle>
              <CardDescription>Search, sort, and inspect company activity.</CardDescription>
            </div>
            <div className="grid gap-2 sm:grid-cols-[minmax(220px,1fr)_auto_auto] xl:w-[620px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-2 size-4 text-muted-foreground" />
                <Input className="pl-8" placeholder="Search company or location" />
              </div>
              <Select defaultValue="active">
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active apps</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="updated">Recently updated</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Filters</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {companies.map((company) => {
                const related = applications.filter(
                  (application) => application.companyId === company.id
                )
                const topStatus = related[0]?.status ?? "saved"

                return (
                  <Card className="bg-background" key={company.id}>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-semibold text-primary">
                          {company.name.slice(0, 2)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="truncate">{company.name}</CardTitle>
                          <CardDescription>{company.location}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger render={<Button size="icon-sm" variant="ghost" />}>
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Company actions</span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit company</DropdownMenuItem>
                            <DropdownMenuItem>View applications</DropdownMenuItem>
                            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          {company.activeApplications} active
                        </Badge>
                        <StatusBadge status={topStatus} />
                      </div>
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {company.notes}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground">
                          Updated {company.lastActivity}
                        </span>
                        <Button
                          nativeButton={false}
                          render={<Link href={company.website} />}
                          size="sm"
                          variant="outline"
                        >
                          <ExternalLink className="size-3.5" />
                          Website
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company table</CardTitle>
            <CardDescription>Dense view for sorting and comparison.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Last activity</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.location}</TableCell>
                    <TableCell>{company.activeApplications}</TableCell>
                    <TableCell>{company.lastActivity}</TableCell>
                    <TableCell className="max-w-[340px] truncate text-muted-foreground">
                      {company.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}

export default CompaniesPage
