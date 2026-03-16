"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { AboutApp } from "../apps/about-app"
import { ProjectsApp } from "../apps/projects-app"
import { ToolsApp } from "../apps/product-thinking-app"
import { ExperimentsApp } from "../apps/experiments-app"
import { WritingApp } from "../apps/writing-app"
import { ContactApp } from "../apps/contact-app"
import {
  User,
  FolderKanban,
  Wrench,
  FlaskConical,
  PenLine,
  Mail,
  ChevronDown,
} from "lucide-react"

type AppId = "about" | "projects" | "thinking" | "experiments" | "writing" | "contact"

const sections: { id: AppId; label: string; icon: typeof User; component: React.ComponentType }[] = [
  { id: "about", label: "About", icon: User, component: AboutApp },
  { id: "projects", label: "Experience", icon: FolderKanban, component: ProjectsApp },
  { id: "thinking", label: "Tools & Stack", icon: Wrench, component: ToolsApp },
  { id: "experiments", label: "Experiments", icon: FlaskConical, component: ExperimentsApp },
  { id: "writing", label: "Resources", icon: PenLine, component: WritingApp },
  { id: "contact", label: "Contact", icon: Mail, component: ContactApp },
]

export function MobileView() {
  const [expandedSection, setExpandedSection] = useState<AppId>("about")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <span className="font-mono text-xs font-semibold text-primary">PM_OS</span>
            <h1 className="text-lg font-bold text-foreground">Julián Álvarez</h1>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-2 py-1 text-xs text-accent border border-accent/30">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Available
          </span>
        </div>
      </header>

      {/* Sections */}
      <main className="pb-8">
        {sections.map((section) => {
          const Icon = section.icon
          const Component = section.component
          const isExpanded = expandedSection === section.id

          return (
            <section key={section.id} className="border-b border-border/30">
              <button
                onClick={() => setExpandedSection(isExpanded ? section.id : section.id)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-4 transition-colors",
                  isExpanded ? "bg-secondary/30" : "hover:bg-secondary/20"
                )}
              >
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors",
                  isExpanded 
                    ? "bg-primary/20 border-primary/30" 
                    : "bg-secondary/50 border-border/50"
                )}>
                  <Icon className={cn(
                    "h-5 w-5 transition-colors",
                    isExpanded ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                <span className={cn(
                  "flex-1 text-left font-medium transition-colors",
                  isExpanded ? "text-foreground" : "text-foreground/80"
                )}>
                  {section.label}
                </span>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform",
                  isExpanded && "rotate-180"
                )} />
              </button>

              {isExpanded && (
                <div className="px-4 pb-6 animate-in slide-in-from-top-2 duration-200">
                  <Component />
                </div>
              )}
            </section>
          )
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-card/50 px-4 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          Julián Álvarez · Product Manager
        </p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          Built as a Product Manager OS
        </p>
      </footer>
    </div>
  )
}
