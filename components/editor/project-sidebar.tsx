"use client";

import { X, Plus, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <FolderOpen className="h-8 w-8 text-copy-faint" />
      <p className="text-sm text-copy-muted">No {label} yet</p>
    </div>
  );
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      className={[
        "fixed left-0 top-0 z-50 flex h-full w-72 flex-col",
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

        <TabsContent value="my-projects" className="flex-1 overflow-y-auto px-4">
          <EmptyState label="projects" />
        </TabsContent>

        <TabsContent value="shared" className="flex-1 overflow-y-auto px-4">
          <EmptyState label="shared projects" />
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="border-t border-surface-border p-4">
        <Button className="w-full gap-2 rounded-xl bg-brand text-base hover:bg-brand/90">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  );
}
