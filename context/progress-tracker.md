# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- In Progress

## Current Goal

- Feature 02: Editor chrome — top navbar and floating project sidebar shell

## Completed

- Cleaned up Next.js boilerplate (stripped globals.css, removed SVGs, replaced page.tsx with minimal "Ghost AI" component)
- **Feature 01: Design System** — shadcn/ui initialized, all 7 UI primitive components installed (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea), lucide-react installed, globals.css updated with full dark-only theme palette, `dark` class added to `<html>`
- **Feature 02: Editor** — `EditorNavbar` (fixed top bar, sidebar toggle with PanelLeftOpen/Close icons, left/center/right sections) and `ProjectSidebar` (fixed floating overlay, slides in from left, My Projects + Shared tabs, New Project button); dialog pattern ready via shadcn Dialog

## In Progress

- None

## Next Up

- Feature 03 (see context/feature-specs/)

## Open Questions

- [Any unresolved product or technical decisions]

## Architecture Decisions

- Dark-only: all CSS variable values live in `:root` directly; `.dark` class is forced on `<html>` for shadcn variant compatibility
- shadcn's semantic variables (`--background`, `--foreground`, etc.) are mapped to project palette variables (`--bg-base`, `--text-primary`, etc.) defined in `:root`
- Do not modify generated `components/ui/*` files after installation
- Sidebar floats (fixed position) — does not push canvas content
- Sidebar and navbar state (`isSidebarOpen`) lives in the parent editor page, passed down as props
- Project Tailwind utilities: `bg-base`, `bg-surface`, `bg-elevated`, `bg-subtle`, `text-copy-primary`, `text-copy-secondary`, `text-copy-muted`, `text-copy-faint`, `border-surface-border`, `border-subtle-border`, `text-brand`, `bg-accent-dim`, `text-ai`, `text-ai-text`, `text-error`, `text-success`, `text-warning`

## Session Notes

- Next.js 16, Tailwind 4, shadcn 4.7 — Tailwind v4 uses `@import "tailwindcss"` and `@theme inline`, no tailwind.config.js
- `lib/utils.ts` has `cn()` using clsx + tailwind-merge
- Dialog pattern ready for future use via `components/ui/dialog.tsx`
