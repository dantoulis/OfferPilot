"use client"

import Link from "next/link"
import {
  ExternalLink,
  Search,
} from "lucide-react"

import { AppShell } from "@/components/offerpilot/app-shell"
import { DeleteCompanyDialog } from "@/components/offerpilot/delete-company-dialog"
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
import { companySortLabels } from "@/features/companies/constants"
import { useCompaniesViewModel } from "@/features/companies/hooks"
import { useAppDispatch } from "@/store/hooks"
import { setCompanySearch, setCompanySort } from "@/store/ui-slice"

const CompaniesPage = () => {
  const dispatch = useAppDispatch()
  const viewModel = useCompaniesViewModel()

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
              <CardDescription>Search, sort, edit, and inspect company activity.</CardDescription>
            </div>
            <div className="grid gap-2 sm:grid-cols-[minmax(220px,1fr)_auto] xl:w-[620px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-2 size-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="Search company or location"
                  value={viewModel.query}
                  onChange={(event) => dispatch(setCompanySearch(event.target.value))}
                />
              </div>
              <Select
                value={viewModel.sort}
                onValueChange={(value) =>
                  dispatch(setCompanySort(value as typeof viewModel.sort))
                }
              >
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(companySortLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {viewModel.isLoading ? (
              <div className="rounded-xl border border-dashed p-8 text-sm text-muted-foreground">
                Loading companies...
              </div>
            ) : viewModel.isError ? (
              <div className="rounded-xl border border-dashed p-8 text-sm text-destructive">
                Could not load companies.
              </div>
            ) : viewModel.companies.length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-sm text-muted-foreground">
                No companies match the current filters.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {viewModel.companies.map((company) => (
                  <Card className="bg-background" key={company.id}>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-semibold text-primary">
                          {company.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="truncate">{company.name}</CardTitle>
                          <CardDescription>{company.location || "No location"}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          {company.activeApplications} active
                        </Badge>
                        <StatusBadge status={company.topStatus} />
                      </div>
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {company.notes || "No notes yet."}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground">
                          Updated {company.lastActivity}
                        </span>
                        <div className="flex gap-2">
                          <NewCompanyDialog company={company} label="Edit" />
                          {company.website ? (
                            <Button
                              nativeButton={false}
                              render={<Link href={company.website} />}
                              size="sm"
                              variant="outline"
                            >
                              <ExternalLink className="size-3.5" />
                              Website
                            </Button>
                          ) : null}
                          <DeleteCompanyDialog
                            companyId={company.id}
                            companyName={company.name}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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
                {viewModel.companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.location || "No location"}</TableCell>
                    <TableCell>{company.activeApplications}</TableCell>
                    <TableCell>{company.lastActivity}</TableCell>
                    <TableCell className="max-w-[340px] truncate text-muted-foreground">
                      {company.notes || "No notes yet."}
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
