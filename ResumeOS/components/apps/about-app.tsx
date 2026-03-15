"use client"

import { Badge } from "@/components/ui/badge"

const skills = [
  "Product Strategy",
  "Experimentation",
  "Product Analytics",
  "AI Products",
  "Technical Collaboration",
  "User Research",
  "Roadmap Planning",
  "Agile/Scrum",
]

export function AboutApp() {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Profile Card */}
      <div className="flex flex-col items-center gap-4 rounded-xl bg-secondary/30 p-6 border border-border/50 md:w-64 shrink-0">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-3xl font-bold text-primary-foreground">
          JA
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
            Product Manager with 6+ years of experience building digital products across 
            <span className="text-primary font-medium"> SaaS</span>, 
            <span className="text-primary font-medium"> marketplaces</span>, and 
            <span className="text-primary font-medium"> internal tools</span>. 
            I specialize in turning complex problems into simple, scalable solutions through 
            experimentation and data-driven decision making.
          </p>
          <p className="mt-3 text-foreground/90 leading-relaxed">
            Currently focused on AI-powered products and automation systems. 
            I thrive at the intersection of business strategy and technical execution, 
            working closely with engineering teams to ship products that move metrics.
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
            { label: "Products", value: "12" },
            { label: "Teams Led", value: "8" },
            { label: "Impact", value: "$3M+" },
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
