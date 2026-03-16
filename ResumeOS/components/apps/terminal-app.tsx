"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import posthog from "posthog-js"

type LineType = "input" | "output" | "error" | "system"

interface TerminalLine {
  id: number
  type: LineType
  content: string
  isLink?: boolean
  links?: { text: string; href: string }[]
}

const COMMANDS = [
  "help", "whoami", "about", "skills", "experience", "contact",
  "pwd", "ls", "cat", "clear", "sudo", "neofetch", "coffee",
  "fortune", "matrix", "exit", "quit", "halp", "rerun-wizard", "wizard",
]

const FORTUNES = [
  "\"The best product managers are the ones who make the team feel like they're building something that matters.\"",
  "\"Fall in love with the problem, not the solution.\" — Uri Levine",
  "\"It's not about ideas. It's about making ideas happen.\" — Scott Belsky",
  "\"Good product management is invisible. Bad product management is very, very visible.\"",
  "\"Talk to your users. Then talk to more users. Then talk to even more users.\"",
  "\"A PM's job is to make the team successful, not to be successful themselves.\"",
  "\"Data tells you what. Users tell you why.\"",
  "\"Ship early, learn fast, iterate relentlessly.\"",
]

const WELCOME_CONTENT = `Portfolio OS Terminal v1.0
Type 'help' to see available commands.
─────────────────────────────────────`

function makeLine(type: LineType, content: string, id: number, links?: { text: string; href: string }[]): TerminalLine {
  return { id, type, content, links }
}

const COMMAND_OUTPUTS: Record<string, string | (() => string)> = {
  pwd: "~/portfolio/julian",

  ls: `about.md  contact.txt  experiments/  metrics.json  projects/  writing/`,

  whoami: "Julian Alvarez — Senior Product Manager building products people actually use.",

  about: `Julian Alvarez is a Senior PM with 7+ years shipping B2B and consumer
products across fintech, edtech, and developer tools.

He blends deep technical fluency with user empathy — comfortable
reading a database query as reading a user interview transcript.

Currently exploring the intersection of AI and product-led growth.`,

  skills: `Product Strategy  [████████████░░░] 80%
Data Analysis     [███████████░░░░] 75%
Agile/Scrum       [█████████████░░] 90%
User Research     [████████████░░░] 80%
Technical PM      [██████████░░░░░] 70%`,

  experience: `TIMELINE
────────────────────────────────────────────
2022 – present  Senior Product Manager
                Leading 0→1 AI-powered features

2020 – 2022     Product Manager
                Growth & monetization, fintech

2018 – 2020     Associate PM
                Consumer mobile, edtech

2017 – 2018     Product Analyst
                Data-driven product iterations
────────────────────────────────────────────`,

  neofetch: `      ██╗ █████╗
      ██║██╔══██╗   julian@portfolio
      ██║███████║   ────────────────
 ██   ██║██╔══██║   OS: Portfolio OS v1.0
 ╚█████╔╝██║  ██║   Shell: julian-sh 1.0
  ╚════╝ ╚═╝  ╚═╝   DE: Custom React Desktop
                     Theme: Dark Tech [Indigo]
                     Font: JetBrains Mono
                     CPU: Product Thinking Engine
                     RAM: 7+ years experience`,

  coffee: `    ( (
     ) )
  ........
  |      |]
  \\      /
   \`----'

  Brewing ideas... ☕
  Current status: caffeinated and shipping.`,

  "sudo hire julian": `[sudo] password for recruiter: ********
Access granted. 🎉

  Julian is available for senior PM roles.
  He builds products people actually use.

  → julian@example.com
  → linkedin.com/in/julianalvarez`,

  help: `AVAILABLE COMMANDS
──────────────────────────────────────────
  help          Show this help message
  whoami        Who is Julian?
  about         Full bio
  skills        Skill levels (ASCII bars)
  experience    Career timeline
  contact       Contact info & links
  pwd           Current directory
  ls            List files
  cat <file>    Read a file
  clear         Clear terminal  (Ctrl+L)
  neofetch      System info + ASCII art
  coffee        ☕
  fortune       Random product wisdom
  matrix        ???
  sudo hire     Apply for Julian's time
  rerun-wizard  Replay the boot sequence
  exit / quit   ( ͡° ͜ʖ ͡°)
──────────────────────────────────────────`,
}

