import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Move, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type GameEndDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  winner: {
    name: string;
    color: "white" | "black";
  };
  totalMoves: number;
  whiteTimeUsed: number;
  blackTimeUsed: number;
  reason?: string;
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function GameEndDialog({
  isOpen,
  onClose,
  winner,
  totalMoves,
  whiteTimeUsed,
  blackTimeUsed,
  reason,
}: GameEndDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="h-20 w-20 rounded-full bg-accent/20 flex items-center justify-center">
              <Trophy className="h-10 w-10 text-accent" />
            </div>
            <DialogTitle className="text-2xl text-center">
              {winner.name} Kazandı!
            </DialogTitle>
            <Badge variant="secondary" className="text-base">
              {winner.color === "white" ? "Beyaz" : "Siyah"}
            </Badge>
            {reason && (
              <DialogDescription className="text-center">
                {reason}
              </DialogDescription>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Move className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Toplam Hamle</span>
            </div>
            <span className="font-bold">{totalMoves}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Beyaz Süre</span>
            </div>
            <span className="font-bold font-mono">{formatTime(whiteTimeUsed)}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Siyah Süre</span>
            </div>
            <span className="font-bold font-mono">{formatTime(blackTimeUsed)}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            İncele
          </Button>
          <Button className="flex-1">
            Yeni Oyun
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
