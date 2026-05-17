# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- In Progress

## Current Goal

- Feature 05 (see context/feature-specs/)

## Completed

- Cleaned up Next.js boilerplate
- **Feature 01: Design System** — shadcn/ui, 7 UI primitives, lucide-react, dark-only theme tokens in globals.css
- **Feature 02: Editor** — EditorNavbar, ProjectSidebar, EditorShell; editor route at /editor
- **Feature 03: Auth** — ClerkProvider, proxy.ts route protection, sign-in/sign-up pages, UserButton, auth page redesign (50/50 layout)
- **Feature 04: Project Dialogs** — editor home screen, create/rename/delete dialogs, sidebar project items with rename/delete actions (owned only), mobile backdrop scrim, useProjectDialogs hook

## In Progress

- None

## Next Up

- Feature 05 (see context/feature-specs/)

## Open Questions

- None

## Architecture Decisions

- Dark-only: all CSS variable values live in `:root`; `dark` class forced on `<html>`
- Sidebar floats (fixed position) — does not push canvas content
- Sidebar/navbar state lives in EditorShell, passed down as props
- Do not modify `components/ui/*` files (shadcn)
- Auth uses protected-first strategy: all routes protected except /sign-in and /sign-up
- proxy.ts (not middleware.ts) is the Clerk middleware file for Next.js 16+

## Session Notes

- Next.js 16, Tailwind 4, shadcn 4.7, @clerk/nextjs 7.3.5
- proxy.ts is identical to middleware.ts code — only filename differs in Next.js 16+
- Clerk env vars: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY already in .env.local
