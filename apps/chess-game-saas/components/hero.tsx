"use client"

import { Button } from "@/components/ui/button"
import { Github, MessageSquare, Copy, Check } from "lucide-react"
import { useState } from "react"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative mx-auto px-4 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <span className="mr-2">🎉</span>
            <span className="font-medium">Açık kaynak ve tamamen ücretsiz</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-balance">
            Gerçek Zamanlı <span className="text-primary">Satranç Platformu</span>
            <br />
            Kendi Sunucunuzda
          </h1>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
            Elixir Phoenix ile güçlendirilmiş, MongoDB ile desteklenen, Next.js ile modern arayüze sahip profesyonel
            satranç uygulaması. Tek komutla deploy edin.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <InstallCommand />
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/ilyasbozdemir/chessgame-elixir"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <Github className="w-5 h-5" />
                GitHub'da Görüntüle
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://discord.gg/chessgame" target="_blank" rel="noopener noreferrer" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                Discord'a Katıl
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function InstallCommand() {
  const [copied, setCopied] = useState(false)
  const command = "curl -fsSL https://install.chessgame.io | sh"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative w-full max-w-2xl group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300" />
      <div className="relative flex items-center gap-2 rounded-lg border border-border bg-card px-3 sm:px-4 py-3 font-mono text-xs sm:text-sm">
        <span className="text-muted-foreground shrink-0">$</span>
        <code className="flex-1 overflow-x-auto scrollbar-hide whitespace-nowrap">{command}</code>
        <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={copyToClipboard}>
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
