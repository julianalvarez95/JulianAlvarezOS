"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { X, Minus, Square } from "lucide-react"

interface WindowProps {
  title: string
  children: ReactNode
  zIndex: number
  initialPosition: { x: number; y: number }
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  onPositionChange: (position: { x: number; y: number }) => void
}

export function Window({
  title,
  children,
  zIndex,
  initialPosition,
  onClose,
  onMinimize,
  onFocus,
  onPositionChange,
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null)
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Trigger opening animation
    requestAnimationFrame(() => {
      setIsVisible(true)
    })
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragRef.current) return

      const deltaX = e.clientX - dragRef.current.startX
      const deltaY = e.clientY - dragRef.current.startY

      const newX = Math.max(0, Math.min(window.innerWidth - 200, dragRef.current.initialX + deltaX))
      const newY = Math.max(32, Math.min(window.innerHeight - 100, dragRef.current.initialY + deltaY))

      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        onPositionChange(position)
      }
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, position, onPositionChange])

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return
    
    onFocus()
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 200)
  }

  return (
    <div
      ref={windowRef}
      className={cn(
        "absolute flex flex-col overflow-hidden rounded-xl bg-card/95 shadow-2xl backdrop-blur-xl border border-border/50",
        "transition-all duration-200 ease-out",
        isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0",
        isDragging ? "cursor-grabbing shadow-3xl" : ""
      )}
      style={{
        left: position.x,
        top: position.y,
        zIndex,
        width: "min(700px, calc(100vw - 48px))",
        maxHeight: "calc(100vh - 120px)",
      }}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        className={cn(
          "flex h-10 shrink-0 items-center justify-between border-b border-border/50 bg-secondary/50 px-3",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          {/* Window controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClose}
              className="group flex h-3 w-3 items-center justify-center rounded-full bg-destructive/80 transition-colors hover:bg-destructive"
              aria-label="Close window"
            >
              <X className="h-2 w-2 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
            <button
              onClick={onMinimize}
              className="group flex h-3 w-3 items-center justify-center rounded-full bg-yellow-500/80 transition-colors hover:bg-yellow-500"
              aria-label="Minimize window"
            >
              <Minus className="h-2 w-2 text-yellow-900 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
            <button
              className="group flex h-3 w-3 items-center justify-center rounded-full bg-accent/80 transition-colors hover:bg-accent"
              aria-label="Maximize window"
            >
              <Square className="h-1.5 w-1.5 text-accent-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </div>
        </div>

        {/* Title */}
        <span className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-foreground/80">
          {title}
        </span>

        <div className="w-14" /> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  )
}