const CAT_FILES: Record<string, string> = {
  "about.md": `# Julian Alvarez

Senior PM | 7+ years | AI • Fintech • Edtech

Julian bridges the gap between what users need and what
engineers can build — translating ambiguity into clear,
shippable specs.

Passionate about developer tools and AI-augmented workflows.`,

  "contact.txt": `EMAIL:    julian@example.com
LINKEDIN: linkedin.com/in/julianalvarez
GITHUB:   github.com/julianalvarez`,
}

function ContactLinks() {
  return (
    <span className="whitespace-pre">
      {"EMAIL:    "}
      <a href="mailto:julian@example.com" className="text-blue-400 hover:underline" onClick={e => e.stopPropagation()}>
        julian@example.com
      </a>
      {"\nLINKEDIN: "}
      <a href="https://linkedin.com/in/julianalvarez" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline" onClick={e => e.stopPropagation()}>
        linkedin.com/in/julianalvarez
      </a>
      {"\nGITHUB:   "}
      <a href="https://github.com/julianalvarez" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline" onClick={e => e.stopPropagation()}>
        github.com/julianalvarez
      </a>
    </span>
  )
}

function LineRenderer({ line }: { line: TerminalLine }) {
  if (line.type === "input") {
    return (
      <div className="flex gap-2">
        <span className="text-green-400 shrink-0 select-none">julian@portfolio:~$</span>
        <span className="text-foreground">{line.content}</span>
      </div>
    )
  }
  if (line.type === "error") {
    return <div className="text-red-400 whitespace-pre">{line.content}</div>
  }
  if (line.type === "system") {
    return <div className="text-indigo-300/80 whitespace-pre">{line.content}</div>
  }
  // output
  if (line.id === -999) {
    return (
      <div className="text-foreground/90 whitespace-pre">
        <ContactLinks />
      </div>
    )
  }
  return <div className="text-foreground/90 whitespace-pre-wrap break-words">{line.content}</div>
}

// Matrix canvas effect
function MatrixCanvas({ active, onDone }: { active: boolean; onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const cols = Math.floor(canvas.width / 14)
    const drops: number[] = Array(cols).fill(1)
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01アBCDEF"

    let animId: number
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#00ff41"
      ctx.font = "13px monospace"

      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(ch, i * 14, drops[i] * 14)
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    const timer = setTimeout(() => {
      cancelAnimationFrame(animId)
      onDone()
    }, 3000)

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(timer)
    }
  }, [active, onDone])

  if (!active) return null
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 rounded-xl"
      style={{ width: "100%", height: "100%", background: "rgba(0,0,0,0.85)" }}
    />
  )
}

