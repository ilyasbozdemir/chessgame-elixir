import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlayerCard } from "./match-player-card"

interface MatchScreenProps {
  player: {
    name: string
    avatar?: string
    level: number
    rating: number
  }
  opponent?: {
    name: string
    avatar?: string
    level: number
    rating: number
  }
  status: "searching" | "found" | "starting"
}

export function MatchScreen({ player, opponent, status }: MatchScreenProps) {
  const statusMessages = {
    searching: "Rakip Aranıyor...",
    found: "Rakip Bulundu!",
    starting: "Oyun Başlıyor...",
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl space-y-8">
        {/* Status Badge */}
        <div className="text-center">
          <Badge variant={status === "found" ? "default" : "secondary"} className="text-lg px-6 py-2">
            {statusMessages[status]}
          </Badge>
        </div>

        {/* Match Layout */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          {/* Your Card */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-sm space-y-3">
              <h2 className="text-center md:text-right text-xl font-semibold text-primary">Siz</h2>
              <PlayerCard
                name={player.name}
                avatar={player.avatar}
                level={player.level}
                status="online"
                rating={player.rating}
              />
            </div>
          </div>

          {/* VS Section */}
          <div className="flex justify-center">
            <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center space-y-2">
                  <div className="text-6xl font-bold text-primary">VS</div>
                  {status === "searching" && (
                    <div className="flex gap-2 justify-center pt-2">
                      <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                      <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                      <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Opponent Card */}
          <div className="flex justify-center md:justify-start">
            {opponent ? (
              <div className="w-full max-w-sm space-y-3">
                <h2 className="text-center md:text-left text-xl font-semibold text-destructive">Rakip</h2>
                <PlayerCard
                  name={opponent.name}
                  avatar={opponent.avatar}
                  level={opponent.level}
                  status="online"
                  rating={opponent.rating}
                  isOpponent
                />
              </div>
            ) : (
              <div className="w-full max-w-sm space-y-3">
                <h2 className="text-center md:text-left text-xl font-semibold text-muted-foreground">Rakip</h2>
                <Card className="w-full max-w-sm border-dashed opacity-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center h-24 text-muted-foreground">Bekleniyor...</div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
