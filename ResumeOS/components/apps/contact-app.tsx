"use client"

import { Button } from "@/components/ui/button"
import { Linkedin, Mail, Download, ExternalLink } from "lucide-react"
import posthog from "posthog-js"

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/julianalvarez00",
    icon: Linkedin,
    description: "Connect professionally",
  },
  {
    label: "Email",
    href: "mailto:julianignacioalvarez95@gmail.com",
    icon: Mail,
    description: "Get in touch",
  },
]

export function ContactApp() {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">{"Let's Connect"}</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          Currently at WillDom leading Wave CRM. Open to interesting conversations about product, AI, and what{"'"}s next.
        </p>
      </div>

      {/* Contact Links */}
      <div className="grid w-full gap-3 sm:grid-cols-2">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("contact_link_clicked", { link_label: link.label, link_href: link.href })}
              className="group flex flex-col items-center gap-2 rounded-xl bg-secondary/30 p-4 border border-border/50 transition-all hover:bg-secondary/50 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 border border-primary/30 transition-transform group-hover:scale-110">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                {link.label}
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
              <span className="text-xs text-muted-foreground">{link.description}</span>
            </a>
          )
        })}
      </div>

      {/* Download CV */}
      <Button
        onClick={() => posthog.capture("cv_download_clicked")}
        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Download className="mr-2 h-4 w-4" />
        Download CV
      </Button>

      {/* Availability */}
      <div className="flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2 border border-accent/20">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="text-sm text-foreground/80">
          Open to interesting product conversations
        </span>
      </div>

      {/* Response time */}
      <p className="text-xs text-muted-foreground">
        Typical response time: within 24 hours
      </p>
    </div>
  )
}
