"use client";

import { PanelLeftClose, PanelLeftOpen, Share2, Sparkles } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface WorkspaceNavbarProps {
  projectName: string;
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
  isAiSidebarOpen: boolean;
  onAiSidebarToggle: () => void;
  onShareClick: () => void;
}

export function WorkspaceNavbar({
  projectName,
  isSidebarOpen,
  onSidebarToggle,
  isAiSidebarOpen,
  onAiSidebarToggle,
  onShareClick,
}: WorkspaceNavbarProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-12 items-center border-b border-surface-border bg-surface px-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={onSidebarToggle}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        className="h-8 w-8 text-copy-muted hover:text-copy-primary"
      >
        {isSidebarOpen ? (
          <PanelLeftClose className="h-5 w-5" />
        ) : (
          <PanelLeftOpen className="h-5 w-5" />
        )}
      </Button>

      <div className="flex flex-1 items-center justify-center">
        <span className="text-sm font-medium text-copy-primary">{projectName}</span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onShareClick}
          className="h-8 gap-1.5 rounded-xl text-xs text-copy-muted hover:text-copy-primary"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAiSidebarToggle}
          aria-label={isAiSidebarOpen ? "Close AI sidebar" : "Open AI sidebar"}
          className="h-8 w-8 text-copy-muted hover:text-copy-primary"
        >
          <Sparkles className="h-5 w-5" />
        </Button>
        <UserButton />
      </div>
    </header>
  );
}
