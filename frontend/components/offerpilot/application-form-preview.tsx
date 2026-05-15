"use client"

import { Plus, Save } from "lucide-react"

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
import { Textarea } from "@/components/ui/textarea"

export const ApplicationFormPreview = ({
  label = "New application",
}: {
  label?: string
}) => {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <Plus className="size-4" />
        {label}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Application details</DialogTitle>
          <DialogDescription>
            This preview mirrors the backend fields. We will wire save behavior to the API next.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <ApplicationFormField label="Job title">
            <Input placeholder="Senior React Engineer" />
          </ApplicationFormField>
          <ApplicationFormField label="Company">
            <Input placeholder="Spotify" />
          </ApplicationFormField>
          <ApplicationFormField label="Job URL">
            <Input placeholder="https://..." />
          </ApplicationFormField>
          <ApplicationFormField label="Location">
            <Input placeholder="Berlin, Germany" />
          </ApplicationFormField>
          <ApplicationFormField label="Workplace">
            <Select defaultValue="hybrid">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
              </SelectContent>
            </Select>
          </ApplicationFormField>
          <ApplicationFormField label="Status">
            <Select defaultValue="applied">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="saved">Saved</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="technical_test">Technical Test</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
              </SelectContent>
            </Select>
          </ApplicationFormField>
          <ApplicationFormField label="Salary min">
            <Input placeholder="90000" type="number" />
          </ApplicationFormField>
          <ApplicationFormField label="Salary max">
            <Input placeholder="110000" type="number" />
          </ApplicationFormField>
          <ApplicationFormField label="Date applied">
            <Input type="date" />
          </ApplicationFormField>
          <ApplicationFormField label="Deadline">
            <Input type="date" />
          </ApplicationFormField>
          <ApplicationFormField className="sm:col-span-2" label="Description">
            <Textarea placeholder="What makes this role relevant?" />
          </ApplicationFormField>
          <ApplicationFormField className="sm:col-span-2" label="Private notes">
            <Textarea placeholder="Prep notes, recruiter context, follow-up reminders..." />
          </ApplicationFormField>
        </div>
        <DialogFooter>
          <Button variant="outline">Save draft</Button>
          <Button>
            <Save className="size-4" />
            Save application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
