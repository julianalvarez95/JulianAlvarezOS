"use client"

import { useEffect, useState } from "react"
import { Wifi, Battery, Volume2 } from "lucide-react"

export function TopBar() {
  const [time, setTime] = useState<string>("")
  const [date, setDate] = useState<string>("")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit",
        hour12: true 
      }))
      setDate(now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
      }))
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex h-8 items-center justify-between bg-card/80 px-4 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-semibold text-primary">PM_OS</span>
        <span className="text-xs text-muted-foreground">|</span>
        <span className="text-xs text-foreground/80">Julián Álvarez</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Wifi className="h-3.5 w-3.5" />
          <Volume2 className="h-3.5 w-3.5" />
          <Battery className="h-3.5 w-3.5" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground/80">{date}</span>
          <span className="font-mono text-xs font-medium text-foreground">{time}</span>
        </div>
      </div>
    </div>
  )
}
