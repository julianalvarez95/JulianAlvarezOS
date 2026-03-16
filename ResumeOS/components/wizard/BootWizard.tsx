"use client"

import { useState, useEffect, useCallback } from "react"
import { BootSequence } from "./BootSequence"
import { PersonaSelect } from "./PersonaSelect"
import { useWizard } from "@/hooks/useWizard"
import posthog from "posthog-js"

type Phase = "booting" | "selecting" | "complete"

interface BootWizardProps {
  onComplete: (persona: "recruiter" | "explorer" | null) => void
}

export function BootWizard({ onComplete }: BootWizardProps) {
  const [phase, setPhase] = useState<Phase>("booting")
  const [showSkipHint, setShowSkipHint] = useState(false)
  const { completeWizard, skipWizard } = useWizard()

  // Show skip hint after 3s
  useEffect(() => {
    const timer = setTimeout(() => setShowSkipHint(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  // ESC to skip
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        posthog.capture("wizard_skipped")
        skipWizard()
        onComplete(null)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [skipWizard, onComplete])

  const handleBootComplete = useCallback(() => {
    setPhase("selecting")
  }, [])

  const handlePersonaSelect = useCallback(
    (persona: "recruiter" | "explorer") => {
      posthog.capture("wizard_persona_selected", { persona })
      completeWizard(persona)
      setPhase("complete")
      onComplete(persona)
    },
    [completeWizard, onComplete]
  )

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
      <div className="flex-1 overflow-hidden">
        {phase === "booting" && (
          <BootSequence onComplete={handleBootComplete} />
        )}
        {(phase === "selecting" || phase === "complete") && (
          <PersonaSelect onSelect={handlePersonaSelect} />
        )}
      </div>

      {showSkipHint && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-white/30 select-none">
          [ ESC to skip ]
        </div>
      )}
    </div>
  )
}
