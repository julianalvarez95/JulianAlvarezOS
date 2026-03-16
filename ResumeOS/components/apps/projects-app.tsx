"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import posthog from "posthog-js"

interface TimelineEntry {
  id: string
  company: string
  badge?: string
  role: string
  period: string
  duration: string
  tags: string[]
  bullets: string[]
  highlight?: "current" | "notable"
}

const timelineEntries: TimelineEntry[] = [
  {
    id: "willdom",
    company: "WillDom",
    badge: "Current",
    role: "Product Manager @ Wave CRM",
    period: "Jul 2024 – Present",
    duration: "1y 9m",
    tags: ["SaaS", "CRM", "B2B", "AI"],
    bullets: [
      "Owned full product roadmap for Wave CRM with a cross-functional team of 11 engineers",
      "Built core CRM capabilities: company/persona search, advanced filtering, activity logs",
      "Shipped pipeline features: follow-up workflows, time-in-stage tracking, KPI analytics dashboards",
      "Explored AI-assisted recommendations to reduce manual sales ops work",
      "Improved pipeline visibility and introduced data-driven decision-making tools for commercial teams",
    ],
    highlight: "current",
  },
  {
    id: "magoya",
    company: "Magoya",
    role: "Group Product Manager",
    period: "Dec 2023 – Jul 2024",
    duration: "8m",
    tags: ["B2B", "SaaS", "Team Leadership"],
    bullets: [
      "Led product strategy across multiple client engagements as Group PM",
      "Managed and mentored a team of PMs across concurrent product tracks",
      "Defined discovery and delivery processes to improve consistency across teams",
    ],
  },
  {
    id: "novolabs",
    company: "Novolabs",
    role: "PM – Startups Incubators & Accelerators",
    period: "Feb 2023 – Dec 2023",
    duration: "11m",
    tags: ["Startups", "Incubator", "0-to-1"],
    bullets: [
      "Worked embedded in startup incubators and accelerators as product advisor and PM",
      "Helped early-stage startups define MVPs, product strategy, and go-to-market sequencing",
      "Ran discovery sprints, stakeholder alignment, and roadmap sessions for multiple clients",
    ],
  },
  {
    id: "mudafy",
    company: "Mudafy (YC S19)",
    badge: "YC S19",
    role: "Product Manager @ CRM Team",
    period: "Oct 2022 – Jan 2023",
    duration: "4m",
    tags: ["Proptech", "CRM", "Discovery", "LATAM"],
    bullets: [
      "Managed CRM used by 200+ internal users across the sales ops team in Mexico",
      "Ran 50+ user interviews to identify high-friction workflows and prioritize backlog",
      "Benchmarked 4 competing tools and prioritized 15+ solutions for the quarter",
      "Built and tracked OKR dashboards in BigQuery + Data Studio across 5 key initiatives",
    ],
    highlight: "notable",
  },
  {
    id: "paisanos",
    company: "Paisanos.io",
    role: "Product Manager",
    period: "Jun 2022 – Nov 2022",
    duration: "6m",
    tags: ["Consulting", "B2B", "Product Strategy"],
    bullets: [
      "Delivered product consulting engagements for B2B clients across LATAM",
      "Defined roadmaps and discovery frameworks for early-stage digital products",
      "Facilitated cross-functional workshops to align engineering and business stakeholders",
    ],
  },
  {
    id: "meli-coord",
    company: "Mercado Libre",
    badge: "NASDAQ: MELI",
    role: "Product Commerce Coordinator",
    period: "Nov 2021 – Apr 2022",
    duration: "6m",
    tags: ["Marketplace", "B2C", "LATAM", "Team Lead"],
    bullets: [
      "Promoted to Coordinator, managing a cross-regional team across Mexico, Argentina, and Brazil",
      "Led vertical strategy for Autoparts, Motoparts, Agro, Sports & Fashion categories",
      "Owned roadmap coordination between IT/Product and commercial business units",
    ],
    highlight: "notable",
  },
  {
    id: "meli-analyst",
    company: "Mercado Libre",
    badge: "NASDAQ: MELI",
    role: "Product Commerce Analyst",
    period: "Sep 2018 – Oct 2021",
    duration: "3y 2m",
    tags: ["Marketplace", "Analytics", "Catalog", "SQL"],
    bullets: [
      "Drove structured data strategy for marketplace verticals across Argentina, Brazil, Mexico, Chile",
      "Coordinated multidisciplinary teams: IT, UX, Marketing, Advertising, Business Analytics",
      "Led Sports & Fashion initiative to become the main online fashion destination in LATAM",
      "Analyzed metrics via Tableau, MySQL, Looker, and Salesforce to guide product decisions",
    ],
    highlight: "notable",
  },
  {
    id: "ford",
    company: "Ford Argentina",
    role: "Customer Success Analyst",
    period: "Mar 2017 – Sep 2018",
    duration: "1y 7m",
    tags: ["Customer Success", "Automotive", "CRM"],
    bullets: [
      "Managed customer success workflows for Ford Argentina's digital channels",
      "Tracked and resolved escalations across the regional CRM system",
      "Contributed to improvement initiatives for post-sale customer experience",
    ],
  },
  {
    id: "meli-jr",
    company: "Mercadolibre.com",
    role: "Customer Experience Rep Jr",
    period: "Nov 2016 – Mar 2017",
    duration: "5m",
    tags: ["Customer Experience", "Marketplace"],
    bullets: [
      "Handled customer inquiries and dispute resolution for LATAM's largest marketplace",
      "Identified recurring user friction patterns and escalated to product teams",
    ],
  },
]

