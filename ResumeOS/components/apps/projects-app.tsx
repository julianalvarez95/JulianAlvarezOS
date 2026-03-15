"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, X } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "Wave CRM",
    description: "Leading Wave CRM at WillDom — pipeline visibility & sales ops for distributed teams (team of 11 engineers)",
    impact: "11-eng team",
    tags: ["SaaS", "CRM", "B2B", "AI"],
    caseStudy: {
      context: "Wave CRM is a SaaS platform for pipeline visibility and sales ops for distributed teams. I joined WillDom in July 2024 as PM owning the full product with a cross-functional team of 11 engineers.",
      problem: "Commercial teams lacked visibility into pipeline stages, discovery was manual, and decisions were made without data. Sales reps had no structured follow-up workflows.",
      execution: "Defined and owned the full product roadmap. Built core CRM capabilities (company/persona search, advanced filtering), pipeline features (activity logs, follow-up workflows, time-in-stage tracking), analytics dashboards, KPI widgets, and explored AI-assisted recommendations.",
      impact: "Improved pipeline visibility, reduced manual sales ops work, introduced data-driven decision-making tools for commercial teams.",
      learnings: "CRM adoption depends on reducing friction at data-entry points. AI recommendations only work if the underlying data model is clean.",
    },
  },
  {
    id: 2,
    name: "MercadoLibre Verticals",
    description: "Marketplace category growth across Autoparts, Motoparts, Agro, Sports & Fashion in LATAM (NASDAQ: MELI)",
    impact: "3 markets",
    tags: ["Marketplace", "B2C", "LATAM", "Analytics"],
    caseStudy: {
      context: "LATAM's largest marketplace (NASDAQ: MELI). I managed Autoparts, Motoparts, Agro categories across Argentina, Brazil, Mexico, and Chile from Sep 2018 to Apr 2022.",
      problem: "Verticals had fragmented structured data, weak seller metrics, and no unified roadmap connecting IT/Product to commercial goals. Category discovery and conversion suffered from poor catalog quality.",
      execution: "Coordinated multidisciplinary teams (IT, UX, Marketing, Advertising, Business Analytics). Developed structured data strategy for verticals. Led Sports & Fashion initiative to become the main online fashion destination in LATAM. Analyzed metrics via Tableau, MySQL, Looker, and Salesforce.",
      impact: "Drove key vertical initiatives across 3 regional markets. Promoted to Coordinator role managing a team across 3 locations (Mexico, Argentina, Brazil).",
      learnings: "In marketplace products, catalog quality is the foundation of everything. Without clean, structured data, discovery, search, and conversion all suffer.",
    },
  },
  {
    id: 3,
    name: "Mudafy CRM (YC S19)",
    description: "PM for CRM serving 200+ internal users at YC-backed proptech startup in LATAM",
    impact: "50+ interviews",
    tags: ["Proptech", "CRM", "YC-backed", "Discovery"],
    caseStudy: {
      context: "Mudafy is a YC S19-backed proptech company operating in LATAM. I joined Oct 2022 to improve the CRM for 200+ internal users, primarily the sales ops team in Mexico.",
      problem: "Sales ops team had low visibility into lead status, agents lacked structured follow-up workflows, and OKR tracking was manual and inconsistent.",
      execution: "Conducted 50+ user interviews to identify friction points. Benchmarked 4 market tools. Prioritized 15+ solutions for the quarter's backlog. Tracked 10+ new features. Built and tracked dashboards in BigQuery + Data Studio. Created and tracked OKRs for 5 initiatives.",
      impact: "Kept 200+ users informed and operating through system improvements. Established OKR cadence for 5 key initiatives across the ops team.",
      learnings: "In fast-moving startups, user interviews are the fastest way to cut through opinion and prioritize real pain. Running 50 interviews in a 4-month engagement changes what ends up in the backlog.",
    },
  },
]

export function ProjectsApp() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <div className="relative">
      {/* Project Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group flex flex-col gap-3 rounded-xl bg-secondary/30 p-4 text-left border border-border/50 transition-all hover:bg-secondary/50 hover:border-primary/30 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="text-xs border-border/50 text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-auto pt-2 border-t border-border/30">
              <span className="font-mono text-lg font-bold text-accent">{project.impact}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="absolute inset-0 z-10 overflow-auto rounded-lg bg-card/98 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="sticky top-0 flex items-center justify-between border-b border-border/50 bg-card/95 p-4 backdrop-blur-sm">
            <div>
              <h2 className="text-lg font-bold text-foreground">{selectedProject.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedProject(null)}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6 p-4">
            {[
              { title: "Context", content: selectedProject.caseStudy.context },
              { title: "Problem", content: selectedProject.caseStudy.problem },
              { title: "Execution", content: selectedProject.caseStudy.execution },
              { title: "Impact", content: selectedProject.caseStudy.impact },
              { title: "Learnings", content: selectedProject.caseStudy.learnings },
            ].map((section, index) => (
              <div key={section.title}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-mono font-bold text-primary">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                </div>
                <p className="pl-8 text-sm text-foreground/80 leading-relaxed">{section.content}</p>
              </div>
            ))}

            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
              {selectedProject.tags.map((tag) => (
                <Badge key={tag} className="bg-primary/20 text-primary border-primary/30">
                  {tag}
                </Badge>
              ))}
              <Badge className="bg-accent/20 text-accent border-accent/30 ml-auto">
                {selectedProject.impact}
              </Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
