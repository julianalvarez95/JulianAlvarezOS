"use client"

import { useState } from "react"
import { ChevronDown, ListOrdered, FlaskConical, Search, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

const frameworks = [
  {
    id: "prioritization",
    title: "How I Prioritize Features",
    icon: ListOrdered,
    summary: "RICE framework combined with strategic alignment",
    content: `I use a modified RICE framework (Reach, Impact, Confidence, Effort) combined with strategic alignment scoring.

**My Process:**
1. **Gather inputs**: Customer feedback, analytics data, stakeholder requests, competitive intel
2. **Score each opportunity**: Using a weighted RICE model where Impact carries 2x weight
3. **Strategic filter**: Does this align with our OKRs? Does it create defensible value?
4. **Effort calibration**: Engineering team provides T-shirt sizing, I convert to sprint estimates
5. **Stack rank**: Final priority = (Impact × 2 + Reach + Confidence) / Effort × Strategic Alignment

**Key insight**: I always keep 20% of capacity for quick wins and tech debt. This keeps the team motivated and the codebase healthy.`,
  },
  {
    id: "experimentation",
    title: "How I Run Experiments",
    icon: FlaskConical,
    summary: "Hypothesis-driven development with clear success metrics",
    content: `Every feature is an experiment. I treat launches as hypotheses to validate, not finished products.

**Experiment Framework:**
1. **Hypothesis**: "If we [change X], then [metric Y] will improve by [Z%] because [user behavior reason]"
2. **Sample size**: Calculate minimum detectable effect, determine required sample
3. **Duration**: Typically 2-4 weeks, accounting for weekly cycles
4. **Guardrail metrics**: What shouldn't get worse? (e.g., conversion rate while testing engagement)
5. **Decision criteria**: Pre-commit to ship/kill/iterate thresholds

**Tools I use**: Amplitude for analytics, Statsig for experiments, Notion for documentation.

**Win rate**: ~34% of experiments show statistically significant positive results. The other 66% are still valuable learning.`,
  },
  {
    id: "discovery",
    title: "My Discovery Workflow",
    icon: Search,
    summary: "Continuous discovery integrated into weekly sprints",
    content: `Discovery isn't a phase—it's a continuous habit. I aim for at least 2 customer conversations per week.

**Weekly Discovery Rhythm:**
- **Monday**: Review last week's learnings, update opportunity solution tree
- **Tuesday-Wednesday**: 2-3 user interviews or usability tests
- **Thursday**: Synthesize insights, update hypotheses
- **Friday**: Share learnings with team, update roadmap if needed

**Interview techniques I use:**
- Jobs-to-be-Done framework for understanding motivation
- 5 Whys for root cause analysis
- Prototype testing for validation
- Diary studies for understanding context

**Documentation**: Everything goes into a searchable research repository. Past insights often become relevant for future decisions.`,
  },
  {
    id: "thinking",
    title: "Product Thinking Principles",
    icon: Lightbulb,
    summary: "Core beliefs that guide my product decisions",
    content: `These principles guide my day-to-day decision making:

**1. Outcomes over outputs**
Ship less, learn more. A failed experiment that teaches us something is better than a successful feature that doesn't move metrics.

**2. User problems, not solutions**
Fall in love with the problem. The first solution is rarely the best one.

**3. Data-informed, not data-driven**
Quantitative data tells you what's happening. Qualitative research tells you why. You need both.

**4. Small bets, fast feedback**
Ship the smallest thing that tests the riskiest assumption first.

**5. Clarity over certainty**
It's okay to not know. It's not okay to not have a plan to find out.

**6. Compound improvements**
Small improvements compound. 1% better every week = 67% better in a year.`,
  },
]

export function ProductThinkingApp() {
  const [expandedId, setExpandedId] = useState<string | null>("prioritization")

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <Lightbulb className="h-4 w-4" />
        <span className="text-xs font-mono uppercase tracking-wider">Knowledge Base</span>
      </div>

      {frameworks.map((framework) => {
        const Icon = framework.icon
        const isExpanded = expandedId === framework.id

        return (
          <div
            key={framework.id}
            className="rounded-xl border border-border/50 bg-secondary/20 overflow-hidden transition-all"
          >
            <button
              onClick={() => setExpandedId(isExpanded ? null : framework.id)}
              className="flex w-full items-center gap-3 p-4 text-left hover:bg-secondary/30 transition-colors"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 border border-primary/30">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{framework.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{framework.summary}</p>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                  isExpanded && "rotate-180"
                )}
              />
            </button>

            {isExpanded && (
              <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
                <div className="rounded-lg bg-card/50 p-4 border border-border/30">
                  <div className="prose prose-sm prose-invert max-w-none">
                    {framework.content.split("\n\n").map((paragraph, index) => {
                      if (paragraph.startsWith("**") && paragraph.includes(":**")) {
                        const [title, ...rest] = paragraph.split(":**")
                        return (
                          <div key={index} className="mb-3">
                            <h4 className="text-sm font-semibold text-primary mb-1">
                              {title.replace(/\*\*/g, "")}:
                            </h4>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                              {rest.join(":**")}
                            </p>
                          </div>
                        )
                      }
                      if (paragraph.match(/^\d\./)) {
                        return (
                          <ol key={index} className="list-decimal list-inside space-y-1 text-sm text-foreground/80 mb-3">
                            {paragraph.split("\n").map((line, lineIndex) => (
                              <li key={lineIndex} className="leading-relaxed">
                                {line.replace(/^\d+\.\s*\*\*([^*]+)\*\*:?\s*/, "").trim()}
                              </li>
                            ))}
                          </ol>
                        )
                      }
                      return (
                        <p key={index} className="text-sm text-foreground/80 leading-relaxed mb-3">
                          {paragraph}
                        </p>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
