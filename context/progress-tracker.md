# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- In Progress

## Current Goal

- Feature 08 (see context/feature-specs/)

## Completed

- Cleaned up Next.js boilerplate
- **Feature 01: Design System** — shadcn/ui, 7 UI primitives, lucide-react, dark-only theme tokens in globals.css
- **Feature 02: Editor** — EditorNavbar, ProjectSidebar, EditorShell; editor route at /editor
- **Feature 03: Auth** — ClerkProvider, proxy.ts route protection, sign-in/sign-up pages, UserButton, auth page redesign (50/50 layout)
- **Feature 04: Project Dialogs** — editor home screen, create/rename/delete dialogs, sidebar project items with rename/delete actions (owned only), mobile backdrop scrim, useProjectDialogs hook
- **Feature 05: Prisma** — prisma/models/project.prisma (Project + ProjectCollaborator), lib/prisma.ts singleton (Accelerate/pg branch), migration 20260517214543_init applied
- **Feature 06: Project APIs** — GET/POST /api/projects and PATCH/DELETE /api/projects/[projectId]; 401 for unauthenticated, 403 for non-owner mutations; build passes
- **Feature 07: Wire Editor Home** — lib/projects.ts data helper (owned + shared), hooks/use-project-actions.ts (create/rename/delete with real API calls, router.push/refresh), editor page is now a server component passing real data to EditorShell; MockProject replaced with Project type throughout

## In Progress

- None

## Next Up

- Feature 08 (see context/feature-specs/)

## Open Questions

- None

## Architecture Decisions

- Dark-only: all CSS variable values live in `:root`; `dark` class forced on `<html>`
- Sidebar floats (fixed position) — does not push canvas content
- Sidebar/navbar state lives in EditorShell, passed down as props
- Do not modify `components/ui/*` files (shadcn)
- Auth uses protected-first strategy: all routes protected except /sign-in and /sign-up
- proxy.ts (not middleware.ts) is the Clerk middleware file for Next.js 16+
- Prisma 7: custom output at app/generated/prisma; import from @/app/generated/prisma/client
- prisma.config.ts loads .env.local (override: true) so DATABASE_URL is found by Prisma CLI
- PrismaClient branches on DATABASE_URL prefix: prisma+postgres:// → accelerateUrl, else → PrismaPg adapter

## Session Notes

- Next.js 16, Tailwind 4, shadcn 4.7, @clerk/nextjs 7.3.5
- proxy.ts is identical to middleware.ts code — only filename differs in Next.js 16+
- Clerk env vars: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY already in .env.local
- Prisma 7.8.0: multi-file schema loaded from prisma/ directory via prisma.config.ts
