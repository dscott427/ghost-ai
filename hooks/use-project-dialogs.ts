"use client";

import { useState, useMemo } from "react";

export interface MockProject {
  id: string;
  name: string;
  slug: string;
  owned: boolean;
}

const INITIAL_PROJECTS: MockProject[] = [
  { id: "1", name: "Ghost AI Backend", slug: "ghost-ai-backend", owned: true },
  { id: "2", name: "Auth Service", slug: "auth-service", owned: true },
  { id: "3", name: "Shared Dashboard", slug: "shared-dashboard", owned: false },
];

type DialogType = "create" | "rename" | "delete" | null;

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Manages project list, dialog open/close, form input, and loading state. */
export function useProjectDialogs() {
  const [projects, setProjects] = useState<MockProject[]>(INITIAL_PROJECTS);
  const [openDialog, setOpenDialog] = useState<DialogType>(null);
  const [nameInput, setNameInput] = useState("");
  const [activeProject, setActiveProject] = useState<MockProject | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const slug = useMemo(() => toSlug(nameInput), [nameInput]);

  function openCreate() {
    setNameInput("");
    setActiveProject(null);
    setOpenDialog("create");
  }

  function openRename(project: MockProject) {
    setNameInput(project.name);
    setActiveProject(project);
    setOpenDialog("rename");
  }

  function openDelete(project: MockProject) {
    setActiveProject(project);
    setOpenDialog("delete");
  }

  function closeDialog() {
    setOpenDialog(null);
    setActiveProject(null);
    setNameInput("");
  }

  function handleSubmit() {
    const trimmed = nameInput.trim();
    setIsLoading(true);

    setTimeout(() => {
      if (openDialog === "create" && trimmed) {
        setProjects((prev) => [
          ...prev,
          { id: Date.now().toString(), name: trimmed, slug: toSlug(trimmed), owned: true },
        ]);
      } else if (openDialog === "rename" && activeProject && trimmed) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === activeProject.id
              ? { ...p, name: trimmed, slug: toSlug(trimmed) }
              : p
          )
        );
      } else if (openDialog === "delete" && activeProject) {
        setProjects((prev) => prev.filter((p) => p.id !== activeProject.id));
      }

      setIsLoading(false);
      closeDialog();
    }, 400);
  }

  return {
    projects,
    openDialog,
    nameInput,
    setNameInput,
    slug,
    activeProject,
    isLoading,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    handleSubmit,
  };
}
