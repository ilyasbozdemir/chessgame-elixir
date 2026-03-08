"use client";

import { Play, Pause, RotateCcw, Flag } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function GameControls() {
  const [whiteTime, setWhiteTime] = useState(600); 
  const [blackTime, setBlackTime] = useState(600);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResignDialog, setShowResignDialog] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<"white" | "black">("white");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (currentTurn === "white") {
        setWhiteTime((prev) => {
          if (prev <= 0) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      } else {
        setBlackTime((prev) => {
          if (prev <= 0) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTurn]);

  const handleResign = () => {
    setShowResignDialog(false);
    setIsPlaying(false);
    alert("Pes ettiniz!");
  };

  return (
    <div className="flex flex-col gap-4 my-3">
      {/* Timers */}
      <div className="flex items-center justify-between gap-4">
        {/* White Timer */}
        <div className="flex-1 flex items-center justify-center gap-3 rounded-lg border-2 border-border bg-background px-4 py-3">
          <div className="h-4 w-4 rounded-full bg-white border-2 border-border" />
          <span className="font-mono text-2xl font-bold">
            {formatTime(whiteTime)}
          </span>
        </div>

        {/* Black Timer */}
        <div className="flex-1 flex items-center justify-center gap-3 rounded-lg border-2 border-border bg-background px-4 py-3">
          <div className="h-4 w-4 rounded-full bg-foreground" />
          <span className="font-mono text-2xl font-bold">
            {formatTime(blackTime)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsPlaying(!isPlaying)}
          className="gap-2"
        >
          {isPlaying ? (
            <>
              <Pause className="h-5 w-5" />
              Duraklat
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              Başlat
            </>
          )}
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          <RotateCcw className="h-5 w-5" />
          Geri Al
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 text-destructive hover:text-destructive"
          onClick={() => setShowResignDialog(true)}
        >
          <Flag className="h-5 w-5" />
          Pes Et
        </Button>
      </div>

      <Dialog open={showResignDialog} onOpenChange={setShowResignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pes Etmek İstediğinize Emin Misiniz?</DialogTitle>
            <DialogDescription>
              Bu oyunu kaybetmiş sayılacaksınız ve ELO puanınız düşebilir. Bu
              işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowResignDialog(false)}
            >
              İptal
            </Button>
            <Button variant="destructive" onClick={handleResign}>
              Evet, Pes Et
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
