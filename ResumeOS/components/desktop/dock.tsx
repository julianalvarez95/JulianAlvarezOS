"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

type AppId = "about" | "projects" | "metrics" | "thinking" | "experiments" | "writing" | "contact"

interface WindowState {
  id: AppId
  isMinimized: boolean
  zIndex: number
  position: { x: number; y: number }
}

interface DockProps {
  apps: { id: AppId; label: string; icon: LucideIcon }[]
  openWindows: WindowState[]
  onAppClick: (id: AppId) => void
}

export function Dock({ apps, openWindows, onAppClick }: DockProps) {
  return (
    <div className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-end gap-1 rounded-2xl bg-card/60 px-3 py-2 backdrop-blur-xl border border-border/50 shadow-2xl">
        {apps.map((app) => {
          const isOpen = openWindows.some((w) => w.id === app.id)
          const Icon = app.icon

          return (
            <button
              key={app.id}
              onClick={() => onAppClick(app.id)}
              className={cn(
                "group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
                "hover:scale-125 hover:bg-secondary/50",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 shadow-lg">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              
              {/* App label tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-card px-2 py-1 text-xs font-medium text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 border border-border/50">
                {app.label}
              </span>
              
              {/* Open indicator */}
              {isOpen && (
                <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
