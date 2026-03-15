"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, X } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "Marketplace Growth",
    description: "Led growth initiatives for B2B marketplace platform",
    impact: "+18% conversion",
    tags: ["Growth", "Marketplace", "Analytics"],
    caseStudy: {
      context: "A B2B marketplace struggling with low buyer conversion rates despite strong traffic. The platform had 50K monthly active users but conversion from visit to purchase was stuck at 2.1%.",
      problem: "Users were abandoning the purchase funnel at the seller selection stage. Research revealed information overload and lack of trust signals.",
      hypothesis: "If we simplify seller comparison and add social proof elements, conversion will increase by at least 10%.",
      execution: "Redesigned seller cards with trust badges, verified reviews, and response time metrics. A/B tested with 20% of traffic over 6 weeks.",
      impact: "+18% conversion rate, $1.2M additional GMV in Q4, 15% increase in repeat purchases",
      learnings: "Social proof was 3x more impactful than we expected. Future iterations should prioritize trust signals over feature lists.",
    },
  },
  {
    id: 2,
    name: "Internal ERP Platform",
    description: "Built operations platform serving 200+ internal users",
    impact: "+22% activation",
    tags: ["Internal Tools", "UX", "Automation"],
    caseStudy: {
      context: "Operations team using fragmented tools (spreadsheets, legacy systems) causing 15+ hours/week of manual work per employee.",
      problem: "No single source of truth for order management, leading to errors and delayed fulfillment. Employee satisfaction with tools was at 35%.",
      hypothesis: "A unified platform with smart automation will reduce manual work by 50% and improve data accuracy.",
      execution: "Built MVP with core workflows in 3 months. Iterated based on user feedback, adding automation rules and integrations.",
      impact: "+22% user activation, 60% reduction in manual tasks, employee tool satisfaction up to 78%, $400K annual cost savings",
      learnings: "Power users became champions and drove adoption. Early involvement of end-users in design was crucial.",
    },
  },
  {
    id: 3,
    name: "AI Product Experiment",
    description: "Prototype AI assistant for customer support automation",
    impact: "$3M revenue",
    tags: ["AI/ML", "Experimentation", "Scale"],
    caseStudy: {
      context: "Customer support team handling 10K+ tickets/month with average resolution time of 4 hours. Leadership wanted to explore AI solutions.",
      problem: "High volume of repetitive queries (60%) consuming agent time. CSAT dropping due to slow response times.",
      hypothesis: "An AI assistant handling L1 queries can reduce resolution time by 40% while maintaining CSAT above 4.2.",
      execution: "Built GPT-powered assistant with RAG for knowledge base. Piloted with 10% of incoming tickets, gradually scaled to 60%.",
      impact: "AI handles 45% of tickets autonomously, resolution time down 55%, CSAT improved to 4.5, enabled premium support tier generating $3M ARR",
      learnings: "Human-in-the-loop critical for edge cases. Clear escalation paths maintained trust with both agents and customers.",
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
              { title: "Hypothesis", content: selectedProject.caseStudy.hypothesis },
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
