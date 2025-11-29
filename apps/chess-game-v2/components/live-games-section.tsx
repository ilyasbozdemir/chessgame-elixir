"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Tv, TrendingUp } from "lucide-react"
import Link from "next/link"

const liveGames = [
  {
    id: "game-1",
    white: { name: "GrandMaster42", rating: 2450, avatar: "GM" },
    black: { name: "QueenHunter", rating: 2380, avatar: "QH" },
    timeControl: "Blitz 3+0",
    viewers: 234,
    status: "Hamle 24",
    trending: true,
  },
  {
    id: "game-2",
    white: { name: "TacticalGenius", rating: 2290, avatar: "TG" },
    black: { name: "EndgameKing", rating: 2310, avatar: "EK" },
    timeControl: "Rapid 10+0",
    viewers: 156,
    status: "Hamle 31",
    trending: false,
  },
  {
    id: "game-3",
    white: { name: "ChessWarrior", rating: 2520, avatar: "CW" },
    black: { name: "StrategicMind", rating: 2490, avatar: "SM" },
    timeControl: "Bullet 1+0",
    viewers: 489,
    status: "Hamle 18",
    trending: true,
  },
]

export function LiveGamesSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tv className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Canlı Oyunlar</h2>
          <Badge variant="destructive" className="animate-pulse">
            CANLI
          </Badge>
        </div>
        <Button variant="outline" asChild>
          <Link href="/watch">Tümünü İzle</Link>
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Arkadaşlarımız tarafından hazırlanan demo oyunlar - Gerçek zamanlı oyunları izleyin ve öğrenin
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {liveGames.map((game) => (
          <Card
            key={game.id}
            className="p-4 hover:shadow-lg transition-all cursor-pointer group hover:border-primary/50 relative overflow-hidden"
          >
            {game.trending && (
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Popüler
                </Badge>
              </div>
            )}

            <div className="space-y-4">
              {/* Players */}
              <div className="space-y-2">
                {/* White Player */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-border flex items-center justify-center text-xs font-bold text-black">
                    {game.white.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">{game.white.name}</p>
                    <p className="text-xs text-muted-foreground">{game.white.rating}</p>
                  </div>
                </div>

                <div className="text-center text-xs text-muted-foreground py-1">vs</div>

                {/* Black Player */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-black border-2 border-border flex items-center justify-center text-xs font-bold text-white">
                    {game.black.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">{game.black.name}</p>
                    <p className="text-xs text-muted-foreground">{game.black.rating}</p>
                  </div>
                </div>
              </div>

              {/* Game Info */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">{game.timeControl}</p>
                  <p className="text-xs font-semibold text-foreground">{game.status}</p>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-semibold">{game.viewers}</span>
                </div>
              </div>

              {/* Watch Button */}
              <Button
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                variant="outline"
                asChild
              >
                <Link href={`/game/${game.id}`}>
                  <Tv className="w-4 h-4 mr-2" />
                  İzle
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
