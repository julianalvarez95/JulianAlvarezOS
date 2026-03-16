"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import posthog from "posthog-js"

// ─── Timeline ────────────────────────────────────────────────────────────────

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

// ─── Case Studies ─────────────────────────────────────────────────────────────

interface CaseStudy {
  id: string
  company: string
  companyBadge?: string
  title: string
  preview: string
  paragraphs: string[]
}

const caseStudies: CaseStudy[] = [
  {
    id: "tires",
    company: "MercadoLibre",
    companyBadge: "NASDAQ: MELI",
    title: "Tires — Mercado Envíos Coverage",
    preview:
      "Took Mercado Envíos coverage in the Tires category from 38% to 80%+ in 6 months, unblocking logistics operations for the top 15 brands in a top-3 revenue vertical.",
    paragraphs: [
      "Tires was one of the three highest-revenue categories within the Auto Parts vertical on MercadoLibre, but when I took on the project, less than 40% of its catalog listings had Mercado Envíos enabled. For a category of that volume, that number was a structural problem: sellers couldn't compete on equal footing, and buyers encountered unnecessary friction at checkout.",
      "The challenge wasn't purely technical. Tires have a high attribute complexity — size, profile, rim, usage type — and the catalog wasn't configured for those attributes to map correctly against Mercado Envíos' logistics requirements. I coordinated across data, category, and operations teams to structure the product sheets for the top 15 brands in the segment, ensuring every catalog variant could support shipping consistently.",
      "In 6 months, we went from less than 40% to over 80% Mercado Envíos coverage in the category. The catalog stopped being a bottleneck and became a real operational enabler for one of the marketplace's most important verticals.",
    ],
  },
  {
    id: "auto-parts",
    company: "MercadoLibre",
    companyBadge: "NASDAQ: MELI",
    title: "Auto Parts Compatibility System",
    preview:
      "Built the Auto Parts compatibility system from scratch — reducing up to 7 duplicate SKUs down to 1 per part, and improving the purchase experience for a user base where 85% of buyers are non-specialists.",
    paragraphs: [
      "The Auto Parts vertical on MercadoLibre had a structural problem that no one had solved: more than 85% of buyers in the category are not specialists. Without a reliable system telling them \"this part fits your car,\" the incompatibility claim rate was high and the purchase experience was fundamentally broken.",
      "On the seller side, the problem was equally serious but different: to cover all possible year/model/version combinations of a vehicle, the same part was being listed in up to 7 different publications. That multiplied virtual stock, inflated catalog management costs, and generated duplicates that the algorithm penalized.",
      "I led this project from scratch. My role was to coordinate the construction and normalization of the compatibility system — designing the vehicle catalog, defining the attribute structure (brand, model, year, version, position), and driving data entry across my entire portfolio of brands and top sellers in the vertical. To achieve this, I developed workshops, adoption initiatives, and incentives that turned sellers themselves into data entry and validation agents.",
      "The result was a dramatic reduction in fragmentation: where up to 7 listings once existed for the same part, today there is 1 — with all compatibility information structured within it. This reduced incompatibility claims, lowered catalog storage costs, and improved the experience for non-specialist buyers who can now filter by their vehicle with precision. A project that accompanied the growth of auto parts e-commerce in LatAm from 6% to 13% market penetration since 2017.",
    ],
  },
  {
    id: "fashion",
    company: "MercadoLibre",
    companyBadge: "NASDAQ: MELI",
    title: "Fashion Size Guide",
    preview:
      "Built the Fashion Size Guide from scratch — normalizing AR/US/EU sizing systems across brands and reducing incorrect-size returns in a vertical with 329M active listings.",
    paragraphs: [
      "Fashion is one of the highest post-purchase friction categories in any marketplace: buyers can't try on products, sizing systems vary by brand, region, and garment type, and the information published by sellers was inconsistent. In a marketplace with over 329 million active listings and 267 million items sold per quarter, every return due to incorrect sizing had a direct operational and reputational cost for the seller — and a trust cost for the platform.",
      "I led the construction and implementation of the Size Guide for the Fashion category from scratch. The central challenge wasn't technical: it was normalization. Different brands used incompatible sizing systems (AR, US, EU), different garment types required different data structures, and sellers — many publishing at scale — had no clear incentives to load information they considered optional.",
      "My role was to coordinate across product, data, and category teams to design a guide structure that could absorb that heterogeneity, and then drive adoption directly with brands and top sellers in the vertical. The resulting system allows each seller to map their own sizes against standardized equivalencies per product domain, with automatic validation that pauses listings with incomplete data before they reach the buyer.",
      "Direct impact: reduction in returns due to incorrect sizing, lower volume of pre-purchase questions, and improved positioning for listings with a complete guide — in a vertical where Commerce grew 40% YoY in Q1'22 and where data completeness became a real competitive advantage for sellers who adopted the system.",
    ],
  },
  {
    id: "agro",
    company: "MercadoLibre",
    companyBadge: "NASDAQ: MELI",
    title: "Agro L1 Category Launch",
    preview:
      "Launched Agro as an L1 vertical on MELI from scratch — designing the full taxonomy, migrating 10K+ listings, and onboarding the top brands in the agricultural sector.",
    paragraphs: [
      "Agro didn't exist as its own vertical on MercadoLibre — its products were scattered across generic categories like Industries, invisible to specialized buyers and lacking the technical structure the sector requires. With an agricultural sector representing a significant share of the region's GDP and a seller base historically operating offline, the opportunity was clear but the starting point was complex.",
      "I led the implementation of Agro as an L1 category from scratch: I designed the complete taxonomy — the category and subcategory tree that today includes everything from Agricultural Machinery and Spare Parts to Beekeeping, Renewable Energy, and Livestock Inputs — coordinating with internal catalog, logistics, and data teams to ensure every level made operational sense, not just classificatory sense.",
      "The challenges were simultaneous. The taxonomy required technical attributes that didn't exist in MELI's traditional catalog — machinery specifications, agricultural spare part compatibilities, input parameters — all of which had to be built from scratch. Mercado Envíos needed to be adapted for high-volume, high-weight products outside the standard. And sellers in the sector, many operating traditionally for years, required specific support to digitize their catalog and migrate their listings to the new structure.",
      "The result: over 10,000 listings migrated and reclassified, the top-of-mind brands in the agricultural sector onboarded to the platform, and a vertical that went from being buried in generic categories to having its own identity, correct technical attributes, and real logistics support for large-format products.",
    ],
  },
  {
    id: "paisanos",
    company: "Paisanos",
    title: "Software Factory PM",
    preview:
      "PM across simultaneous projects in insurtech, retail, and gaming — leading discovery, definition, and delivery with teams of 5–6 people from brief to production.",
    paragraphs: [
      "Paisanos is a software factory where I worked as PM on simultaneous and sequential projects for clients across different industries — insurtech, retail, and gaming. The common denominator was the team model: 2–3 fullstack devs, 2 designers, and 1–2 QA, with no intermediate management layers. In that context, the PM is the only coordination point between the client, the team, and external vendors.",
      "Among the projects I led: the RUS online insurance quoter, which replaced a manual broker-based quotation process with a self-assisted flow that issues policies in real time by integrating the La Nación Seguros API — reducing quotation time by 30% in 6 months; and the Grido Club mobile app, the digital loyalty program for one of Argentina's largest ice cream chains.",
      "My work on each project followed the same cycle: discovery with stakeholders to define the real problem before writing a single line of spec, scope and roadmap definition with the team, coordination with external vendors when the product required it, and hands-on support during execution to maintain focus and unblock decisions. With small teams, clarity in product definition isn't a nice-to-have — it's what determines whether a sprint delivers value or rework.",
    ],
  },
  {
    id: "magoya",
    company: "Magoya",
    title: "AgTech Group PM",
    preview:
      "Group PM in AgTech for Xarvio (BASF), Bayer US, and Bayer Cono Sur — from farmer discovery in the US to integrating 10+ internal tools into a single platform.",
    paragraphs: [
      "In 8 months at Magoya I worked as Group PM on digital agriculture projects for three simultaneous enterprise clients — all operating at the frontier of agronomy, data, and technology.",
      "For Xarvio (BASF EU), I led the full discovery process: 10 farmer interviews in the United States, competitive benchmarking, and market research that resulted in findings presented to Xarvio US C-level. The deliverable was a product definition with high-quality wireframes and a map of upselling and cross-selling opportunities — a strategic output, not just a functional one.",
      "For Bayer US / Climate FieldView, I worked on the development of internal applications built on the world's largest field data platform, focused on the two most important crops in the United States: wheat and corn.",
      "For Bayer Cono Sur, I led the full development cycle of Cultivio and Experto Bayer — including an integration project that consolidated more than 10 dispersed internal tools into a single application, reducing operational fragmentation for the regional agronomy team.",
      "In parallel, I developed Agro 101, an internal Magoya wiki to help non-agronomic profiles adopt agricultural concepts with real context — market research, official reports, and benchmarks organized as a living resource for the team.",
    ],
  },
  {
    id: "mudafy",
    company: "Mudafy",
    companyBadge: "YC S19",
    title: "Proptech Internal Tools",
    preview:
      "PM at Mudafy (YC S19) — built the internal visit management CRM, operational dashboards, and WhatsApp automation to scale agent efficiency at a proptech with $200M in annualized transaction value.",
    paragraphs: [
      "Mudafy is a YC-backed proptech operating in Argentina and Mexico with over $200M in annualized transaction value and a clear objective: make its agents 5x more efficient than the industry average in a market where the sector's historical NPS is -40. That efficiency isn't achieved with great agents alone — it's achieved with tools that eliminate operational friction at every step of the process.",
      "My role as PM was to build and scale the internal tools that supported that promise. I developed Mudafy's internal CRM for visit and client feedback management — the system that allows agents to coordinate showings, log buyer signals, and keep the pipeline organized in a market where a single day of property visits can involve more than 10 different parties. In an operation with over 50,000 active properties and 1M MAUs, the quality of internal data is what separates a business decision from a gut feeling.",
      "I complemented that with Data Studio dashboards to monitor implementations in real time — giving the team operational visibility without relying on manual reports. And I developed a WhatsApp chatbot using MessageBird, the dominant communication channel in LatAm, to reduce lead response time and automate the first point of contact in a process where response speed directly impacts conversion.",
    ],
  },
]

