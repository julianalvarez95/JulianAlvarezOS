"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { AppWindow, X } from "lucide-react"

interface WindowProps {
  title: string
  children: ReactNode
  zIndex: number
  initialPosition: { x: number; y: number }
  initialSize: { width: number; height: number }
  minSize: { width: number; height: number }
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  onPositionChange: (position: { x: number; y: number }) => void
  onSizeChange: (size: { width: number; height: number }) => void
}

export function Window({
  title,
  children,
  zIndex,
  initialPosition,
  initialSize,
  minSize,
  onClose,
  onMinimize,
  onFocus,
  onPositionChange,
  onSizeChange,
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState(initialSize)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null)
  const resizeRef = useRef<{
    direction: string
    startX: number; startY: number
    startW: number; startH: number
    startPosX: number; startPosY: number
  } | null>(null)
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true)
    })
  }, [])

  // Drag effect
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

  // Resize effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeRef.current) return
      const { direction, startX, startY, startW, startH, startPosX, startPosY } = resizeRef.current
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      let newW = startW, newH = startH
      let newX = startPosX, newY = startPosY

      const maxW = window.innerWidth * 0.9
      const maxH = window.innerHeight * 0.9

      if (direction.includes('e')) newW = Math.max(minSize.width, Math.min(maxW, startW + dx))
      if (direction.includes('s')) newH = Math.max(minSize.height, Math.min(maxH, startH + dy))
      if (direction.includes('w')) {
        const cw = Math.max(minSize.width, Math.min(maxW, startW - dx))
        newX = startPosX + startW - cw
        newW = cw
      }
      if (direction.includes('n')) {
        const ch = Math.max(minSize.height, Math.min(maxH, startH - dy))
        newY = startPosY + startH - ch
        newH = ch
      }
      setSize({ width: newW, height: newH })
      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false)
        onSizeChange(size)
        onPositionChange(position)
      }
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, size, position, minSize, onSizeChange, onPositionChange])

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return
    if (isResizing) return

    onFocus()
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
    }
  }

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.preventDefault()
    e.stopPropagation()
    onFocus()
    setIsResizing(true)
    resizeRef.current = {
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startW: size.width,
      startH: size.height,
      startPosX: position.x,
      startPosY: position.y,
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 200)
  }

  const isHidden = !isVisible || isClosing

  return (
    <div
      ref={windowRef}
      className={cn(
        "absolute flex flex-col overflow-hidden rounded-xl bg-card/95 shadow-2xl backdrop-blur-xl border border-border",
      )}
      style={{
        left: position.x,
        top: position.y,
        zIndex,
        width: size.width,
        height: size.height,
        cursor: isResizing ? 'auto' : isDragging ? 'grabbing' : 'default',
        opacity: isHidden ? 0 : 1,
        transform: isHidden ? "scale(0.95) translateY(8px)" : "scale(1) translateY(0)",
        transition: isClosing
          ? "opacity 200ms ease-in, transform 200ms ease-in"
          : "opacity 250ms cubic-bezier(0.25,0.46,0.45,0.94), transform 280ms cubic-bezier(0.34,1.20,0.64,1)",
      }}
      onMouseDown={onFocus}
    >
      {/* Resize handles — edges */}
      <div style={{ position:'absolute', top:0, left:8, right:8, height:4, cursor:'n-resize', zIndex:20 }}
           onMouseDown={(e) => handleResizeMouseDown(e, 'n')} />
      <div style={{ position:'absolute', bottom:0, left:8, right:8, height:4, cursor:'s-resize', zIndex:20 }}
           onMouseDown={(e) => handleResizeMouseDown(e, 's')} />
      <div style={{ position:'absolute', top:8, bottom:8, right:0, width:4, cursor:'e-resize', zIndex:20 }}
           onMouseDown={(e) => handleResizeMouseDown(e, 'e')} />
      <div style={{ position:'absolute', top:8, bottom:8, left:0, width:4, cursor:'w-resize', zIndex:20 }}
           onMouseDown={(e) => handleResizeMouseDown(e, 'w')} />
      {/* Corners — higher z-index to take priority over edges */}
      <div style={{ position:'absolute', top:0, right:0, height:8, width:8, cursor:'ne-resize', zIndex:21 }}
           onMouseDown={(e) => handleResizeMouseDown(e, 'ne')} />
      <div style={{ position:'absolute', top:0, left:0, height:8, width:8, cursor:'nw-resize', zIndex:21 }}
           onMouseDown={(e) => handleResizeMouseDown(e, 'nw')} />
      <div style={{ position:'absolute', bottom:0, right:0, height:8, width:8, cursor:'se-resize', zIndex:21 }}
           onMouseDown={(e) => handleResizeMouseDown(e, 'se')} />
      <div style={{ position:'absolute', bottom:0, left:0, height:8, width:8, cursor:'sw-resize', zIndex:21 }}
           onMouseDown={(e) => handleResizeMouseDown(e, 'sw')} />

      {/* Title bar */}
      <div
        className={cn(
          "flex h-10 shrink-0 items-center justify-between border-b border-border bg-card/80 px-3",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        onMouseDown={handleMouseDown}
      >
        {/* Left: icon + title */}
        <div className="flex items-center gap-2">
          <AppWindow className="h-3.5 w-3.5 text-primary/60" />
          <span className="text-sm font-medium text-foreground/80">{title}</span>
        </div>

        {/* Right: close button */}
        <button
          onClick={handleClose}
          className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
          aria-label="Close window"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  )
}
