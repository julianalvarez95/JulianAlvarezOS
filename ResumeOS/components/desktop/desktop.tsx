"use client"

import { useState } from "react"
import { TopBar } from "./top-bar"
import { Dock } from "./dock"
import { DesktopIcon } from "./desktop-icon"
import { Window } from "./window"
import { AboutApp } from "../apps/about-app"
import { ProjectsApp } from "../apps/projects-app"
import { MetricsApp } from "../apps/metrics-app"
import { ProductThinkingApp } from "../apps/product-thinking-app"
import { ExperimentsApp } from "../apps/experiments-app"
import { WritingApp } from "../apps/writing-app"
import { ContactApp } from "../apps/contact-app"
import { TerminalApp } from "../apps/terminal-app"
import {
  User,
  FolderKanban,
  BarChart3,
  Lightbulb,
  FlaskConical,
  BookOpen,
  Mail,
  Terminal as TerminalIcon,
} from "lucide-react"

type AppId = "about" | "projects" | "metrics" | "thinking" | "experiments" | "writing" | "contact" | "terminal"

interface WindowState {
  id: AppId
  isMinimized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
}

const apps: { id: AppId; label: string; icon: typeof User }[] = [
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "metrics", label: "Metrics", icon: BarChart3 },
  { id: "thinking", label: "Product Thinking", icon: Lightbulb },
  { id: "experiments", label: "Experiments", icon: FlaskConical },
  { id: "writing", label: "Resources", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "terminal", label: "Terminal", icon: TerminalIcon },
]

const appComponents: Record<AppId, React.ComponentType> = {
  about: AboutApp,
  projects: ProjectsApp,
  metrics: MetricsApp,
  thinking: ProductThinkingApp,
  experiments: ExperimentsApp,
  writing: WritingApp,
  contact: ContactApp,
  terminal: TerminalApp,
}

const initialSizes: Record<AppId, { width: number; height: number }> = {
  about:       { width: 640, height: 400 },
  projects:    { width: 700, height: 500 },
  metrics:     { width: 700, height: 500 },
  thinking:    { width: 660, height: 460 },
  experiments: { width: 620, height: 400 },
  writing:     { width: 660, height: 440 },
  contact:     { width: 520, height: 400 },
  terminal:    { width: 680, height: 480 },
}

const minSizes: Record<AppId, { width: number; height: number }> = {
  about:       { width: 400, height: 300 },
  projects:    { width: 500, height: 400 },
  metrics:     { width: 450, height: 350 },
  thinking:    { width: 350, height: 250 },
  experiments: { width: 350, height: 250 },
  writing:     { width: 350, height: 250 },
  contact:     { width: 350, height: 250 },
  terminal:    { width: 480, height: 320 },
}

const initialPositions: Record<AppId, { x: number; y: number }> = {
  about: { x: 100, y: 80 },
  projects: { x: 150, y: 100 },
  metrics: { x: 200, y: 120 },
  thinking: { x: 250, y: 140 },
  experiments: { x: 300, y: 160 },
  writing: { x: 350, y: 180 },
  contact: { x: 400, y: 200 },
  terminal: { x: 450, y: 220 },
}

export function Desktop() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([])
  const [highestZIndex, setHighestZIndex] = useState(10)

  const openApp = (appId: AppId) => {
    const existingWindow = openWindows.find((w) => w.id === appId)
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setOpenWindows((prev) =>
          prev.map((w) => (w.id === appId ? { ...w, isMinimized: false } : w))
        )
      }
      bringToFront(appId)
      return
    }

    const newZIndex = highestZIndex + 1
    setHighestZIndex(newZIndex)
    setOpenWindows((prev) => [
      ...prev,
      {
        id: appId,
        isMinimized: false,
        zIndex: newZIndex,
        position: initialPositions[appId],
        size: initialSizes[appId],
      },
    ])
  }

  const closeApp = (appId: AppId) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== appId))
  }

  const minimizeApp = (appId: AppId) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, isMinimized: true } : w))
    )
  }

  const bringToFront = (appId: AppId) => {
    const newZIndex = highestZIndex + 1
    setHighestZIndex(newZIndex)
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, zIndex: newZIndex } : w))
    )
  }

  const updatePosition = (appId: AppId, position: { x: number; y: number }) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, position } : w))
    )
  }

  const updateSize = (appId: AppId, size: { width: number; height: number }) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, size } : w))
    )
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Wallpaper — GNOME-style diagonal gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.14_0.025_280)] via-[oklch(0.18_0.06_295)] to-[oklch(0.14_0.04_240)]" />

      {/* Top system bar */}
      <TopBar />

      {/* Desktop icons */}
      <div className="absolute top-16 left-6 flex flex-col gap-6">
        {apps.map((app) => (
          <DesktopIcon
            key={app.id}
            icon={app.icon}
            label={app.label}
            onClick={() => openApp(app.id)}
          />
        ))}
      </div>

      {/* Open windows */}
      {openWindows.map((window) => {
        const app = apps.find((a) => a.id === window.id)
        const AppComponent = appComponents[window.id]
        if (!app || window.isMinimized) return null

        return (
          <Window
            key={window.id}
            title={app.label}
            zIndex={window.zIndex}
            initialPosition={window.position}
            initialSize={window.size}
            minSize={minSizes[window.id]}
            onClose={() => closeApp(window.id)}
            onMinimize={() => minimizeApp(window.id)}
            onFocus={() => bringToFront(window.id)}
            onPositionChange={(pos) => updatePosition(window.id, pos)}
            onSizeChange={(size) => updateSize(window.id, size)}
          >
            <AppComponent />
          </Window>
        )
      })}

      {/* Dock */}
      <Dock
        apps={apps}
        openWindows={openWindows}
        onAppClick={openApp}
      />
    </div>
  )
}
