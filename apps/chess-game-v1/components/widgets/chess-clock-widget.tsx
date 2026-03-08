"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ChessClockWidget() {
  const [whiteTime, setWhiteTime] = useState(600) // 10 minutes
  const [blackTime, setBlackTime] = useState(600)
  const [activePlayer, setActivePlayer] = useState<"white" | "black" | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && activePlayer) {
      interval = setInterval(() => {
        if (activePlayer === "white") {
          setWhiteTime((prev) => Math.max(0, prev - 1))
        } else {
          setBlackTime((prev) => Math.max(0, prev - 1))
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, activePlayer])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const switchPlayer = () => {
    if (activePlayer === "white") {
      setActivePlayer("black")
    } else if (activePlayer === "black") {
      setActivePlayer("white")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6 space-y-6">
      {/* White Clock */}
      <div
        className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
          activePlayer === "white" ? "border-primary bg-primary/5" : "border-border bg-background"
        }`}
        onClick={() => activePlayer === null && setActivePlayer("white")}
      >
        <div className="text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Beyaz ♔</p>
          <p className="text-5xl font-mono font-bold text-primary">{formatTime(whiteTime)}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center">
        <Button
          onClick={() => setIsRunning(!isRunning)}
          className="flex-1"
          variant={isRunning ? "destructive" : "default"}
        >
          {isRunning ? "Durdur" : "Başla"}
        </Button>
        <Button
          onClick={switchPlayer}
          variant="outline"
          className="flex-1 bg-transparent"
          disabled={!isRunning && activePlayer === null}
        >
          Geç
        </Button>
        <Button
          onClick={() => {
            setWhiteTime(600)
            setBlackTime(600)
            setActivePlayer(null)
            setIsRunning(false)
          }}
          variant="outline"
          className="flex-1"
        >
          Sıfırla
        </Button>
      </div>

      {/* Black Clock */}
      <div
        className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
          activePlayer === "black" ? "border-secondary bg-secondary/5" : "border-border bg-background"
        }`}
        onClick={() => activePlayer === null && setActivePlayer("black")}
      >
        <div className="text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Siyah ♚</p>
          <p className="text-5xl font-mono font-bold text-secondary">{formatTime(blackTime)}</p>
        </div>
      </div>
    </Card>
  )
}
