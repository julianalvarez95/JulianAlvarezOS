"use client"

import { useState, useRef } from "react"
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

function getScale(mouseX: number | null, el: HTMLButtonElement | null): number {
  if (mouseX === null || !el) return 1
  const rect = el.getBoundingClientRect()
  const iconCenterX = rect.left + rect.width / 2
  const distance = Math.abs(mouseX - iconCenterX)
  const MAX_DIST = 120
  if (distance >= MAX_DIST) return 1
  const t = 1 - distance / MAX_DIST
  const smooth = t * t * (3 - 2 * t)
  return 1 + 0.5 * smooth
}

export function Dock({ apps, openWindows, onAppClick }: DockProps) {
  const [mouseX, setMouseX] = useState<number | null>(null)
  const [bouncingId, setBouncingId] = useState<AppId | null>(null)
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([])

  function handleClick(id: AppId) {
    setBouncingId(id)
    setTimeout(() => setBouncingId(null), 400)
    onAppClick(id)
  }

  return (
    <div className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div
        className="flex items-end gap-1 rounded-2xl bg-card/85 px-3 py-2 backdrop-blur-xl border border-border shadow-2xl"
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
      >
        {apps.map((app, i) => {
          const isOpen = openWindows.some((w) => w.id === app.id)
          const Icon = app.icon
          const scale = getScale(mouseX, iconRefs.current[i] ?? null)

          return (
            <button
              key={app.id}
              ref={(el) => { iconRefs.current[i] = el }}
              onClick={() => handleClick(app.id)}
              className={cn(
                "group relative flex h-12 w-12 items-center justify-center rounded-xl",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              )}
              style={{
                transform: `scale(${scale})`,
                transition: "transform 150ms ease-out",
                transformOrigin: "bottom center",
              }}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-card border border-border shadow-lg",
                  bouncingId === app.id && "animate-dock-bounce"
                )}
              >
                <Icon className="h-5 w-5 text-primary" />
              </div>

              {/* App label tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-card px-2 py-1 text-xs font-medium text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 border border-border">
                {app.label}
              </span>

              {/* Open indicator — horizontal line */}
              {isOpen && (
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
