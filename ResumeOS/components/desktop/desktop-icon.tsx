"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface DesktopIconProps {
  icon: LucideIcon
  label: string
  onClick: () => void
  gradient?: string
}

export function DesktopIcon({ icon: Icon, label, onClick, gradient }: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      onDoubleClick={onClick}
      className={cn(
        "group flex flex-col items-center gap-1.5 rounded-lg p-2 transition-all duration-200",
        "hover:bg-secondary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-card/50 border border-border/40 shadow-lg transition-transform duration-200 group-hover:scale-105 group-hover:shadow-xl">
        <Icon className="h-7 w-7 text-foreground/70" />
      </div>
      <span className="max-w-[80px] truncate text-center text-xs font-medium text-foreground/90 drop-shadow-sm">
        {label}
      </span>
    </button>
  )
}
