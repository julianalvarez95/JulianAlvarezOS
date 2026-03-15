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
import {
  User,
  FolderKanban,
  BarChart3,
  Lightbulb,
  FlaskConical,
  PenLine,
  Mail,
} from "lucide-react"

type AppId = "about" | "projects" | "metrics" | "thinking" | "experiments" | "writing" | "contact"

interface WindowState {
  id: AppId
  isMinimized: boolean
  zIndex: number
  position: { x: number; y: number }
}

const apps: { id: AppId; label: string; icon: typeof User }[] = [
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "metrics", label: "Metrics", icon: BarChart3 },
  { id: "thinking", label: "Product Thinking", icon: Lightbulb },
  { id: "experiments", label: "Experiments", icon: FlaskConical },
  { id: "writing", label: "Writing", icon: PenLine },
  { id: "contact", label: "Contact", icon: Mail },
]

const appComponents: Record<AppId, React.ComponentType> = {
  about: AboutApp,
  projects: ProjectsApp,
  metrics: MetricsApp,
  thinking: ProductThinkingApp,
  experiments: ExperimentsApp,
  writing: WritingApp,
  contact: ContactApp,
}

const initialPositions: Record<AppId, { x: number; y: number }> = {
  about: { x: 100, y: 80 },
  projects: { x: 150, y: 100 },
  metrics: { x: 200, y: 120 },
  thinking: { x: 250, y: 140 },
  experiments: { x: 300, y: 160 },
  writing: { x: 350, y: 180 },
  contact: { x: 400, y: 200 },
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

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Wallpaper with gradient and noise texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

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
            onClose={() => closeApp(window.id)}
            onMinimize={() => minimizeApp(window.id)}
            onFocus={() => bringToFront(window.id)}
            onPositionChange={(pos) => updatePosition(window.id, pos)}
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
