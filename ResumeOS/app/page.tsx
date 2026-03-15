"use client"

import { useEffect, useState } from "react"
import { Desktop } from "@/components/desktop/desktop"
import { MobileView } from "@/components/mobile/mobile-view"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    setIsLoaded(true)

    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="font-mono text-sm text-muted-foreground">Loading PM_OS...</p>
        </div>
      </div>
    )
  }

  return isMobile ? <MobileView /> : <Desktop />
}
