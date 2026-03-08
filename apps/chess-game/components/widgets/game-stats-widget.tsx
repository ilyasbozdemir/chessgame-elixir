"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function GameStatsWidget() {
  const stats = [
    { label: "Toplam Oyun", value: 686, icon: "🎮" },
    { label: "Günlük Ortalama", value: 8.2, icon: "📈" },
    { label: "En Uzun Seri", value: 24, icon: "🔥" },
    { label: "Kategori", value: "Blitz", icon: "⚡" },
  ]

  const recentGames = [
    { opponent: "Fatih Ahmet", result: "Kazandı", time: "2 saat önce" },
    { opponent: "Zeynep Yıldız", result: "Kayıp", time: "5 saat önce" },
    { opponent: "Emre Kaya", result: "Berabere", time: "1 gün önce" },
  ]

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-4 text-center">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Recent Games */}
      <Card className="p-4">
        <h4 className="font-semibold text-foreground mb-4">Son Oyunlar</h4>
        <div className="space-y-3">
          {recentGames.map((game, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div>
                <p className="font-medium text-foreground">{game.opponent}</p>
                <p className="text-xs text-muted-foreground">{game.time}</p>
              </div>
              <Badge
                variant={game.result === "Kazandı" ? "default" : game.result === "Kayıp" ? "destructive" : "secondary"}
              >
                {game.result}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
