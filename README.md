# Julian Alvarez OS

A portfolio built as a desktop OS — draggable windows, animated dock, boot wizard, and a terminal easter egg.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)

## Overview

JulianAlvarezOS simulates a macOS-style desktop environment in the browser. Key features:

- **Draggable, resizable windows** — each portfolio section lives in its own window
- **Dock magnification** — hover magnification effect on the app dock
- **Boot wizard** — animated boot sequence + persona selection on first visit
- **Mobile fallback** — linear layout served for viewports under 1024px

## Boot Wizard

On first visit, the OS runs a two-step onboarding flow:

1. **Boot sequence** — animated terminal-style startup screen
2. **Persona selection** — choose between **Recruiter** (focused view) or **Explorer** (full desktop)

The desktop adapts based on the selected persona. Press **ESC** at any point to skip the wizard. To replay it later, open the Terminal and run `rerun-wizard`.

## Apps

| App | Description |
|-----|-------------|
| About | Bio with › bullet highlights, skills grouped by category (Strategy / Execution / Discovery / Technical), quick facts and stats in sidebar |
| Experience | Career timeline — 9 roles across 10 years with expandable entries + 7 case studies (MercadoLibre, Mudafy, Paisanos, Magoya) |
| Tools & Stack | 18 tools across 4 categories (PM, Data & Analytics, Discovery & Research, AI & Automation) with Expert / Proficient / Learning badges |
| Experiments | Side projects |
| Resources | Writing and curated reads |
| Contact | Contact form + social links |
| Terminal | Easter egg — run `help` to explore |

## Terminal Easter Egg

Open the Terminal app from the dock and try:

```
help            list all commands
whoami          who is Julian?
about           full bio
skills          ASCII skill bars
experience      career timeline
contact         contact info & links
pwd             current directory
ls              list files
cat <file>      read a file (try: about.md)
neofetch        system info + ASCII art
coffee          ☕
fortune         random product wisdom
matrix          ???
sudo hire       apply for Julian's time
rerun-wizard    replay the boot sequence
exit / quit     ( ͡° ͜ʖ ͡°)
```

## Tech Stack

- **Next.js 15** (App Router, static export)
- **Tailwind CSS v4** (configured via `@theme` in `globals.css`)
- **Radix UI** + **Shadcn/ui** (new-york style, 50+ components)
- **React Hook Form** + **Zod** for the contact form
- **PostHog** — product analytics and event tracking
- **Vercel Analytics**

## Getting Started

```bash
cd ResumeOS
pnpm install
pnpm dev        # http://localhost:3000
```

```bash
pnpm build      # Production build
pnpm start      # Run production server
pnpm lint       # ESLint
```

## Project Structure

```
ResumeOS/
├── app/                  # Next.js App Router entry
│   ├── page.tsx          # Viewport detection → Desktop or Mobile
│   └── globals.css       # Tailwind v4 theme
├── components/
│   ├── desktop/          # OS chrome (desktop, window, dock, top-bar)
│   ├── apps/             # Portfolio app components
│   ├── wizard/           # Boot wizard (BootSequence, PersonaSelect, BootWizard)
│   ├── mobile/           # Mobile layout
│   └── ui/               # Shadcn/ui components
├── hooks/                # Custom React hooks
└── lib/
    └── utils.ts          # cn() helper
```

## License

MIT