export function ProjectsApp() {
  const [expandedId, setExpandedId] = useState<string | null>("willdom")

  const toggle = (id: string) => {
    const willExpand = expandedId !== id
    if (willExpand) {
      posthog.capture("experience_entry_expanded", { company_id: id })
    }
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="relative pb-4">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-2 bottom-0 w-px bg-border/40" />

        <div className="space-y-3">
          {timelineEntries.map((entry) => {
            const isExpanded = expandedId === entry.id

            return (
              <div key={entry.id} className="relative flex gap-4">
                {/* Dot */}
                <div className="relative z-10 mt-[18px] flex-shrink-0">
                  {entry.highlight === "current" ? (
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                    </span>
                  ) : entry.highlight === "notable" ? (
                    <span className="inline-flex rounded-full h-[10px] w-[10px] bg-primary" />
                  ) : (
                    <span className="inline-flex rounded-full h-2 w-2 bg-muted-foreground/50 mt-[1px]" />
                  )}
                </div>

                {/* Card */}
                <button
                  onClick={() => toggle(entry.id)}
                  className={cn(
                    "flex-1 text-left rounded-xl border p-4 transition-all duration-200",
                    "hover:border-primary/30 hover:bg-secondary/40",
                    isExpanded
                      ? "border-border/70 bg-secondary/30 shadow-sm"
                      : "border-border/40 bg-secondary/10"
                  )}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-foreground">
                        {entry.company}
                      </span>
                      {entry.badge && (
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] px-1.5 py-0 border",
                            entry.highlight === "current"
                              ? "border-accent/50 text-accent"
                              : "border-primary/40 text-primary/80"
                          )}
                        >
                          {entry.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground font-mono">
                        {entry.duration}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <p className="text-xs text-muted-foreground mt-0.5">{entry.role}</p>

                  {/* Period */}
                  <p className="text-[11px] text-muted-foreground/60 mt-0.5">{entry.period}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {entry.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 border-border/40 text-muted-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Bullets (expanded) */}
                  {isExpanded && (
                    <ul className="mt-3 space-y-1.5 border-t border-border/30 pt-3">
                      {entry.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2 text-xs text-foreground/80 leading-relaxed">
                          <span className="text-primary mt-0.5 flex-shrink-0">›</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
