"use client";

import { useState } from "react";
import { EditorNavbar } from "./editor-navbar";
import { ProjectSidebar } from "./project-sidebar";
import { EditorHome } from "./editor-home";
import { CreateProjectDialog } from "./dialogs/create-project-dialog";
import { RenameProjectDialog } from "./dialogs/rename-project-dialog";
import { DeleteProjectDialog } from "./dialogs/delete-project-dialog";
import { useProjectActions } from "@/hooks/use-project-actions";
import type { Project } from "@/lib/projects";

interface EditorShellProps {
  ownedProjects: Project[];
  sharedProjects: Project[];
}

export function EditorShell({ ownedProjects, sharedProjects }: EditorShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const actions = useProjectActions();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-base">
      <EditorNavbar
        isSidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen((o) => !o)}
      />
      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewProject={actions.openCreate}
        onRenameProject={actions.openRename}
        onDeleteProject={actions.openDelete}
        ownedProjects={ownedProjects}
        sharedProjects={sharedProjects}
      />
      <main className="flex flex-1 flex-col overflow-hidden pt-12">
        <EditorHome onNewProject={actions.openCreate} />
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
    </div>
  );
}
