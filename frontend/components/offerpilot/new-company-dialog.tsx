import { Building2, ImagePlus, Plus } from "lucide-react"

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

export const NewCompanyDialog = () => (
  <Dialog>
    <DialogTrigger render={<Button />}>
      <Plus className="size-4" />
      New company
    </DialogTrigger>
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Create company</DialogTitle>
        <DialogDescription>
          Company images will be added later. For now, initials reserve that visual space.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Name</Label>
          <Input placeholder="Company name" />
        </div>
        <div className="grid gap-2">
          <Label>Website</Label>
          <Input placeholder="https://company.com" />
        </div>
        <div className="grid gap-2">
          <Label>Location</Label>
          <Input placeholder="Remote, London, Berlin..." />
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
          <Textarea placeholder="Recruiter, culture, interview notes, company-specific reminders..." />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline">Save draft</Button>
        <Button>
          <Building2 className="size-4" />
          Save company
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
