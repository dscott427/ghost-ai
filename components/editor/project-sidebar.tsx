"use client";

import Link from "next/link";
import { X, Plus, FolderOpen, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Project } from "@/lib/projects";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewProject: () => void;
  onRenameProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
  ownedProjects: Project[];
  sharedProjects: Project[];
  activeProjectId?: string;
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <FolderOpen className="h-8 w-8 text-copy-faint" />
      <p className="text-sm text-copy-muted">No {label} yet</p>
    </div>
  );
}

function ProjectItem({
  project,
  showActions,
  isActive,
  onRename,
  onDelete,
}: {
  project: Project;
  showActions: boolean;
  isActive: boolean;
  onRename: (p: Project) => void;
  onDelete: (p: Project) => void;
}) {
  return (
    <Link
      href={`/editor/${project.id}`}
      className={[
        "group flex items-center gap-2.5 rounded-lg px-2 py-2",
        isActive ? "bg-elevated" : "hover:bg-elevated",
      ].join(" ")}
    >
      <FolderOpen className={["h-4 w-4 shrink-0", isActive ? "text-brand" : "text-copy-muted"].join(" ")} />
      <span className={["flex-1 truncate text-sm font-medium", isActive ? "text-brand" : "text-copy-primary"].join(" ")}>
        {project.name}
      </span>
      {showActions && (
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
    </Link>
  );
}

export function ProjectSidebar({
  isOpen,
  onClose,
  onNewProject,
  onRenameProject,
  onDeleteProject,
  ownedProjects,
  sharedProjects,
  activeProjectId,
}: ProjectSidebarProps) {
  return (
    <>
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
          "fixed left-0 top-12 bottom-0 z-[49] flex w-72 flex-col",
          "border-r border-surface-border bg-surface/95 backdrop-blur-sm",
          "transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-12 items-center justify-between border-b border-surface-border px-4">
          <span className="text-sm font-medium text-copy-primary">Projects</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close sidebar"
            className="h-7 w-7 text-copy-muted hover:text-copy-primary"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

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
                      showActions
                      isActive={p.id === activeProjectId}
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
                      showActions={false}
                      isActive={p.id === activeProjectId}
                      onRename={onRenameProject}
                      onDelete={onDeleteProject}
                    />
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>

        <div className="border-t border-surface-border p-4">
          <Button
            onClick={onNewProject}
            className="w-full gap-2 rounded-xl bg-brand text-base hover:bg-brand/90"
          >
            <Plus className="h-5 w-5" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
