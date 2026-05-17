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

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  nameInput: string;
  setNameInput: (v: string) => void;
  slug: string;
  isLoading: boolean;
  onSubmit: () => void;
}

/** Dialog for creating a new project with a live slug preview. */
export function CreateProjectDialog({
  open,
  onClose,
  nameInput,
  setNameInput,
  slug,
  isLoading,
  onSubmit,
}: CreateProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent showCloseButton={false} className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Give your architecture workspace a name.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-copy-secondary" htmlFor="project-name">
            Project name
          </label>
          <Input
            id="project-name"
            autoFocus
            placeholder="e.g. My Architecture"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && nameInput.trim()) onSubmit();
            }}
            className="text-foreground"
          />
          {nameInput && (
            <p className="text-xs text-copy-muted">
              Slug:{" "}
              <span className="font-mono text-copy-secondary">{slug}</span>
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!nameInput.trim() || isLoading}
          >
            {isLoading ? "Creating…" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
