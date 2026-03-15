"use client"

import { Package, FlaskConical, Users, TrendingUp, Target, Zap, BarChart3 } from "lucide-react"

const metrics = [
  {
    label: "Years in Product",
    value: "6+",
    icon: Package,
    change: "LATAM markets",
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  {
    label: "User Interviews",
    value: "50+",
    icon: FlaskConical,
    change: "Research-first",
    color: "text-accent",
    bgColor: "bg-accent/20",
  },
  {
    label: "Engineers in Team",
    value: "11",
    icon: Users,
    change: "Cross-functional",
    color: "text-chart-4",
    bgColor: "bg-chart-4/20",
  },
  {
    label: "PM Success Rate",
    value: "95%",
    icon: TrendingUp,
    change: "Novolabs data",
    color: "text-chart-3",
    bgColor: "bg-chart-3/20",
  },
]

const additionalMetrics = [
  { label: "PM Roles", value: "6", icon: Target },
  { label: "Markets", value: "4", icon: Zap },
  { label: "Stakeholders", value: "10+", icon: Users },
  { label: "Backlog Items", value: "40+", icon: TrendingUp },
]

export function MetricsApp() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <BarChart3 className="h-4 w-4" />
        <span className="text-xs font-mono uppercase tracking-wider">Product Analytics Dashboard</span>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div
              key={metric.label}
              className="group flex items-start gap-4 rounded-xl bg-secondary/30 p-4 border border-border/50 transition-all hover:bg-secondary/50 hover:border-primary/30"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${metric.bgColor} border border-border/30`}>
                <Icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-2xl font-bold text-foreground">{metric.value}</span>
                <span className="text-sm font-medium text-foreground/80">{metric.label}</span>
                <span className="text-xs text-muted-foreground">{metric.change}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Additional Stats */}
      <div className="rounded-xl bg-secondary/20 p-4 border border-border/30">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Performance Indicators</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {additionalMetrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div key={metric.label} className="text-center">
                <Icon className="mx-auto mb-2 h-4 w-4 text-muted-foreground" />
                <p className="font-mono text-lg font-bold text-foreground">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Activity Graph Placeholder */}
      <div className="rounded-xl bg-secondary/20 p-4 border border-border/30">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contribution Activity</h3>
        <div className="flex gap-1 flex-wrap">
          {Array.from({ length: 52 }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const intensity = Math.random()
                let bgClass = "bg-border/30"
                if (intensity > 0.8) bgClass = "bg-accent"
                else if (intensity > 0.6) bgClass = "bg-accent/60"
                else if (intensity > 0.4) bgClass = "bg-primary/60"
                else if (intensity > 0.2) bgClass = "bg-primary/30"
                
                return (
                  <div
                    key={dayIndex}
                    className={`h-2.5 w-2.5 rounded-sm ${bgClass} transition-colors hover:ring-1 hover:ring-foreground/20`}
                  />
                )
              })}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Product activity over the last year</p>
      </div>
    </div>
  )
}