// ─── Timeline Component ───────────────────────────────────────────────────────

function Timeline() {
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

// ─── Case Studies Component ───────────────────────────────────────────────────

function CaseStudiesView() {
  const [selectedId, setSelectedId] = useState<string>(caseStudies[0].id)
  const selected = caseStudies.find((cs) => cs.id === selectedId)!

  return (
    <div className="flex h-full gap-0 overflow-hidden">
      {/* Left: list */}
      <div className="w-[35%] flex-shrink-0 border-r border-border/40 overflow-y-auto pr-0">
        <div className="space-y-1 p-1">
          {caseStudies.map((cs) => {
            const isSelected = cs.id === selectedId
            return (
              <button
                key={cs.id}
                onClick={() => setSelectedId(cs.id)}
                className={cn(
                  "w-full text-left rounded-lg px-3 py-2.5 transition-all duration-150",
                  isSelected
                    ? "bg-secondary/60 border border-border/60"
                    : "hover:bg-secondary/30 border border-transparent"
                )}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[11px] font-medium text-primary/80 truncate">
                    {cs.company}
                  </span>
                  {cs.companyBadge && (
                    <Badge
                      variant="outline"
                      className="text-[9px] px-1 py-0 border-primary/30 text-primary/60 flex-shrink-0"
                    >
                      {cs.companyBadge}
                    </Badge>
                  )}
                </div>
                <p className="text-xs font-semibold text-foreground leading-snug">{cs.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
                  {cs.preview}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Right: detail */}
      <ScrollArea className="flex-1 min-w-0">
        <div className="px-5 py-4">
          {/* Header */}
          <div className="flex items-start gap-2 mb-1">
            <span className="text-[11px] font-medium text-primary/80">{selected.company}</span>
            {selected.companyBadge && (
              <Badge
                variant="outline"
                className="text-[9px] px-1.5 py-0 border-primary/30 text-primary/60"
              >
                {selected.companyBadge}
              </Badge>
            )}
          </div>
          <h2 className="text-base font-bold text-foreground leading-tight mb-2">
            {selected.title}
          </h2>

          {/* Preview */}
          <p className="text-xs text-primary/80 italic leading-relaxed border-l-2 border-primary/30 pl-3 mb-4">
            {selected.preview}
          </p>

          <Separator className="mb-4 bg-border/40" />

          {/* Full text */}
          <div className="space-y-3">
            {selected.paragraphs.map((para, i) => (
              <p key={i} className="text-xs text-foreground/80 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function ProjectsApp() {
  return (
    <Tabs defaultValue="timeline" className="flex flex-col h-full">
      <TabsList className="mx-4 mt-1 mb-2 self-start h-7 bg-secondary/40">
        <TabsTrigger value="timeline" className="text-xs h-6 px-3">
          Timeline
        </TabsTrigger>
        <TabsTrigger value="case-studies" className="text-xs h-6 px-3">
          Case Studies
        </TabsTrigger>
      </TabsList>

      <TabsContent value="timeline" className="flex-1 overflow-hidden px-4 pb-4 mt-0">
        <Timeline />
      </TabsContent>

      <TabsContent value="case-studies" className="flex-1 overflow-hidden px-2 pb-2 mt-0">
        <CaseStudiesView />
      </TabsContent>
    </Tabs>
  )
}
