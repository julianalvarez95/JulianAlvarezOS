"use client"

import { Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

type ProficiencyLevel = "Expert" | "Proficient" | "Learning"

interface Tool {
  emoji: string
  name: string
  level: ProficiencyLevel
  description: string
}

interface Category {
  title: string
  tools: Tool[]
}

const categories: Category[] = [
  {
    title: "Product Management",
    tools: [
      { emoji: "📋", name: "Notion", level: "Expert", description: "PRDs, roadmaps, research repos, meeting notes" },
      { emoji: "🎯", name: "Jira", level: "Expert", description: "Backlogs, sprint ceremonies, cross-team coordination" },
      { emoji: "⚡", name: "Linear", level: "Proficient", description: "Sprint planning, bug tracking" },
      { emoji: "🎨", name: "Figma", level: "Proficient", description: "Design reviews, wireframes, UX collaboration" },
      { emoji: "🗺️", name: "Miro", level: "Proficient", description: "Discovery workshops, opportunity solution trees" },
    ],
  },
  {
    title: "Data & Analytics",
    tools: [
      { emoji: "🔍", name: "BigQuery", level: "Expert", description: "Custom SQL queries, funnel analysis, cohort retention" },
      { emoji: "📊", name: "Looker", level: "Expert", description: "Dashboards, KPI monitoring, data exploration" },
      { emoji: "📈", name: "Google Data Studio", level: "Proficient", description: "Executive reporting, business metrics" },
      { emoji: "🔬", name: "Amplitude", level: "Proficient", description: "Product analytics, behavioral funnels" },
      { emoji: "🐿️", name: "PostHog", level: "Proficient", description: "Feature flags, session replay, event tracking" },
    ],
  },
  {
    title: "Discovery & Research",
    tools: [
      { emoji: "📝", name: "Typeform", level: "Proficient", description: "User surveys, NPS collection" },
      { emoji: "🔥", name: "Hotjar", level: "Proficient", description: "Session recordings, heatmaps" },
      { emoji: "🧪", name: "Maze", level: "Proficient", description: "Usability testing, prototype validation" },
      { emoji: "🎥", name: "Loom", level: "Expert", description: "Async updates, user testing recordings" },
    ],
  },
  {
    title: "AI & Automation",
    tools: [
      { emoji: "⌨️", name: "Cursor", level: "Proficient", description: "AI-assisted development (built this portfolio)" },
      { emoji: "🤖", name: "Claude / ChatGPT", level: "Expert", description: "PRD drafting, research synthesis, spec review" },
      { emoji: "🔗", name: "OpenAI API / LangChain", level: "Learning", description: "AI tooling experiments for PM workflows" },
      { emoji: "✨", name: "V0", level: "Proficient", description: "Rapid UI prototyping" },
    ],
  },
]

const badgeStyles: Record<ProficiencyLevel, string> = {
  Expert: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Proficient: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Learning: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
}

export function ToolsApp() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <Wrench className="h-4 w-4" />
        <span className="text-xs font-mono uppercase tracking-wider">Tools & Stack</span>
      </div>

      {categories.map((category) => (
        <div key={category.title}>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {category.title}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {category.tools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-xl border border-border/50 bg-secondary/20 p-3 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base leading-none shrink-0">{tool.emoji}</span>
                    <span className="font-semibold text-sm text-foreground truncate">{tool.name}</span>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full border",
                      badgeStyles[tool.level]
                    )}
                  >
                    {tool.level}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-snug">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
