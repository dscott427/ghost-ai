# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- In Progress

## Current Goal

- Working through feature specs in order

## Completed

- Cleaned up Next.js boilerplate (stripped globals.css, removed SVGs, replaced page.tsx with minimal "Ghost AI" component)
- **Feature 01: Design System** — shadcn/ui initialized, all 7 UI primitive components installed (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea), lucide-react installed, globals.css updated with full dark-only theme palette, `dark` class added to `<html>`

## In Progress

- None

## Next Up

- Feature 02 (see context/feature-specs/)

## Open Questions

- [Any unresolved product or technical decisions]

## Architecture Decisions

- Dark-only: all CSS variable values live in `:root` directly; `.dark` class is forced on `<html>` for shadcn variant compatibility
- shadcn's semantic variables (`--background`, `--foreground`, etc.) are mapped to project palette variables (`--bg-base`, `--text-primary`, etc.) defined in `:root`
- Do not modify generated `components/ui/*` files after installation
- Project Tailwind utilities: `bg-base`, `bg-surface`, `bg-elevated`, `bg-subtle`, `text-copy-primary`, `text-copy-secondary`, `text-copy-muted`, `text-copy-faint`, `border-surface-border`, `border-subtle-border`, `text-brand`, `bg-accent-dim`, `text-ai`, `text-ai-text`, `text-error`, `text-success`, `text-warning`

## Session Notes

- Next.js 16, Tailwind 4, shadcn 4.7 — Tailwind v4 uses `@import "tailwindcss"` and `@theme inline`, no tailwind.config.js
- `lib/utils.ts` has `cn()` using clsx + tailwind-merge
