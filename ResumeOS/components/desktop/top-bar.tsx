"use client"

import { useEffect, useState } from "react"
import { Wifi, Battery, Volume2, Settings } from "lucide-react"

export function TopBar() {
  const [time, setTime] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [uptime, setUptime] = useState<string>("")

  useEffect(() => {
    const BOOT_DATE = new Date("2025-03-01T00:00:00Z")
    const now = new Date()
    const diffH = Math.floor((now.getTime() - BOOT_DATE.getTime()) / (1000 * 60 * 60))
    setUptime(`up ${Math.floor(diffH / 24)}d ${diffH % 24}h`)
  }, [])

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }))
      setDate(now.toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }))
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute top-0 left-0 right-0 z-50 grid h-8 grid-cols-3 items-center bg-card/90 px-4 backdrop-blur-md border-b border-border">
      {/* Left: shell prompt */}
      <div className="flex items-center">
        <span className="font-mono text-xs text-green-400/80">
          visitor@julian-os:~
        </span>
      </div>

      {/* Center: date + time */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs text-foreground/70">{date}</span>
        <span className="font-mono text-xs font-semibold text-foreground">{time}</span>
      </div>

      {/* Right: system tray */}
      <div className="flex items-center justify-end gap-3">
        {uptime && (
          <span className="font-mono text-xs text-muted-foreground">{uptime}</span>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Volume2 className="h-3.5 w-3.5" />
          <Wifi className="h-3.5 w-3.5" />
          <Battery className="h-3.5 w-3.5" />
        </div>
        <button className="flex items-center justify-center rounded-md p-0.5 text-muted-foreground hover:bg-secondary/50 transition-colors">
          <Settings className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
