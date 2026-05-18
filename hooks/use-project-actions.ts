"use client";

import { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toSlug } from "@/lib/utils";
import type { Project } from "@/lib/projects";

type DialogType = "create" | "rename" | "delete" | null;

function shortSuffix(): string {
  return Math.random().toString(36).slice(2, 6);
}

export function useProjectActions() {
  const router = useRouter();
  const pathname = usePathname();

  const [openDialog, setOpenDialog] = useState<DialogType>(null);
  const [nameInput, setNameInput] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const suffixRef = useRef("");

  const slug = nameInput.trim() ? `${toSlug(nameInput)}-${suffixRef.current}` : "";

  function openCreate() {
    suffixRef.current = shortSuffix();
    setNameInput("");
    setActiveProject(null);
    setOpenDialog("create");
  }

  function openRename(project: Project) {
    setNameInput(project.name);
    setActiveProject(project);
    setOpenDialog("rename");
  }

  function openDelete(project: Project) {
    setActiveProject(project);
    setOpenDialog("delete");
  }

  function closeDialog() {
    setOpenDialog(null);
    setActiveProject(null);
    setNameInput("");
  }

  async function handleSubmit() {
    const trimmed = nameInput.trim();
    setIsLoading(true);

    try {
      if (openDialog === "create") {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: trimmed || "Untitled Project" }),
        });
        if (res.ok) {
          const project: Project = await res.json();
          closeDialog();
          router.push(`/editor/${project.id}`);
        }
      } else if (openDialog === "rename" && activeProject) {
        const res = await fetch(`/api/projects/${activeProject.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: trimmed }),
        });
        if (res.ok) {
          closeDialog();
          router.refresh();
        }
      } else if (openDialog === "delete" && activeProject) {
        const res = await fetch(`/api/projects/${activeProject.id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          const deletedId = activeProject.id;
          closeDialog();
          const segments = pathname?.split("/") ?? [];
          if (segments.includes(deletedId)) {
            router.push("/editor");
          } else {
            router.refresh();
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
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
