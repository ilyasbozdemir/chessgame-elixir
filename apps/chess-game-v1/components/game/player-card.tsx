import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock, Trophy, User, Target, Award } from "lucide-react";

type Player = {
  name: string;
  rating: number;
  avatar: string;
  time: number;
  isActive: boolean;
};

type PlayerCardProps = {
  player: Player;
  position: "top" | "bottom";
  className?: string;
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function PlayerCard({ player, position, className }: PlayerCardProps) {
  const [currentTime, setCurrentTime] = useState(player.time);

  // Sıra oyuncudaysa zamanlayıcıyı azalt
  useEffect(() => {
    setCurrentTime(player.time);
  }, [player.time]);

  useEffect(() => {
    if (!player.isActive) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [player.isActive]);
  const isLowTime = currentTime < 60;

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg p-3 transition-all",
        player.isActive && "ring-2 ring-accent shadow-lg shadow-accent/20",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex-shrink-0 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded-full">
              <Avatar className="h-12 w-12 border-2 border-border cursor-pointer">
                <AvatarImage src={player.avatar} alt={player.name} />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" side={position === "top" ? "bottom" : "top"} align="start">
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{player.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="gap-1">
                      <Trophy className="h-3 w-3" />
                      {player.rating}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Kazanma Oranı</span>
                  </div>
                  <span className="font-bold text-primary">67%</span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Toplam Oyun</span>
                  </div>
                  <span className="font-bold">1,234</span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-muted-foreground">En Yüksek Rating</span>
                  </div>
                  <span className="font-bold">{player.rating + 50}</span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{player.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Trophy className="h-3 w-3" />
            <span>{player.rating}</span>
          </div>
        </div>

        <div
          className={cn(
            "px-2 md:px-4 py-1.5 md:py-2 rounded-md font-mono text-base md:text-xl font-bold bg-timer-bg flex-shrink-0",
            player.isActive && "bg-primary text-accent-foreground",
            isLowTime && player.isActive && "bg-timer-low animate-pulse"
          )}
        >
          <div className="flex items-center gap-1">
            <Clock className="h-3 md:h-4 w-3 md:w-4" />
            <span className="tabular-nums">{formatTime(currentTime)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
