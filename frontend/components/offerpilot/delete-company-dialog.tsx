"use client"

import { Trash2 } from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useDeleteCompanyMutation } from "@/features/companies/hooks"
import { getApiErrorMessage } from "@/lib/api-client"

export const DeleteCompanyDialog = ({
  companyId,
  companyName,
}: {
  companyId: string
  companyName: string
}) => {
  const deleteMutation = useDeleteCompanyMutation()

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(companyId)
      toast.success("Company deleted")
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not delete company"))
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button size="sm" variant="destructive" />}>
        <Trash2 className="size-4" />
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this company?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes {companyName}. Existing applications will keep running with no company attached.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteMutation.isPending}
            variant="destructive"
            onClick={handleDelete}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete company"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
