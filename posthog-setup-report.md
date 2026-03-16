# PostHog post-wizard report

The wizard has completed the PostHog integration for JulianAlvarezOS. The setup includes client-side initialization via `instrumentation-client.ts` (Next.js 15.3+ pattern), a reverse proxy through Next.js rewrites to reduce ad-blocker interference, exception tracking, and 7 custom events covering the full visitor funnel — from wizard boot to contact intent.

## Files changed

| File | Change |
|------|--------|
| `ResumeOS/instrumentation-client.ts` | New — initializes PostHog with reverse proxy, `capture_exceptions`, and debug mode in dev |
| `ResumeOS/next.config.mjs` | Added `/ingest` rewrites for PostHog reverse proxy + `skipTrailingSlashRedirect` |
| `ResumeOS/components/wizard/PersonaSelect.tsx` | Captures `wizard_persona_selected` |
| `ResumeOS/components/wizard/BootWizard.tsx` | Captures `wizard_skipped` on ESC |
| `ResumeOS/components/desktop/desktop.tsx` | Captures `app_opened` with `app_id` property |
| `ResumeOS/components/apps/contact-app.tsx` | Captures `contact_link_clicked` and `contact_cv_downloaded` |
| `ResumeOS/components/apps/terminal-app.tsx` | Captures `terminal_command_executed` and `wizard_rerun` |

## Events instrumented

| Event | Description | File |
|-------|-------------|------|
| `wizard_persona_selected` | User picks "recruiter" or "explorer" in the boot wizard. `persona` property. | `components/wizard/PersonaSelect.tsx` |
| `wizard_skipped` | User presses ESC to skip the boot wizard. | `components/wizard/BootWizard.tsx` |
| `app_opened` | User opens a portfolio window (first open only). `app_id` property. | `components/desktop/desktop.tsx` |
| `contact_link_clicked` | User clicks LinkedIn or Email link. `label` property. | `components/apps/contact-app.tsx` |
| `contact_cv_downloaded` | User clicks the Download CV button. | `components/apps/contact-app.tsx` |
| `terminal_command_executed` | User runs any terminal command. `command` property (base command only). | `components/apps/terminal-app.tsx` |
| `wizard_rerun` | User replays the boot wizard via `rerun-wizard` terminal command. | `components/apps/terminal-app.tsx` |

## Next steps

### 1. Add environment variables

Add to `ResumeOS/.env.local` (local) and to Vercel project settings (production):

```env
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=your_token_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Get your token from: PostHog → Project Settings → Project API Key.

### 2. Suggested dashboard: "Portfolio Analytics"

Create a dashboard in PostHog with these insights:

1. **Persona breakdown** — `wizard_persona_selected` grouped by `persona` (recruiter vs explorer)
2. **Wizard completion funnel** — Funnel: session start → `wizard_persona_selected` (vs `wizard_skipped`)
3. **App open frequency** — `app_opened` grouped by `app_id` (bar chart)
4. **Contact intent** — `contact_link_clicked` trend over time, plus `contact_cv_downloaded`
5. **Terminal engagement** — `terminal_command_executed` grouped by `command`

### Agent skill

An agent skill folder is available at `.claude/skills/integration-nextjs-app-router/` with full PostHog + Next.js integration docs for future Claude Code sessions.
