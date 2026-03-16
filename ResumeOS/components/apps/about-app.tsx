"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, Sparkles } from "lucide-react"

const skillGroups = [
  {
    label: "Strategy",
    skills: ["Product Strategy", "Roadmap Planning", "Go-to-Market", "OKRs & Metrics"],
  },
  {
    label: "Execution",
    skills: ["Agile / Scrum", "Sprint Ceremonies", "Stakeholder Management", "Cross-functional Teams"],
  },
  {
    label: "Discovery",
    skills: ["User Interviews", "Jobs-to-be-Done", "Usability Testing", "Opportunity Mapping"],
  },
  {
    label: "Technical",
    skills: ["SQL / BigQuery", "Data Analysis", "A/B Testing", "AI Product Exploration"],
  },
]

const stats = [
  { label: "Years XP", value: "6+" },
  { label: "Companies", value: "6" },
  { label: "User Interviews", value: "50+" },
  { label: "Eng. Team", value: "11" },
]

const quickFacts = [
  { icon: MapPin, text: "Buenos Aires, Argentina" },
  { icon: Briefcase, text: "Wave CRM · WillDom" },
  { icon: Sparkles, text: "Data · Automation · AI" },
]

const bioItems = [
  {
    text: (
      <>
        PM with <span className="text-primary font-medium">6+ years</span> building digital products across{" "}
        <span className="text-primary font-medium">SaaS</span>,{" "}
        <span className="text-primary font-medium">e-commerce</span>, and{" "}
        <span className="text-primary font-medium">B2B/B2C marketplaces</span> in LATAM.
      </>
    ),
  },
  {
    text: (
      <>
        Currently leading the roadmap for{" "}
        <span className="text-primary font-medium">Wave CRM at WillDom</span>, coordinating a
        cross-functional team of 11 engineers from discovery to go-to-market.
      </>
    ),
  },
  {
    text: (
      <>
        Previously at <span className="text-primary font-medium">MercadoLibre (NASDAQ: MELI)</span> — where I built
        catalog infrastructure and vertical strategy across Argentina, Brazil, and Mexico — and{" "}
        <span className="text-primary font-medium">Mudafy (YC S19)</span>, where I led internal tooling and CRM
        for a proptech with $200M+ in annualized transaction value.
      </>
    ),
  },
  {
    text: (
      <>
        Interested in the intersection of{" "}
        <span className="text-primary font-medium">data</span>,{" "}
        <span className="text-primary font-medium">automation</span>, and{" "}
        <span className="text-primary font-medium">artificial intelligence</span> applied to real product problems.
      </>
    ),
  },
]

export function AboutApp() {
  return (
    <div className="flex flex-col gap-4 md:flex-row h-full">
      {/* Left: Profile Card */}
      <div className="flex flex-col items-center gap-4 rounded-xl bg-secondary/30 p-5 border border-border/50 md:w-52 shrink-0">
        <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-primary/30">
          <Image
            src="/JA-Avatar.jpeg"
            alt="Julian Alvarez"
            width={80}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground">Julian Alvarez</h2>
          <p className="text-xs text-primary font-mono">Product Manager</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent border border-accent/30">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Available
        </span>

        {/* Quick facts */}
        <div className="w-full space-y-2 pt-1 border-t border-border/30">
          {quickFacts.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground pt-1 first:pt-2">
              <Icon className="h-3 w-3 shrink-0 text-primary/60" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 w-full pt-1">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-secondary/40 p-2 text-center border border-border/40">
              <p className="font-mono text-base font-bold text-accent">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Bio + Skills */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto min-w-0">
        {/* Bio */}
        <div className="rounded-xl border border-border/50 bg-secondary/20 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Background
          </h3>
          <ul className="space-y-2">
            {bioItems.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-foreground/80 leading-relaxed">
                <span className="text-primary/70 mt-0.5 shrink-0">›</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills by category */}
        <div className="rounded-xl border border-border/50 bg-secondary/20 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Skills
          </h3>
          <div className="space-y-3">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 mb-1.5 block">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-secondary/50 text-foreground/80 border border-border/50 hover:bg-primary/20 hover:text-primary transition-colors text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
