"use client"

import { Badge } from "@/components/ui/badge"
import { Bot, BarChart3, Cog, ExternalLink, Sparkles } from "lucide-react"

const experiments = [
  {
    id: 1,
    title: "This Portfolio OS",
    description: "Built this macOS-style portfolio using Next.js, V0 by Vercel, Cursor, and Tailwind CSS. A PM who ships his own portfolio.",
    tags: ["Next.js", "Tailwind", "Cursor", "V0"],
    icon: Sparkles,
    status: "Shipped",
    link: "#",
  },
  {
    id: 2,
    title: "AI Tooling Exploration",
    description: "Exploring OpenAI APIs, LangChain, and Cursor for PM workflows: automated documentation, sprint summaries, and user interview synthesis.",
    tags: ["AI", "OpenAI", "LangChain", "Cursor"],
    icon: Bot,
    status: "Active",
    link: "#",
  },
  {
    id: 3,
    title: "Wave CRM AI Features",
    description: "Prototyped AI-assisted recommendations inside Wave CRM — smarter lead scoring and automated follow-up suggestions. Partnered directly with the engineering team.",
    tags: ["AI", "CRM", "B2B", "Prototype"],
    icon: Cog,
    status: "Active",
    link: "#",
  },
  {
    id: 4,
    title: "Analytics Automation",
    description: "SQL/BigQuery scripts for automating recurring product analytics: funnel reports, cohort analysis, OKR dashboards. Used across Mudafy and MercadoLibre.",
    tags: ["SQL", "BigQuery", "Analytics", "Automation"],
    icon: BarChart3,
    status: "Ongoing",
    link: "#",
  },
]

const statusColors: Record<string, string> = {
  Active: "bg-accent/20 text-accent border-accent/30",
  Shipped: "bg-primary/20 text-primary border-primary/30",
  Ongoing: "bg-chart-4/20 text-chart-4 border-chart-4/30",
}

export function ExperimentsApp() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Sparkles className="h-4 w-4" />
        <span className="text-xs font-mono uppercase tracking-wider">Side Projects & Prototypes</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {experiments.map((experiment) => {
          const Icon = experiment.icon
          return (
            <div
              key={experiment.id}
              className="group flex flex-col gap-3 rounded-xl bg-secondary/30 p-4 border border-border/50 transition-all hover:bg-secondary/50 hover:border-primary/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 border border-primary/30">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <Badge className={statusColors[experiment.status]}>
                  {experiment.status}
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  {experiment.title}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-3">
                  {experiment.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {experiment.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs border-border/50 text-muted-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl bg-secondary/20 p-4 border border-border/30">
        <p className="text-sm text-muted-foreground">
          These are personal experiments and side projects. Some became real products, 
          others remain learning exercises. All helped me become a better product thinker.
        </p>
      </div>
    </div>
  )
}
