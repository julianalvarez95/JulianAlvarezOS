# Julian Alvarez OS

A portfolio built as a desktop OS — draggable windows, animated dock, and a terminal easter egg.

![Portfolio OS](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)

## Overview

JulianAlvarezOS simulates a macOS-style desktop environment in the browser. Each section of the portfolio lives inside its own draggable, resizable window. The dock supports magnification hover effects. On mobile, a linear layout is served instead.

## Apps

| App | Description |
|-----|-------------|
| About | Bio, skills, and career stats |
| Experience | Career timeline — 9 roles across 10 years, expandable entries |
| Product Thinking | PM frameworks and philosophy |
| Experiments | Side projects |
| Resources | Writing and curated reads |
| Contact | Contact form + social links |
| Terminal | Easter egg — run `help` to explore |

## Tech Stack

- **Next.js 16** (App Router, static export)
- **Tailwind CSS v4** (configured via `@theme` in `globals.css`)
- **Radix UI** + **Shadcn/ui** (new-york style, 50+ components)
- **Recharts** for data visualizations
- **React Hook Form** + **Zod** for the contact form
- **Vercel Analytics**

## Getting Started

```bash
cd ResumeOS
pnpm install
pnpm dev        # http://localhost:3000
```

Other commands:

```bash
pnpm build      # Production build
pnpm start      # Run production server
pnpm lint       # ESLint
```

## Terminal Easter Egg

Open the Terminal app from the dock and try:

```
help            # list all commands
neofetch        # system info + ASCII art
skills          # ASCII skill bars
sudo hire julian
matrix
fortune
coffee
```

## Roadmap

| Priority | Feature | Status |
|----------|---------|--------|
| P0 | Real portfolio content | Done |
| P1 | Dock magnification animation | Done |
| P2 | Window resizing | Done |
| P3 | Full keyboard nav + Command Palette | Planned |
| P4 | Terminal easter egg | Done |
| P5 | Genie minimize animation | Planned |
| P6 | Mobile app launcher | Planned |

## Project Structure

```
ResumeOS/
├── app/                  # Next.js App Router entry
│   ├── page.tsx          # Viewport detection → Desktop or Mobile
│   └── globals.css       # Tailwind v4 theme
├── components/
│   ├── desktop/          # OS chrome (desktop, window, dock, top-bar)
│   ├── apps/             # Portfolio app components
│   ├── mobile/           # Mobile layout
│   └── ui/               # Shadcn/ui components
└── lib/
    └── utils.ts          # cn() helper
```

## License

MIT
