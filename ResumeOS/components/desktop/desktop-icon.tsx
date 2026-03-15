"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface DesktopIconProps {
  icon: LucideIcon
  label: string
  onClick: () => void
}

export function DesktopIcon({ icon: Icon, label, onClick }: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      onDoubleClick={onClick}
      className={cn(
        "group flex flex-col items-center gap-2 rounded-lg p-3 transition-all duration-200",
        "hover:bg-secondary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-card to-secondary border border-border/50 shadow-lg transition-transform duration-200 group-hover:scale-105 group-hover:shadow-xl">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <span className="max-w-[80px] truncate text-center text-xs font-medium text-foreground/90 drop-shadow-sm">
        {label}
      </span>
    </button>
  )
}
