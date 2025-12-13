import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { User } from "lucide-react"

interface GamePlayerCardProps {
  name: string
  avatar?: string
  rating?: number
  time: string
  isActive?: boolean
  className?: string
}

export function GamePlayerCard({ name, avatar, rating, time, isActive, className }: GamePlayerCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/50 backdrop-blur-sm transition-colors",
        isActive && "ring-2 ring-primary",
        className,
      )}
    >
      {/* Player info */}
      <div className="flex items-center gap-2.5 min-w-0">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-background shadow-sm">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
          <AvatarFallback className="bg-muted-foreground/10 text-muted-foreground">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-sm sm:text-base truncate">{name}</span>
          {rating && (
            <span className="text-xs text-muted-foreground">
              <span className="font-mono">{rating}</span> Rating
            </span>
          )}
        </div>
      </div>

      {/* Timer */}
      <div
        className={cn(
          "font-mono font-bold text-lg sm:text-2xl px-3 py-1.5 rounded bg-background/80 shadow-sm tabular-nums",
          isActive ? "text-primary" : "text-muted-foreground",
        )}
      >
        {time}
      </div>
    </div>
  )
}