export function TerminalApp() {
  const idRef = useRef(1)
  const nextId = () => idRef.current++

  const [lines, setLines] = useState<TerminalLine[]>([
    makeLine("system", WELCOME_CONTENT, 0),
  ])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [matrixActive, setMatrixActive] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [lines])

  const addLines = useCallback((...newLines: TerminalLine[]) => {
    setLines(prev => [...prev, ...newLines])
  }, [])

  const clearLines = useCallback(() => {
    setLines([])
  }, [])

  const executeCommand = useCallback((raw: string) => {
    const cmd = raw.trim()
    const inputLine = makeLine("input", cmd, nextId())

    if (!cmd) {
      addLines(inputLine)
      return
    }

    // Add to history
    setHistory(prev => [cmd, ...prev])
    setHistoryIndex(-1)

    const lower = cmd.toLowerCase()
    const parts = lower.split(/\s+/)
    const base = parts[0]

    posthog.capture("terminal_command_executed", { command: base })

    // Special: clear
    if (lower === "clear") {
      clearLines()
      return
    }

    const outLines: TerminalLine[] = [inputLine]

    // exit / quit
    if (lower === "exit" || lower === "quit") {
      outLines.push(makeLine("output", "You can't escape. 😈  (close the window instead)", nextId()))
      addLines(...outLines)
      return
    }

    // sudo
    if (base === "sudo") {
      if (lower === "sudo hire julian") {
        const txt = COMMAND_OUTPUTS["sudo hire julian"] as string
        outLines.push(makeLine("output", txt, nextId()))
      } else {
        outLines.push(makeLine("error", "Permission denied. Nice try.", nextId()))
      }
      addLines(...outLines)
      return
    }

    // cat
    if (base === "cat") {
      const file = parts.slice(1).join(" ")
      if (!file) {
        outLines.push(makeLine("error", "cat: missing file operand. Usage: cat <file>", nextId()))
      } else if (CAT_FILES[file]) {
        outLines.push(makeLine("output", CAT_FILES[file], nextId()))
      } else {
        outLines.push(makeLine("error", `cat: ${file}: No such file or directory`, nextId()))
      }
      addLines(...outLines)
      return
    }

    // matrix
    if (lower === "matrix") {
      outLines.push(makeLine("output", "Initiating matrix sequence...", nextId()))
      addLines(...outLines)
      setMatrixActive(true)
      return
    }

    // fortune
    if (lower === "fortune") {
      const quote = FORTUNES[Math.floor(Math.random() * FORTUNES.length)]
      outLines.push(makeLine("output", quote, nextId()))
      addLines(...outLines)
      return
    }

    // contact (special render)
    if (lower === "contact") {
      const specialLine: TerminalLine = { id: -999, type: "output", content: "", links: [] }
      outLines.push(specialLine)
      addLines(...outLines)
      return
    }

    // rerun-wizard
    if (lower === "rerun-wizard" || lower === "wizard") {
      posthog.capture("wizard_rerun")
      outLines.push(makeLine("output", "Clearing wizard state... Rebooting in 1s.", nextId()))
      addLines(...outLines)
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("rerun-wizard"))
      }, 1000)
      return
    }

    // halp typo
    if (lower === "halp") {
      outLines.push(makeLine("error", "Did you mean: help", nextId()))
      addLines(...outLines)
      return
    }

    // Known commands via lookup
    const output = COMMAND_OUTPUTS[lower]
    if (output !== undefined) {
      const text = typeof output === "function" ? output() : output
      outLines.push(makeLine("output", text, nextId()))
      addLines(...outLines)
      return
    }

    // Unknown command
    outLines.push(makeLine("error", `command not found: ${cmd}. Type 'help' for available commands.`, nextId()))
    addLines(...outLines)
  }, [addLines, clearLines])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input)
      setInput("")
      return
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      setHistory(prev => {
        const newIndex = Math.min(historyIndex + 1, prev.length - 1)
        setHistoryIndex(newIndex)
        setInput(prev[newIndex] ?? "")
        return prev
      })
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setInput(newIndex < 0 ? "" : history[newIndex] ?? "")
      return
    }

    if (e.key === "Tab") {
      e.preventDefault()
      const prefix = input.toLowerCase()
      if (!prefix) return
      const matches = COMMANDS.filter(c => c.startsWith(prefix))
      if (matches.length === 1) {
        setInput(matches[0])
      } else if (matches.length > 1) {
        const inputLine = makeLine("input", input, nextId())
        const suggestions = makeLine("output", matches.join("  "), nextId())
        addLines(inputLine, suggestions)
      }
      return
    }

    if ((e.metaKey || e.ctrlKey) && e.key === "l") {
      e.preventDefault()
      clearLines()
      return
    }
  }

  return (
    <div
      className="relative flex flex-col h-full font-mono text-sm cursor-text select-text"
      style={{ background: "oklch(0.10 0.02 275)" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output area */}
      <div className="flex-1 overflow-auto p-3 space-y-0.5">
        {lines.map(line => (
          <LineRenderer key={line.id} line={line} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input line */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-white/10 shrink-0">
        <span className="text-green-400 shrink-0 select-none">julian@portfolio:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-foreground caret-green-400"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>

      {/* Matrix overlay */}
      <MatrixCanvas active={matrixActive} onDone={() => setMatrixActive(false)} />
    </div>
  )
}
