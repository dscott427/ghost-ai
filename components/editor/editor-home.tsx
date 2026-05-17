"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditorHomeProps {
  /** Opens the Create Project dialog. */
  onNewProject: () => void;
}

/** Editor home screen — shown when no project is open. */
export function EditorHome({ onNewProject }: EditorHomeProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-copy-primary">
          Create a project or open an existing one
        </h2>
        <p className="mt-2 text-sm text-copy-muted">
          Start a new architecture workspace, or choose a project from the sidebar.
        </p>
      </div>
      <Button onClick={onNewProject} className="gap-2">
        <Plus className="h-5 w-5" />
        New Project
      </Button>
    </div>
  );
}
