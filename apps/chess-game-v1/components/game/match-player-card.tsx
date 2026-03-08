import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PlayerCardProps {
  name: string
  avatar?: string
  level: number
  status: "online" | "offline" | "in-game"
  rating?: number
  className?: string
  isOpponent?: boolean
}

export function PlayerCard({ name, avatar, level, status, rating, className, isOpponent = false }: PlayerCardProps) {
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    "in-game": "bg-yellow-500",
  }

  const statusLabels = {
    online: "Çevrimiçi",
    offline: "Çevrimdışı",
    "in-game": "Oyunda",
  }

  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Avatar with status indicator */}
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-muted">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
              <AvatarFallback className="bg-muted text-muted-foreground">
                {name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* Status dot */}
            <div
              className={cn(
                "absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-card",
                statusColors[status],
              )}
            />
          </div>

          {/* Player info */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg leading-none">{name}</h3>
              {isOpponent && (
                <Badge variant="outline" className="text-xs">
                  Rakip
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Seviye {level}</span>
              {rating && (
                <>
                  <span>•</span>
                  <span>{rating} Rating</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <div className={cn("h-2 w-2 rounded-full", statusColors[status])} />
              <span className="text-xs text-muted-foreground">{statusLabels[status]}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
