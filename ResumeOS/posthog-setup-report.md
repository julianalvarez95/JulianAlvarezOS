<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Portfolio OS project. The following changes were made:

- **`instrumentation-client.ts`** (new file): Initializes PostHog using the Next.js 15.3+ `instrumentation-client` pattern. Configures a reverse proxy via `/ingest`, enables automatic exception capture, and turns on debug mode in development.
- **`next.config.mjs`**: Added reverse proxy rewrites for `/ingest/static/:path*` and `/ingest/:path*` (routes to PostHog US servers) and `skipTrailingSlashRedirect: true`.
- **`ResumeOS/.env.local`** (new file): Contains `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.
- **`components/desktop/desktop.tsx`**: Captures `app_opened` (with `app_id` property) when a new window is opened, and `app_closed` when a window is closed.
- **`components/wizard/BootWizard.tsx`**: Captures `wizard_persona_selected` (with `persona` property) when a visitor picks recruiter or explorer, and `wizard_skipped` when they press ESC.
- **`components/apps/contact-app.tsx`**: Captures `contact_link_clicked` (with `link_label` and `link_href`) on each contact link, and `cv_download_clicked` on the Download CV button.
- **`components/apps/projects-app.tsx`**: Captures `experience_entry_expanded` (with `company_id`) when a visitor expands a career timeline entry.
- **`components/apps/writing-app.tsx`**: Captures `resources_tab_switched` (with `tab`) on tab changes, and `resource_link_clicked` (with `resource_type`, `resource_name`, `resource_url`) on external links in all three resource tabs.
- **`components/desktop/RecruiterWidget.tsx`**: Captures `recruiter_widget_contact_clicked` on the "Let's talk" CTA and `recruiter_widget_dismissed` on the dismiss button.

| Event | Description | File |
|-------|-------------|------|
| `app_opened` | A portfolio app window was opened from the desktop | `components/desktop/desktop.tsx` |
| `app_closed` | A portfolio app window was closed | `components/desktop/desktop.tsx` |
| `wizard_persona_selected` | User selected recruiter or explorer in the boot wizard | `components/wizard/BootWizard.tsx` |
| `wizard_skipped` | User skipped the boot wizard via ESC | `components/wizard/BootWizard.tsx` |
| `contact_link_clicked` | A contact link (LinkedIn or Email) was clicked | `components/apps/contact-app.tsx` |
| `cv_download_clicked` | The Download CV button was clicked | `components/apps/contact-app.tsx` |
| `experience_entry_expanded` | A career timeline entry was expanded | `components/apps/projects-app.tsx` |
| `resources_tab_switched` | User switched between Resources tabs | `components/apps/writing-app.tsx` |
| `resource_link_clicked` | An external resource link was clicked | `components/apps/writing-app.tsx` |
| `recruiter_widget_contact_clicked` | Recruiter widget "Let's talk" CTA clicked | `components/desktop/RecruiterWidget.tsx` |
| `recruiter_widget_dismissed` | Recruiter widget was dismissed | `components/desktop/RecruiterWidget.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/344507/dashboard/1365136
  - **Most Popular Apps**: https://us.posthog.com/project/344507/insights/geTW1y3r — which apps visitors open most, by app_id
  - **Visitor to Contact Conversion Funnel**: https://us.posthog.com/project/344507/insights/BrzJj77l — persona selected → app opened → contact clicked
  - **Visitor Persona Breakdown**: https://us.posthog.com/project/344507/insights/Uf5ZZcwS — pie chart of recruiter vs explorer split
  - **Recruiter High-Intent Actions**: https://us.posthog.com/project/344507/insights/8QChMgKs — CV downloads and contact link clicks over time
  - **Wizard Drop-off: Skipped vs Completed**: https://us.posthog.com/project/344507/insights/fAJYe2VP — onboarding churn: wizard completions vs skips

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
