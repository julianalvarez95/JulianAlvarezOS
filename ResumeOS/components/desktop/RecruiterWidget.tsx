"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface RecruiterWidgetProps {
  onOpenContact: () => void
  onDismiss: () => void
}

export function RecruiterWidget({ onOpenContact, onDismiss }: RecruiterWidgetProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onDismiss])

  return (
    <div
      className="fixed top-12 right-4 z-[200] font-mono text-xs"
      style={{
        background: "oklch(0.10 0.02 275)",
        border: "1px solid rgba(74, 222, 128, 0.4)",
        borderRadius: "6px",
        padding: "12px 14px",
        minWidth: "220px",
      }}
    >
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 text-white/40 hover:text-white/80 transition-colors"
        aria-label="Dismiss"
      >
        <X size={12} />
      </button>

      <div className="space-y-1 pr-4">
        <div className="text-[#4ADE80]">Senior PM @ WillDom</div>
        <div className="text-white/60">Led Wave CRM · team of 11</div>
        <button
          onClick={onOpenContact}
          className="mt-3 text-[#4ADE80] hover:text-white transition-colors flex items-center gap-1"
        >
          → Let&apos;s talk
        </button>
      </div>
    </div>
  )
}
