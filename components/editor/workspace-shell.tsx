"use client";

import { useState } from "react";
import { WorkspaceNavbar } from "./workspace-navbar";
import { ProjectSidebar } from "./project-sidebar";
import { CreateProjectDialog } from "./dialogs/create-project-dialog";
import { RenameProjectDialog } from "./dialogs/rename-project-dialog";
import { DeleteProjectDialog } from "./dialogs/delete-project-dialog";
import { ShareDialog } from "./dialogs/share-dialog";
import { useProjectActions } from "@/hooks/use-project-actions";
import { CanvasWrapper } from "./canvas/canvas-wrapper";
import type { Project } from "@/lib/projects";

interface WorkspaceShellProps {
  project: Project;
  ownedProjects: Project[];
  sharedProjects: Project[];
  isOwner: boolean;
}

export function WorkspaceShell({ project, ownedProjects, sharedProjects, isOwner }: WorkspaceShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const actions = useProjectActions();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-base">
      <WorkspaceNavbar
        projectName={project.name}
        isSidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen((o) => !o)}
        isAiSidebarOpen={aiSidebarOpen}
        onAiSidebarToggle={() => setAiSidebarOpen((o) => !o)}
        onShareClick={() => setShareOpen(true)}
      />

      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewProject={actions.openCreate}
        onRenameProject={actions.openRename}
        onDeleteProject={actions.openDelete}
        ownedProjects={ownedProjects}
        sharedProjects={sharedProjects}
        activeProjectId={project.id}
      />

      <main className="flex flex-1 overflow-hidden pt-12">
        <div className="flex flex-1 overflow-hidden">
          <CanvasWrapper roomId={project.id} />
        </div>

        <aside
          aria-hidden={!aiSidebarOpen}
          inert={!aiSidebarOpen}
          className={[
            "fixed right-0 top-12 bottom-0 z-[49] flex w-80 flex-col",
            "border-l border-surface-border bg-surface/95 backdrop-blur-sm",
            "transition-transform duration-200 ease-in-out",
            aiSidebarOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="flex h-12 items-center border-b border-surface-border px-4">
            <span className="text-sm font-medium text-copy-primary">AI Assistant</span>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-copy-muted">AI chat coming soon</p>
          </div>
        </aside>
      </main>

      <CreateProjectDialog
        open={actions.openDialog === "create"}
        onClose={actions.closeDialog}
        nameInput={actions.nameInput}
        setNameInput={actions.setNameInput}
        slug={actions.slug}
        isLoading={actions.isLoading}
        onSubmit={actions.handleSubmit}
      />
      <RenameProjectDialog
        open={actions.openDialog === "rename"}
        onClose={actions.closeDialog}
        activeProject={actions.activeProject}
        nameInput={actions.nameInput}
        setNameInput={actions.setNameInput}
        isLoading={actions.isLoading}
        onSubmit={actions.handleSubmit}
      />
      <DeleteProjectDialog
        open={actions.openDialog === "delete"}
        onClose={actions.closeDialog}
        activeProject={actions.activeProject}
        isLoading={actions.isLoading}
        onConfirm={actions.handleSubmit}
      />
      <ShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        projectId={project.id}
        projectName={project.name}
        isOwner={isOwner}
      />
    </div>
  );
}
