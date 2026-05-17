"use client";

import { useState } from "react";
import { EditorNavbar } from "./editor-navbar";
import { ProjectSidebar } from "./project-sidebar";
import { EditorHome } from "./editor-home";
import { CreateProjectDialog } from "./dialogs/create-project-dialog";
import { RenameProjectDialog } from "./dialogs/rename-project-dialog";
import { DeleteProjectDialog } from "./dialogs/delete-project-dialog";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";

/**
 * Full-viewport editor layout. Owns sidebar open/close state and all project
 * dialog state. Composes EditorNavbar, ProjectSidebar, EditorHome, and the
 * three project dialogs.
 */
export function EditorShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dialogs = useProjectDialogs();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-base">
      <EditorNavbar
        isSidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen((o) => !o)}
      />
      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewProject={dialogs.openCreate}
        onRenameProject={dialogs.openRename}
        onDeleteProject={dialogs.openDelete}
        projects={dialogs.projects}
      />
      <main className="flex flex-1 flex-col overflow-hidden pt-12">
        <EditorHome onNewProject={dialogs.openCreate} />
      </main>

      <CreateProjectDialog
        open={dialogs.openDialog === "create"}
        onClose={dialogs.closeDialog}
        nameInput={dialogs.nameInput}
        setNameInput={dialogs.setNameInput}
        slug={dialogs.slug}
        isLoading={dialogs.isLoading}
        onSubmit={dialogs.handleSubmit}
      />
      <RenameProjectDialog
        open={dialogs.openDialog === "rename"}
        onClose={dialogs.closeDialog}
        activeProject={dialogs.activeProject}
        nameInput={dialogs.nameInput}
        setNameInput={dialogs.setNameInput}
        isLoading={dialogs.isLoading}
        onSubmit={dialogs.handleSubmit}
      />
      <DeleteProjectDialog
        open={dialogs.openDialog === "delete"}
        onClose={dialogs.closeDialog}
        activeProject={dialogs.activeProject}
        isLoading={dialogs.isLoading}
        onConfirm={dialogs.handleSubmit}
      />
    </div>
  );
}
