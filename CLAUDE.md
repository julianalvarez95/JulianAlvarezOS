# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `ResumeOS/` subdirectory (i.e., `/home/julianalvarez/Desktop/JulianAlvarezOS/ResumeOS/`). The repo root is one level up and contains only this `CLAUDE.md` and the `ResumeOS/` project folder.

```bash
pnpm dev       # Start development server
pnpm build     # Production build
pnpm start     # Run production server
pnpm lint      # ESLint check
```

> Note: `next.config.mjs` disables TypeScript build errors (`ignoreBuildErrors: true`) and disables image optimization for static export.

## Architecture

**Entry point:** `app/page.tsx` detects viewport width and renders either the desktop OS or the mobile view.

### Desktop OS simulation (`components/desktop/`)

- `desktop.tsx` — the central component; owns all window state (open, minimized, position, z-index). Handles open/close/minimize/focus lifecycle and drag positioning.
- `window.tsx` — draggable window wrapper rendered for each open app.
- `dock.tsx` / `top-bar.tsx` / `desktop-icon.tsx` — chrome around windows.

### Portfolio apps (`components/apps/`)

Seven app components, each rendered inside a `Window`:

| App | Content |
|-----|---------|
| `about-app.tsx` | Bio / background |
| `projects-app.tsx` | Project case studies |
| `metrics-app.tsx` | PM metrics (Recharts) |
| `product-thinking-app.tsx` | Product frameworks |
| `experiments-app.tsx` | Side experiments |
| `writing-app.tsx` | Blog / writing |
| `contact-app.tsx` | Contact form (React Hook Form + Zod) |

### UI components (`components/ui/`)

50+ Shadcn/ui components (new-york style). Add new ones with `pnpm dlx shadcn@latest add <component>`. The shared utility is `lib/utils.ts` (`cn` = clsx + tailwind-merge).

### Mobile (`components/mobile/mobile-view.tsx`)

Alternative linear layout rendered when viewport < 1024 px.

## Key dependencies

- **Next.js App Router** — no `pages/` directory; routing lives in `app/`.
- **Tailwind CSS v4** — configuration is in `app/globals.css` via `@theme`, not `tailwind.config.*`.
- **Radix UI** — base primitives for all interactive Shadcn components.
- **Recharts** — used in `metrics-app.tsx` for data visualizations.
- **Vercel Analytics** — injected in `app/layout.tsx`; no extra setup needed locally.

## Planned improvements

`ResumeOS/improvements-prd.md` contains prioritized PRDs for planned features (in Spanish):

| Priority | Feature |
|----------|---------|
| P0 | Real portfolio content (replace all placeholders) |
| P1 | macOS-style dock magnification animation |
| P2 | Window resizing (drag borders/corners) |
| P3 | Full keyboard navigation + Command Palette (Cmd+K) |
| P4 | Terminal easter egg app (`julian@portfolio:~$`) |
| P5 | Genie-effect minimize animation |
| P6 | Mobile app launcher (iOS/Android-style) |
