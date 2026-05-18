"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Check, X, UserPlus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Collaborator {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  isOwner: boolean;
}

export function ShareDialog({
  open,
  onClose,
  projectId,
  projectName,
  isOwner,
}: ShareDialogProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loadingCollabs, setLoadingCollabs] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchCollaborators = useCallback(async () => {
    setLoadingCollabs(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/collaborators`);
      if (res.ok) {
        const data = await res.json();
        setCollaborators(data.collaborators);
      }
    } finally {
      setLoadingCollabs(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (open) {
      setEmailInput("");
      setInviteError(null);
      fetchCollaborators();
    }
  }, [open, fetchCollaborators]);

  async function handleInvite() {
    const email = emailInput.trim().toLowerCase();
    if (!email) return;
    setInviting(true);
    setInviteError(null);
    try {
      const res = await fetch(`/api/projects/${projectId}/collaborators`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        const collab: Collaborator = await res.json();
        setCollaborators((prev) => [...prev, collab]);
        setEmailInput("");
      } else {
        const data = await res.json().catch(() => ({}));
        setInviteError((data as { error?: string }).error ?? "Failed to invite");
      }
    } finally {
      setInviting(false);
    }
  }

  async function handleRemove(collaboratorId: string) {
    setRemovingId(collaboratorId);
    try {
      const res = await fetch(
        `/api/projects/${projectId}/collaborators/${collaboratorId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setCollaborators((prev) => prev.filter((c) => c.id !== collaboratorId));
      }
    } finally {
      setRemovingId(null);
    }
  }

  async function handleCopyLink() {
    const url = `${window.location.origin}/editor/${projectId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent showCloseButton className="max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle>Share &quot;{projectName}&quot;</DialogTitle>
        </DialogHeader>

        {isOwner && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-copy-secondary">
              Invite by email
            </label>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="colleague@example.com"
                value={emailInput}
                onChange={(e) => { setEmailInput(e.target.value); setInviteError(null); }}
                onKeyDown={(e) => { if (e.key === "Enter") handleInvite(); }}
                disabled={inviting}
                className="flex-1 text-foreground"
              />
              <Button
                size="icon"
                onClick={handleInvite}
                disabled={!emailInput.trim() || inviting}
              >
                {inviting
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : <UserPlus className="h-4 w-4" />
                }
              </Button>
            </div>
            {inviteError && (
              <p className="text-xs text-error">{inviteError}</p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2">
          {loadingCollabs ? (
            <div className="flex items-center gap-2 text-xs text-copy-muted">
              <Loader2 className="h-3 w-3 animate-spin" />
              Loading…
            </div>
          ) : collaborators.length === 0 ? (
            <p className="text-xs text-copy-muted">No collaborators yet</p>
          ) : (
            <>
              <p className="text-xs font-medium text-copy-secondary">Collaborators</p>
              {collaborators.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-xl bg-elevated px-3 py-2"
                >
                  {c.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.avatarUrl}
                      alt=""
                      className="h-7 w-7 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-subtle text-xs font-medium text-copy-muted">
                      {c.email[0].toUpperCase()}
                    </div>
                  )}
                  <div className="flex min-w-0 flex-1 flex-col">
                    {c.name && (
                      <span className="truncate text-xs font-medium text-copy-primary">
                        {c.name}
                      </span>
                    )}
                    <span className="truncate text-xs text-copy-muted">{c.email}</span>
                  </div>
                  {isOwner && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0 text-copy-muted hover:text-error"
                      disabled={removingId === c.id}
                      onClick={() => handleRemove(c.id)}
                    >
                      {removingId === c.id
                        ? <Loader2 className="h-3 w-3 animate-spin" />
                        : <X className="h-3 w-3" />
                      }
                    </Button>
                  )}
                </div>
              ))}
            </>
          )}
        </div>

        <div className="border-t border-surface-border pt-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2"
            onClick={handleCopyLink}
          >
            {copied
              ? <Check className="h-4 w-4 text-success" />
              : <Copy className="h-4 w-4" />
            }
            {copied ? "Copied!" : "Copy project link"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
