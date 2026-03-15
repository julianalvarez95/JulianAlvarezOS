"use client"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Users, Headphones, BookOpen, ExternalLink } from "lucide-react"

const referentes = [
  {
    name: "Lenny Rachitsky",
    handle: "lennyrachitsky.com",
    focus: "Product / Growth",
    why: "Newsletter & podcast — best practical PM content today",
    url: "https://www.lennysnewsletter.com",
  },
  {
    name: "Shreyas Doshi",
    handle: "@shreyas",
    focus: "Product Leadership",
    why: "Ex-Stripe/Google/Yahoo, frameworks for senior PMs",
    url: "https://twitter.com/shreyas",
  },
  {
    name: "Marty Cagan",
    handle: "svpg.com",
    focus: "Product Strategy",
    why: "SVPG, wrote Inspired — foundational PM thinking",
    url: "https://www.svpg.com",
  },
  {
    name: "Teresa Torres",
    handle: "producttalk.org",
    focus: "Product Discovery",
    why: "Continuous discovery habits & opportunity solution trees",
    url: "https://www.producttalk.org",
  },
  {
    name: "Elena Verna",
    handle: "@elenaverna",
    focus: "PLG / Growth",
    why: "Product-led growth, B2B SaaS monetization",
    url: "https://twitter.com/elenaverna",
  },
  {
    name: "Ethan Mollick",
    handle: "oneusefulthing.org",
    focus: "AI for Knowledge Work",
    why: "Wharton prof, best thinker on practical AI adoption",
    url: "https://www.oneusefulthing.org",
  },
  {
    name: "Andrew Ng",
    handle: "deeplearning.ai",
    focus: "AI",
    why: "Accessible AI education for non-engineers",
    url: "https://www.deeplearning.ai",
  },
  {
    name: "Paul Graham",
    handle: "paulgraham.com",
    focus: "Startups / Thinking",
    why: "YC essays on startups and product thinking",
    url: "https://www.paulgraham.com",
  },
]

const podcasts = [
  {
    name: "Lenny's Podcast",
    host: "Lenny Rachitsky",
    focus: "Product, growth, career",
    url: "https://www.lennysnewsletter.com/podcast",
  },
  {
    name: "No Priors",
    host: "Sarah Guo & Elad Gil",
    focus: "AI research & products",
    url: "https://www.no-priors.com",
  },
  {
    name: "Latent Space",
    host: "Swyx & Alessio",
    focus: "AI engineering & products",
    url: "https://www.latent.space",
  },
  {
    name: "Acquired",
    host: "Ben & David",
    focus: "Deep company dives (strategy)",
    url: "https://www.acquired.fm",
  },
  {
    name: "The Product Podcast",
    host: "ProductSchool",
    focus: "PM interviews & frameworks",
    url: "https://productschool.com/podcast",
  },
  {
    name: "How I Built This",
    host: "Guy Raz",
    focus: "Founder stories",
    url: "https://www.npr.org/series/490248027/how-i-built-this",
  },
  {
    name: "20VC",
    host: "Harry Stebbings",
    focus: "VC, startups, growth",
    url: "https://www.thetwentyminutevc.com",
  },
]

const books = [
  {
    title: "Inspired",
    author: "Marty Cagan",
    category: "Product Management",
    url: "https://www.svpg.com/inspired-how-to-create-products-customers-love/",
  },
  {
    title: "Continuous Discovery Habits",
    author: "Teresa Torres",
    category: "Product Discovery",
    url: "https://www.producttalk.org/2021/05/continuous-discovery-habits/",
  },
  {
    title: "The Mom Test",
    author: "Rob Fitzpatrick",
    category: "User Research",
    url: "https://www.momtestbook.com",
  },
  {
    title: "Shape Up",
    author: "Ryan Singer (Basecamp)",
    category: "Product Process",
    url: "https://basecamp.com/shapeup",
  },
  {
    title: "The Cold Start Problem",
    author: "Andrew Chen",
    category: "Network Effects / Growth",
    url: "https://www.coldstart.com",
  },
  {
    title: "Thinking in Systems",
    author: "Donella Meadows",
    category: "Systems Thinking",
    url: "https://www.chelseagreen.com/product/thinking-in-systems/",
  },
  {
    title: "AI Superpowers",
    author: "Kai-Fu Lee",
    category: "AI / Strategy",
    url: "https://www.aisuperpowers.com",
  },
  {
    title: "Co-Intelligence",
    author: "Ethan Mollick",
    category: "AI for Knowledge Work",
    url: "https://www.ethanmollick.com/co-intelligence",
  },
]

export function WritingApp() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <BookOpen className="h-4 w-4" />
        <span className="text-xs font-mono uppercase tracking-wider">Curated Knowledge Hub</span>
      </div>

      <Tabs defaultValue="referentes">
        <TabsList className="w-full">
          <TabsTrigger value="referentes" className="flex-1 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Referentes
          </TabsTrigger>
          <TabsTrigger value="podcasts" className="flex-1 flex items-center gap-1.5">
            <Headphones className="h-3.5 w-3.5" />
            Podcasts
          </TabsTrigger>
          <TabsTrigger value="bibliografia" className="flex-1 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            Bibliografía
          </TabsTrigger>
        </TabsList>

        <TabsContent value="referentes" className="mt-3 space-y-2">
          {referentes.map((person) => (
            <div
              key={person.name}
              className="flex items-start justify-between gap-3 rounded-xl bg-secondary/30 px-4 py-3 border border-border/50 hover:bg-secondary/50 hover:border-primary/30 transition-all group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-foreground">{person.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{person.handle}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{person.why}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground whitespace-nowrap">
                  {person.focus}
                </Badge>
                <a href={person.url} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-60 transition-opacity">
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="podcasts" className="mt-3 space-y-2">
          {podcasts.map((podcast) => (
            <div
              key={podcast.name}
              className="flex items-center justify-between gap-3 rounded-xl bg-secondary/30 px-4 py-3 border border-border/50 hover:bg-secondary/50 hover:border-primary/30 transition-all group"
            >
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-sm text-foreground">{podcast.name}</span>
                <p className="text-xs text-muted-foreground mt-0.5">by {podcast.host}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground whitespace-nowrap">
                  {podcast.focus}
                </Badge>
                <a href={podcast.url} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-60 transition-opacity">
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="bibliografia" className="mt-3 space-y-2">
          {books.map((book) => (
            <div
              key={book.title}
              className="flex items-center justify-between gap-3 rounded-xl bg-secondary/30 px-4 py-3 border border-border/50 hover:bg-secondary/50 hover:border-primary/30 transition-all group"
            >
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-sm text-foreground">{book.title}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground whitespace-nowrap">
                  {book.category}
                </Badge>
                <a href={book.url} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-60 transition-opacity">
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
