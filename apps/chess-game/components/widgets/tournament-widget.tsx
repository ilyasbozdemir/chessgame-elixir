"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"

export default function TournamentWidget() {
  const standings = [
    {
      rank: 1,
      name: "Grandmaster Ali",
      rating: 2650,
      wins: 12,
      color: "text-yellow-500",
    },
    {
      rank: 2,
      name: "IM Mehmet",
      rating: 2420,
      wins: 11,
      color: "text-gray-400",
    },
    {
      rank: 3,
      name: "FM Zeynep",
      rating: 2310,
      wins: 10,
      color: "text-orange-600",
    },
    {
      rank: 4,
      name: "Ahmet Yılmaz",
      rating: 1850,
      wins: 9,
      color: "text-blue-500",
    },
    {
      rank: 5,
      name: "Fatih Kaya",
      rating: 1720,
      wins: 8,
      color: "text-primary",
    },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h3 className="text-xl font-bold text-foreground">Açık Turnuva Sıralaması</h3>
      </div>

      {/* Standings */}
      <div className="space-y-2">
        {standings.map((player) => (
          <div
            key={player.rank}
            className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              {/* Rank */}
              <div className={`text-2xl font-bold ${player.color}`}>
                {player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : "🥉"}
              </div>

              {/* Player Info */}
              <div className="flex-1">
                <p className="font-semibold text-foreground">{player.name}</p>
                <p className="text-sm text-muted-foreground">{player.rating} ELO</p>
              </div>
            </div>

            {/* Wins */}
            <div className="text-right">
              <Badge variant="secondary" className="mr-2">
                {player.wins} Kazanış
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg text-sm text-foreground">
        <p>
          Turnuva durumu: <strong>Devam Ediyor</strong>
        </p>
        <p className="text-xs text-muted-foreground mt-2">Sonraki maçlar 30 dakika içinde başlayacak</p>
      </div>
    </Card>
  )
}
