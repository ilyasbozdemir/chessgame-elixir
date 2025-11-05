"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Clock, Trophy } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import ChessBoard from "@/components/chess-board"

const mockLiveGames = [
  {
    id: "game-1",
    whitePlayer: "Ahmet Yılmaz",
    blackPlayer: "Mehmet Demir",
    whiteRating: 1850,
    blackRating: 1920,
    viewers: 45,
    duration: "12:34",
    status: "playing" as const,
  },
  {
    id: "game-2",
    whitePlayer: "Ayşe Kaya",
    blackPlayer: "Fatma Şahin",
    whiteRating: 2100,
    blackRating: 2050,
    viewers: 128,
    duration: "08:15",
    status: "playing" as const,
  },
  {
    id: "game-3",
    whitePlayer: "Ali Çelik",
    blackPlayer: "Zeynep Arslan",
    whiteRating: 1650,
    blackRating: 1680,
    viewers: 23,
    duration: "25:47",
    status: "playing" as const,
  },
  {
    id: "game-4",
    whitePlayer: "Mustafa Öztürk",
    blackPlayer: "Elif Yıldız",
    whiteRating: 1980,
    blackRating: 1995,
    viewers: 67,
    duration: "18:22",
    status: "playing" as const,
  },
]

export default function WatchPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  if (selectedGame) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] lg:ml-64">
        <div className="p-3 sm:p-4">
          <Button variant="outline" onClick={() => setSelectedGame(null)} className="mb-4">
            ← Geri Dön
          </Button>
        </div>
        <ChessBoard mode="spectate" tableId={selectedGame} />
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] p-3 sm:p-4 md:p-8 lg:ml-64">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Eye className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl font-bold">Canlı Maçları İzle</CardTitle>
            </div>
            <CardDescription>Devam eden maçları gerçek zamanlı takip edin</CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Canlı Oyunlar ({mockLiveGames.length})
            </h3>
            <Badge variant="secondary" className="animate-pulse">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 inline-block" />
              CANLI
            </Badge>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {mockLiveGames.map((game) => (
              <Card
                key={game.id}
                className="hover:border-primary transition-colors cursor-pointer"
                onClick={() => setSelectedGame(game.id)}
              >
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{game.viewers} izleyici</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{game.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          ⚪
                        </Badge>
                        <span className="font-semibold text-sm">{game.whitePlayer}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {game.whiteRating}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-center">
                      <span className="text-xs text-muted-foreground font-medium">VS</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          ⚫
                        </Badge>
                        <span className="font-semibold text-sm">{game.blackPlayer}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {game.blackRating}
                      </Badge>
                    </div>
                  </div>

                  <Button className="w-full" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    İzle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
