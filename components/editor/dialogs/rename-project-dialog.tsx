"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects";

interface RenameProjectDialogProps {
  open: boolean;
  onClose: () => void;
  activeProject: Project | null;
  nameInput: string;
  setNameInput: (v: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

/** Dialog for renaming an existing project. Auto-focuses and prefills the current name. */
export function RenameProjectDialog({
  open,
  onClose,
  activeProject,
  nameInput,
  setNameInput,
  isLoading,
  onSubmit,
}: RenameProjectDialogProps) {
  if (!activeProject) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent showCloseButton={false} className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Renaming &quot;{activeProject.name}&quot;
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-copy-secondary" htmlFor="rename-input">
            New name
          </label>
          <Input
            id="rename-input"
            autoFocus
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && nameInput.trim()) onSubmit();
            }}
            className="text-foreground"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!nameInput.trim() || isLoading}
          >
            {isLoading ? "Renaming…" : "Rename"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
