"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Clock, Target, Swords, Sparkles } from "lucide-react"

const quickPlayModes = [
  {
    icon: Zap,
    title: "Bullet",
    time: "1+0",
    description: "Hızlı tempolu oyun",
    color: "text-orange-500 dark:text-orange-400",
    bgColor: "bg-orange-500/10",
    popular: true,
  },
  {
    icon: Target,
    title: "Blitz",
    time: "3+0",
    description: "Klasik hızlı oyun",
    color: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
    popular: true,
  },
  {
    icon: Clock,
    title: "Rapid",
    time: "10+0",
    description: "Düşünmek için zaman",
    color: "text-green-500 dark:text-green-400",
    bgColor: "bg-green-500/10",
    popular: false,
  },
  {
    icon: Swords,
    title: "Klasik",
    time: "30+0",
    description: "Derin analiz",
    color: "text-purple-500 dark:text-purple-400",
    bgColor: "bg-purple-500/10",
    popular: false,
  },
]

interface QuickPlaySectionProps {
  onOpenLobby: () => void
}

export function QuickPlaySection({ onOpenLobby }: QuickPlaySectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Hızlı Eşleşme</h2>
        <Button variant="outline" onClick={onOpenLobby}>
          Tüm Modlar
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickPlayModes.map((mode) => {
          const Icon = mode.icon
          return (
            <Card
              key={mode.title}
              className="p-6 hover:shadow-lg transition-all cursor-pointer group hover:border-primary/50 relative overflow-hidden"
              onClick={onOpenLobby}
            >
              {mode.popular && (
                <div className="absolute top-2 right-2">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </div>
              )}
              <div className="space-y-4">
                <div className={`p-3 rounded-xl w-fit ${mode.bgColor} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${mode.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-card-foreground group-hover:text-primary transition-colors">
                    {mode.title}
                  </h3>
                  <p className="text-2xl font-bold text-primary mt-1">{mode.time}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{mode.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
