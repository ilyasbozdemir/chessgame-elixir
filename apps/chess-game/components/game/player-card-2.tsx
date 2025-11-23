import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Crown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type PlayerCard2Props = {
  name: string;
  avatar?: string;
  rating?: number;
  capturedPieces: string[];
  isCurrentTurn: boolean;
  isTop?: boolean;
  timeLeft?: number; 
};

export function PlayerCard2({
  name,
  avatar,
  rating,
  capturedPieces,
  isCurrentTurn,
  isTop = false,
  timeLeft,
}: PlayerCard2Props) {
  const formatTime = (seconds?: number) => {
    if (seconds === undefined) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const timeDisplay = formatTime(timeLeft);
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border transition-all",
        isCurrentTurn
          ? "bg-primary/10 border-primary/50 shadow-md"
          : "bg-card border-border"
      )}
    >
      <Avatar className="h-12 w-12">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>
          <User className="h-6 w-6" />
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm truncate">{name}</h3>
          {rating && (
            <Badge variant="secondary" className="text-xs">
              {rating}
            </Badge>
          )}
        </div>
        
        {/* Captured Pieces */}
        <div className="flex flex-wrap gap-0.5 mt-1 min-h-[20px]">
          {capturedPieces.length > 0 ? (
            capturedPieces.map((piece, i) => (
              <span key={i} className="text-lg leading-none">
                {piece}
              </span>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">
              Henüz alınan taş yok
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        {timeDisplay && (
          <div className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-mono text-sm font-semibold",
            isCurrentTurn && timeLeft && timeLeft < 60 
              ? "bg-destructive/20 text-destructive animate-pulse" 
              : "bg-muted text-foreground"
          )}>
            <Clock className="w-3.5 h-3.5" />
            {timeDisplay}
          </div>
        )}
        
        {isCurrentTurn && (
          <div className="flex items-center gap-1 text-primary animate-pulse">
            <Crown className="h-4 w-4" />
            <span className="text-xs font-medium">Sıra</span>
          </div>
        )}
      </div>
    </div>
  );
}
