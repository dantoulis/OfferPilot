"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Building2, ImagePlus, Pencil, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  toCompanyFormValues,
  toCompanyPayload,
} from "@/features/companies/mappers"
import { companyFormSchema } from "@/features/companies/schemas"
import type { Company, CompanyFormValues } from "@/features/companies/types"
import {
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
} from "@/features/companies/hooks"
import { getApiErrorMessage } from "@/lib/api-client"

export const NewCompanyDialog = ({
  company,
  label = "New company",
}: {
  company?: Company
  label?: string
}) => {
  const [open, setOpen] = useState(false)
  const createMutation = useCreateCompanyMutation()
  const updateMutation = useUpdateCompanyMutation()
  const form = useForm<CompanyFormValues>({
    defaultValues: toCompanyFormValues(company),
    resolver: zodResolver(companyFormSchema),
  })
  const isEditing = Boolean(company)
  const isSaving = createMutation.isPending || updateMutation.isPending

  useEffect(() => {
    if (open) {
      form.reset(toCompanyFormValues(company))
    }
  }, [company, form, open])

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const payload = toCompanyPayload(values)

      if (company) {
        await updateMutation.mutateAsync({
          id: company.id,
          payload,
        })
        toast.success("Company updated")
      } else {
        await createMutation.mutateAsync(payload)
        toast.success("Company created")
      }

      setOpen(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not save company"))
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button size={isEditing ? "sm" : "default"} variant={isEditing ? "outline" : "default"} />}
      >
        {isEditing ? <Pencil className="size-4" /> : <Plus className="size-4" />}
        {label}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit company" : "Create company"}</DialogTitle>
            <DialogDescription>
              Company images will be added later. For now, initials reserve that visual space.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input placeholder="Company name" {...form.register("name")} />
              {form.formState.errors.name?.message ? (
                <p className="text-xs text-destructive">
                  {form.formState.errors.name.message}
                </p>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label>Website</Label>
              <Input placeholder="https://company.com" {...form.register("website")} />
              {form.formState.errors.website?.message ? (
                <p className="text-xs text-destructive">
                  {form.formState.errors.website.message}
                </p>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label>Location</Label>
              <Input
                placeholder="Remote, London, Berlin..."
                {...form.register("location")}
              />
            </div>
            <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
              <div className="mb-2 flex items-center gap-2 text-foreground">
                <ImagePlus className="size-4" />
                Future company image
              </div>
              This area is intentionally reserved so logo/photo support slots in cleanly.
            </div>
            <div className="grid gap-2">
              <Label>Notes</Label>
              <Textarea
                placeholder="Recruiter, culture, interview notes, company-specific reminders..."
                {...form.register("notes")}
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
              <Building2 className="size-4" />
              {isSaving ? "Saving..." : "Save company"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
