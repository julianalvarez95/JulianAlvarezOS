"use client"

import { useEffect, useState } from "react"
import { Desktop } from "@/components/desktop/desktop"
import { MobileView } from "@/components/mobile/mobile-view"
import { BootWizard } from "@/components/wizard/BootWizard"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showWizard, setShowWizard] = useState<boolean | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    setIsLoaded(true)

    // Check if wizard has been seen
    const seen = localStorage.getItem("wizardSeen")
    setShowWizard(!seen)

    window.addEventListener("resize", checkMobile)

    // Listen for rerun-wizard event from Terminal
    const handleRerun = () => {
      localStorage.removeItem("wizardSeen")
      localStorage.removeItem("wizardPersona")
      localStorage.removeItem("portfolio-os-visited")
      localStorage.removeItem("wizardAutoOpened")
      setShowWizard(true)
    }
    window.addEventListener("rerun-wizard", handleRerun)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("rerun-wizard", handleRerun)
    }
  }, [])

  if (!isLoaded || showWizard === null) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="font-mono text-sm text-muted-foreground">Loading PM_OS...</p>
        </div>
      </div>
    )
  }

  if (showWizard) {
    return (
      <BootWizard
        onComplete={() => setShowWizard(false)}
      />
    )
  }

  return isMobile ? <MobileView /> : <Desktop />
}
