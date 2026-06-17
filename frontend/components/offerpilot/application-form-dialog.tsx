"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Pencil, Plus, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { ApplicationFormField } from "@/components/offerpilot/application-form-field"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  priorityLabels,
  statusLabels,
  statusOrder,
  workplaceLabels,
} from "@/features/applications/constants"
import {
  toApplicationFormValues,
  toApplicationPayload,
} from "@/features/applications/mappers"
import { applicationFormSchema } from "@/features/applications/schemas"
import type {
  ApplicationFormValues,
  JobApplication,
} from "@/features/applications/types"
import {
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
} from "@/features/applications/hooks"
import { useCompaniesQuery } from "@/features/companies/hooks"
import { getApiErrorMessage } from "@/lib/api-client"

export const ApplicationFormDialog = ({
  application,
  label = "New application",
}: {
  application?: JobApplication
  label?: string
}) => {
  const [open, setOpen] = useState(false)
  const companiesQuery = useCompaniesQuery()
  const createMutation = useCreateApplicationMutation()
  const updateMutation = useUpdateApplicationMutation()
  const form = useForm<ApplicationFormValues>({
    defaultValues: toApplicationFormValues(application),
    resolver: zodResolver(applicationFormSchema),
  })
  const isEditing = Boolean(application)
  const isSaving = createMutation.isPending || updateMutation.isPending

  useEffect(() => {
    if (open) {
      form.reset(toApplicationFormValues(application))
    }
  }, [application, form, open])

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const payload = toApplicationPayload(values)

      if (application) {
        await updateMutation.mutateAsync({
          id: application.id,
          payload,
        })
        toast.success("Application updated")
      } else {
        await createMutation.mutateAsync(payload)
        toast.success("Application created")
      }

      setOpen(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not save application"))
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant={isEditing ? "outline" : "default"} />}
      >
        {isEditing ? <Pencil className="size-4" /> : <Plus className="size-4" />}
        {label}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit application" : "Create application"}</DialogTitle>
            <DialogDescription>
              Track the role, company, status, dates, salary, and notes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 sm:grid-cols-2">
            <ApplicationFormField
              error={form.formState.errors.title?.message}
              label="Job title"
            >
              <Input placeholder="Senior React Engineer" {...form.register("title")} />
            </ApplicationFormField>
            <ApplicationFormField label="Company">
              <Controller
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No company</SelectItem>
                      {(companiesQuery.data ?? []).map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </ApplicationFormField>
            <ApplicationFormField
              error={form.formState.errors.jobUrl?.message}
              label="Job URL"
            >
              <Input placeholder="https://..." {...form.register("jobUrl")} />
            </ApplicationFormField>
            <ApplicationFormField label="Location">
              <Input placeholder="Berlin, Germany" {...form.register("location")} />
            </ApplicationFormField>
            <ApplicationFormField label="Workplace">
              <Controller
                control={form.control}
                name="workplaceType"
                render={({ field }) => (
                  <Select
                    value={field.value || "none"}
                    onValueChange={(value) => field.onChange(value === "none" ? "" : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Not set</SelectItem>
                      {Object.entries(workplaceLabels).map(([value, optionLabel]) => (
                        <SelectItem key={value} value={value}>
                          {optionLabel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </ApplicationFormField>
            <ApplicationFormField label="Status">
              <Controller
                control={form.control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOrder.map((status) => (
                        <SelectItem key={status} value={status}>
                          {statusLabels[status]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </ApplicationFormField>
            <ApplicationFormField label="Priority">
              <Controller
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(priorityLabels).map(([value, optionLabel]) => (
                        <SelectItem key={value} value={value}>
                          {optionLabel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </ApplicationFormField>
            <ApplicationFormField label="Currency">
              <Controller
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </ApplicationFormField>
            <ApplicationFormField
              error={form.formState.errors.salaryMin?.message}
              label="Salary min"
            >
              <Input placeholder="90000" type="number" {...form.register("salaryMin")} />
            </ApplicationFormField>
            <ApplicationFormField
              error={form.formState.errors.salaryMax?.message}
              label="Salary max"
            >
              <Input placeholder="110000" type="number" {...form.register("salaryMax")} />
            </ApplicationFormField>
            <ApplicationFormField label="Date applied">
              <Input type="date" {...form.register("dateApplied")} />
            </ApplicationFormField>
            <ApplicationFormField label="Deadline">
              <Input type="date" {...form.register("deadline")} />
            </ApplicationFormField>
            <ApplicationFormField className="sm:col-span-2" label="Description">
              <Textarea
                placeholder="What makes this role relevant?"
                {...form.register("description")}
              />
            </ApplicationFormField>
            <ApplicationFormField className="sm:col-span-2" label="Private notes">
              <Textarea
                placeholder="Prep notes, recruiter context, follow-up reminders..."
                {...form.register("notes")}
              />
            </ApplicationFormField>
            <div className="flex items-center justify-between rounded-lg border bg-muted/40 p-3 sm:col-span-2">
              <div>
                <p className="text-sm font-medium">Active application</p>
                <p className="text-xs text-muted-foreground">
                  Inactive applications are hidden from active dashboards.
                </p>
              </div>
              <Controller
                control={form.control}
                name="active"
                render={({ field }) => (
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={isSaving}
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button disabled={isSaving} type="submit">
              <Save className="size-4" />
              {isSaving ? "Saving..." : "Save application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
