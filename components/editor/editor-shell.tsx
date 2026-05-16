"use client";

import { useState } from "react";
import { EditorNavbar } from "./editor-navbar";
import { ProjectSidebar } from "./project-sidebar";

interface EditorShellProps {
  /** Content rendered in the main canvas area below the navbar. */
  children: React.ReactNode;
}

/**
 * Full-viewport editor layout. Owns sidebar open/close state and composes
 * EditorNavbar and ProjectSidebar around the provided canvas children.
 */
export function EditorShell({ children }: EditorShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-base">
      <EditorNavbar
        isSidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen((o) => !o)}
      />
      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex flex-1 flex-col overflow-hidden pt-12">
        {children}
      </main>
    </div>
  );
}
