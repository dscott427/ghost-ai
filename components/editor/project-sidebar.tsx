"use client";

import { X, Plus, FolderOpen, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MockProject } from "@/hooks/use-project-dialogs";

interface ProjectSidebarProps {
  /** Whether the sidebar is visible. */
  isOpen: boolean;
  /** Callback to close the sidebar. */
  onClose: () => void;
  /** Opens the Create Project dialog. */
  onNewProject: () => void;
  /** Opens the Rename dialog for the given project. */
  onRenameProject: (project: MockProject) => void;
  /** Opens the Delete dialog for the given project. */
  onDeleteProject: (project: MockProject) => void;
  /** Current in-memory project list from the hook. */
  projects: MockProject[];
}

/**
 * Placeholder shown inside a tab when there are no projects to display.
 */
function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <FolderOpen className="h-8 w-8 text-copy-faint" />
      <p className="text-sm text-copy-muted">No {label} yet</p>
    </div>
  );
}

/**
 * Single project row. Owned projects show rename and delete action buttons
 * on hover; shared/collaborator projects show no actions.
 */
function ProjectItem({
  project,
  onRename,
  onDelete,
}: {
  project: MockProject;
  onRename: (p: MockProject) => void;
  onDelete: (p: MockProject) => void;
}) {
  return (
    <div className="group flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-elevated">
      <FolderOpen className="h-4 w-4 shrink-0 text-copy-muted" />
      <span className="flex-1 truncate text-sm text-copy-primary">{project.name}</span>
      {project.owned && (
        <div className="ml-auto flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={(e) => {
              e.stopPropagation();
              onRename(project);
            }}
            aria-label={`Rename ${project.name}`}
            className="text-copy-muted hover:text-copy-primary"
          >
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project);
            }}
            aria-label={`Delete ${project.name}`}
            className="text-copy-muted hover:text-error"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}

/**
 * Floating project sidebar that slides in from the left without pushing canvas
 * content. Shows My Projects and Shared tabs with project items and actions.
 * On mobile a backdrop scrim is rendered behind the sidebar; tapping it closes it.
 */
export function ProjectSidebar({
  isOpen,
  onClose,
  onNewProject,
  onRenameProject,
  onDeleteProject,
  projects,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((p) => p.owned);
  const sharedProjects = projects.filter((p) => !p.owned);
  return (
    <>
      {/* Backdrop scrim — mobile only; closes sidebar on tap */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[48] bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={[
          "fixed left-0 top-0 z-[49] flex h-full w-72 flex-col",
          "border-r border-surface-border bg-surface/95 backdrop-blur-sm",
          "transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex h-12 items-center justify-between border-b border-surface-border px-4">
          <span className="text-sm font-medium text-copy-primary">Projects</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close sidebar"
            className="h-7 w-7 text-copy-muted hover:text-copy-primary"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="my-projects" className="flex flex-1 flex-col overflow-hidden">
          <TabsList className="mx-4 mt-3 w-auto justify-start rounded-xl bg-subtle">
            <TabsTrigger value="my-projects" className="rounded-lg text-xs">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="rounded-lg text-xs">
              Shared
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-projects" className="flex-1 overflow-y-auto px-2 py-2">
            {ownedProjects.length === 0 ? (
              <EmptyState label="projects" />
            ) : (
              <ul className="flex flex-col gap-0.5">
                {ownedProjects.map((p) => (
                  <li key={p.id}>
                    <ProjectItem
                      project={p}
                      onRename={onRenameProject}
                      onDelete={onDeleteProject}
                    />
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent value="shared" className="flex-1 overflow-y-auto px-2 py-2">
            {sharedProjects.length === 0 ? (
              <EmptyState label="shared projects" />
            ) : (
              <ul className="flex flex-col gap-0.5">
                {sharedProjects.map((p) => (
                  <li key={p.id}>
                    <ProjectItem
                      project={p}
                      onRename={onRenameProject}
                      onDelete={onDeleteProject}
                    />
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="border-t border-surface-border p-4">
          <Button
            onClick={onNewProject}
            className="w-full gap-2 rounded-xl bg-brand text-base hover:bg-brand/90"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
