"use client"

import { useEffect } from "react"

interface PersonaSelectProps {
  onSelect: (persona: "recruiter" | "explorer") => void
}

export function PersonaSelect({ onSelect }: PersonaSelectProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "1") onSelect("recruiter")
      if (e.key === "2") onSelect("explorer")
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onSelect])

  return (
    <div className="h-full w-full flex items-center justify-center font-mono text-sm text-[#4ADE80]">
      <div className="space-y-2">
        <div className="mb-4">Who are you?</div>
        <div
          className="cursor-pointer hover:text-white transition-colors"
          onClick={() => onSelect("recruiter")}
        >
          [1] recruiter
        </div>
        <div
          className="cursor-pointer hover:text-white transition-colors"
          onClick={() => onSelect("explorer")}
        >
          [2] just exploring
        </div>
        <div className="mt-4 text-[#4ADE80]/70">
          Select [1/2]: <span className="animate-pulse text-[#4ADE80]">█</span>
        </div>
      </div>
    </div>
  )
}
