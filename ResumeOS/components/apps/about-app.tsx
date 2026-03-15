"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"

const skills = [
  "Product Strategy",
  "Product Discovery",
  "Agile / Scrum / Kanban",
  "Stakeholder Management",
  "Data-Driven Development",
  "Go-to-Market Strategy",
  "AI Product Exploration",
  "LATAM Markets",
]

export function AboutApp() {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Profile Card */}
      <div className="flex flex-col items-center gap-4 rounded-xl bg-secondary/30 p-6 border border-border/50 md:w-64 shrink-0">
        <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-primary/30">
          <Image
            src="/JA-Avatar.jpeg"
            alt="Julián Álvarez"
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">Julián Álvarez</h2>
          <p className="text-sm text-primary font-mono">Product Manager</p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent border border-accent/30">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Available
          </span>
        </div>
      </div>

      {/* Bio & Skills */}
      <div className="flex flex-1 flex-col gap-6">
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">About</h3>
          <p className="text-foreground/90 leading-relaxed">
            Product Manager with 6+ years across
            <span className="text-primary font-medium"> SaaS</span>,
            <span className="text-primary font-medium"> e-commerce</span>, and
            <span className="text-primary font-medium"> B2B/B2C marketplaces</span> in LATAM.
            Currently leading Wave CRM at WillDom with a team of 11 engineers.
          </p>
          <p className="mt-3 text-foreground/90 leading-relaxed">
            Previously at MercadoLibre (NASDAQ: MELI) and Mudafy (YC S19).
            Interested in the intersection of data, automation, and AI.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary"
                className="bg-secondary/50 text-foreground/80 border border-border/50 hover:bg-primary/20 hover:text-primary transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Years XP", value: "6+" },
            { label: "Companies", value: "6" },
            { label: "User Interviews", value: "50+" },
            { label: "Stakeholders", value: "10+" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg bg-secondary/30 p-3 text-center border border-border/50">
              <p className="font-mono text-xl font-bold text-accent">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
