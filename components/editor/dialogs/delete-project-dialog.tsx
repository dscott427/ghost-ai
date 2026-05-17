"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects";

interface DeleteProjectDialogProps {
  open: boolean;
  onClose: () => void;
  activeProject: Project | null;
  isLoading: boolean;
  onConfirm: () => void;
}

/** Destructive confirmation dialog for permanently deleting a project. */
export function DeleteProjectDialog({
  open,
  onClose,
  activeProject,
  isLoading,
  onConfirm,
}: DeleteProjectDialogProps) {
  if (!activeProject) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent showCloseButton={false} className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            This will permanently delete &quot;{activeProject.name}&quot;. This cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
