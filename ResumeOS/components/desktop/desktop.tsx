"use client"

import { useState, useEffect } from "react"
import { TopBar } from "./top-bar"
import { DesktopIcon } from "./desktop-icon"
import { Window } from "./window"
import { AboutApp } from "../apps/about-app"
import { ProjectsApp } from "../apps/projects-app"
import { ToolsApp } from "../apps/product-thinking-app"
import { ExperimentsApp } from "../apps/experiments-app"
import { WritingApp } from "../apps/writing-app"
import { ContactApp } from "../apps/contact-app"
import { TerminalApp } from "../apps/terminal-app"
import {
  User,
  FolderKanban,
  Wrench,
  FlaskConical,
  BookOpen,
  Mail,
  Terminal as TerminalIcon,
} from "lucide-react"
import { toast } from "sonner"
import { RecruiterWidget } from "./RecruiterWidget"
import posthog from "posthog-js"

type AppId = "about" | "projects" | "thinking" | "experiments" | "writing" | "contact" | "terminal"

interface WindowState {
  id: AppId
  isMinimized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
}

const apps: { id: AppId; label: string; icon: typeof User; gradient: string }[] = [
  { id: "about", label: "About", icon: User, gradient: "from-blue-500 to-indigo-600" },
  { id: "projects", label: "Experience", icon: FolderKanban, gradient: "from-violet-500 to-purple-600" },
  { id: "thinking", label: "Tools & Stack", icon: Wrench, gradient: "from-amber-400 to-orange-500" },
  { id: "experiments", label: "Experiments", icon: FlaskConical, gradient: "from-pink-500 to-rose-600" },
  { id: "writing", label: "Resources", icon: BookOpen, gradient: "from-teal-500 to-cyan-600" },
  { id: "contact", label: "Contact", icon: Mail, gradient: "from-orange-500 to-red-500" },
  { id: "terminal", label: "Terminal", icon: TerminalIcon, gradient: "from-zinc-700 to-zinc-900" },
]

const appComponents: Record<AppId, React.ComponentType> = {
  about: AboutApp,
  projects: ProjectsApp,
  thinking: ToolsApp,
  experiments: ExperimentsApp,
  writing: WritingApp,
  contact: ContactApp,
  terminal: TerminalApp,
}

// Preferred sizes — actual open size is capped to viewport at runtime
const preferredSizes: Record<AppId, { width: number; height: number }> = {
  about:       { width: 820, height: 560 },
  projects:    { width: 860, height: 640 },
  thinking:    { width: 740, height: 580 },
  experiments: { width: 700, height: 540 },
  writing:     { width: 740, height: 560 },
  contact:     { width: 560, height: 520 },
  terminal:    { width: 720, height: 520 },
}

const minSizes: Record<AppId, { width: number; height: number }> = {
  about:       { width: 400, height: 300 },
  projects:    { width: 500, height: 400 },
  thinking:    { width: 350, height: 250 },
  experiments: { width: 350, height: 250 },
  writing:     { width: 350, height: 250 },
  contact:     { width: 350, height: 250 },
  terminal:    { width: 480, height: 320 },
}

/** Compute a size and centered position that fits within the current viewport. */
function getWindowGeometry(appId: AppId): {
  size: { width: number; height: number }
  position: { x: number; y: number }
} {
  const TOP_BAR = 32   // px reserved for top system bar
  const DOCK    = 88   // px reserved for dock at bottom
  const MARGIN  = 24   // minimum gap on each side

  const vw = window.innerWidth
  const vh = window.innerHeight
  const usableW = vw - MARGIN * 2
  const usableH = vh - TOP_BAR - DOCK - MARGIN

  const preferred = preferredSizes[appId]
  const w = Math.min(preferred.width,  usableW)
  const h = Math.min(preferred.height, usableH)

  // Center horizontally, place just below the top bar with a small offset
  const x = Math.round((vw - w) / 2)
  const y = TOP_BAR + MARGIN

  return { size: { width: w, height: h }, position: { x, y } }
}

const ABOUT_WINDOW_WIDTH = 820
const ABOUT_WINDOW_HEIGHT = 500

export function Desktop() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([])
  const [highestZIndex, setHighestZIndex] = useState(10)
  const [recruiterWidgetDismissed, setRecruiterWidgetDismissed] = useState(false)
  const wizardPersona = typeof window !== "undefined" ? localStorage.getItem("wizardPersona") : null

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

    posthog.capture("app_opened", { app_id: appId })

    const newZIndex = highestZIndex + 1
    setHighestZIndex(newZIndex)
    const { size, position } = getWindowGeometry(appId)
    setOpenWindows((prev) => [
      ...prev,
      {
        id: appId,
        isMinimized: false,
        zIndex: newZIndex,
        position,
        size,
      },
    ])
  }

  const closeApp = (appId: AppId) => {
    posthog.capture("app_closed", { app_id: appId })
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

  // Post-wizard auto-opens based on selected persona (runs once per wizard completion)
  useEffect(() => {
    const persona = localStorage.getItem("wizardPersona")
    const autoOpened = localStorage.getItem("wizardAutoOpened")
    if (autoOpened) return
    localStorage.setItem("wizardAutoOpened", "1")

    if (persona === "recruiter") {
      const x = Math.max(160, Math.round((window.innerWidth - ABOUT_WINDOW_WIDTH) / 2))
      const y = Math.max(48, Math.round((window.innerHeight - ABOUT_WINDOW_HEIGHT) / 2))

      setHighestZIndex(11)
      setOpenWindows((prevW) => {
        if (prevW.some((w) => w.id === "about")) return prevW
        return [
          {
            id: "about",
            isMinimized: false,
            zIndex: 11,
            position: { x, y },
            size: { width: ABOUT_WINDOW_WIDTH, height: ABOUT_WINDOW_HEIGHT },
          },
        ]
      })
    } else if (persona === "explorer") {
      toast("Try the Terminal 👀", { duration: 5000 })
    }
    // null / skipped → clean desktop
  }, [])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Wallpaper — GNOME-style diagonal gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.14_0.025_280)] via-[oklch(0.18_0.06_295)] to-[oklch(0.14_0.04_240)]" />

      {/* Top system bar */}
      <TopBar />

      {/* Desktop icons */}
      <div className="absolute top-16 left-6 flex flex-col gap-4">
        {apps.map((app) => (
          <DesktopIcon
            key={app.id}
            icon={app.icon}
            label={app.label}
            gradient={app.gradient}
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
            noPadding={window.id === "terminal"}
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

      {/* Recruiter Widget */}
      {wizardPersona === "recruiter" && !recruiterWidgetDismissed && (
        <RecruiterWidget
          onOpenContact={() => openApp("contact")}
          onDismiss={() => setRecruiterWidgetDismissed(true)}
        />
      )}

    </div>
  )
}
