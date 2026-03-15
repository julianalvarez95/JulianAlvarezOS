"use client"

import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowUpRight, PenLine } from "lucide-react"

const posts = [
  {
    id: 1,
    title: "Why Most PMs Misuse Data",
    description: "Data-driven is a spectrum. Most teams confuse correlation with causation and ship features that don't move the needle.",
    date: "Mar 2024",
    readTime: "6 min read",
    tags: ["Analytics", "Strategy"],
  },
  {
    id: 2,
    title: "Lessons from Product Failures",
    description: "Three products I killed and what I learned about knowing when to pivot vs. persevere. Spoiler: ego is your enemy.",
    date: "Feb 2024",
    readTime: "8 min read",
    tags: ["Failure", "Growth"],
  },
  {
    id: 3,
    title: "Product Thinking from Gaming",
    description: "How game design principles—progression systems, feedback loops, and engagement mechanics—apply to B2B products.",
    date: "Jan 2024",
    readTime: "5 min read",
    tags: ["Gaming", "UX"],
  },
  {
    id: 4,
    title: "The Experiment-Driven PM",
    description: "Moving from opinion-based to experiment-based product development. A framework for building a culture of testing.",
    date: "Dec 2023",
    readTime: "7 min read",
    tags: ["Experimentation", "Culture"],
  },
  {
    id: 5,
    title: "AI Products Are Different",
    description: "Why traditional PM frameworks break down with AI/ML products, and how to adapt your approach for probabilistic systems.",
    date: "Nov 2023",
    readTime: "10 min read",
    tags: ["AI", "Strategy"],
  },
]

export function WritingApp() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <PenLine className="h-4 w-4" />
        <span className="text-xs font-mono uppercase tracking-wider">Blog & Essays</span>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col gap-2 rounded-xl bg-secondary/30 p-4 border border-border/50 transition-all hover:bg-secondary/50 hover:border-primary/30 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                {post.title}
                <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-border/30 mt-auto">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
              <div className="flex gap-1.5">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs border-border/50 text-muted-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center pt-2">
        <button className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
          View all posts →
        </button>
      </div>
    </div>
  )
}
