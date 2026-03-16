"use client"

import { useEffect, useState } from "react"

const BOOT_LINES = [
  "[    0.000000] Booting JulianAlvarezOS kernel 6.1.0-julian...",
  "[    0.183741] ACPI: Core revision 20230331",
  "[    0.412093] Mounting /proc filesystem... OK",
  "[    0.618204] Loading portfolio modules:",
  "[    0.701337]   about.ko        [OK]",
  "[    0.784512]   projects.ko     [OK]",
  "[    0.867689]   metrics.ko      [OK]",
  "[    0.950841]   thinking.ko     [OK]",
  "[    1.034002]   terminal.ko     [OK]",
  "[    1.234401] Starting desktop environment...  [  OK  ]",
  "[    1.512300] Welcome to JulianAlvarezOS 1.0 LTS",
]

const LINE_DELAY = 80 // ms between lines
const PAUSE_AFTER_BOOT = 800 // ms before showing prompt
const PAUSE_BEFORE_COMPLETE = 300 // ms after prompt before calling onComplete

interface BootSequenceProps {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, line])
        }, i * LINE_DELAY)
      )
    })

    const promptTimer = setTimeout(
      () => setShowPrompt(true),
      BOOT_LINES.length * LINE_DELAY + PAUSE_AFTER_BOOT
    )

    const doneTimer = setTimeout(
      () => onComplete(),
      BOOT_LINES.length * LINE_DELAY + PAUSE_AFTER_BOOT + PAUSE_BEFORE_COMPLETE
    )

    timers.push(promptTimer, doneTimer)

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div className="h-full w-full overflow-hidden p-6 font-mono text-sm text-[#4ADE80] leading-6">
      {visibleLines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      {showPrompt && (
        <div className="mt-1">
          julian@portfolio:~$ <span className="animate-pulse">█</span>
        </div>
      )}
      {!showPrompt && visibleLines.length > 0 && (
        <div className="mt-0">
          <span className="animate-pulse">█</span>
        </div>
      )}
    </div>
  )
}
