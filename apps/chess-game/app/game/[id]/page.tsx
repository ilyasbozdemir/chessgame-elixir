"use client"

import { use, useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, RotateCcw, Flag, MessageSquare, Clock, User } from "lucide-react"
import Link from "next/link"
import { ChessBoard } from "@/components/chess-board"

export default function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [isLoading, setIsLoading] = useState(true)
  const [gameTime, setGameTime] = useState({ white: 600, black: 600 }) // 10 minutes each
  const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  const handleMove = (from: string, to: string, piece: any) => {
    console.log(`Move: ${from} -> ${to}`, piece)
    // Future: send to backend
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">Oyun Yükleniyor...</p>
            <p className="text-sm text-muted-foreground">Rakip bulunuyor</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenLobby={() => { }} />

      <div className="container mx-auto p-4 max-w-7xl">
        <div className="mb-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Ana Sayfaya Dön
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          {/* Chess Board Section */}
          <div className="space-y-4">
            {/* Opponent Info */}
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Rakip Oyuncu</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">1850</Badge>
                      <span className="text-xs text-muted-foreground">Blitz</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono font-semibold">
                    {Math.floor(gameTime.black / 60)}:{(gameTime.black % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            </Card>

            {/* Chess Board */}
            <Card className="p-2 md:p-4 aspect-square shadow-xl border-primary/20 bg-card/50 backdrop-blur-sm">
              <ChessBoard
                mode="game"
                initialPosition={fen}
                onMove={handleMove}
                onPositionChange={(newFen) => setFen(newFen)}
                className="w-full h-full"
              />
            </Card>


            {/* Player Info */}
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold">
                    SEN
                  </div>
                  <div>
                    <p className="font-semibold">Sen (Anonim)</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">1650</Badge>
                      <span className="text-xs text-muted-foreground">Blitz</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-mono font-semibold text-primary">
                    {Math.floor(gameTime.white / 60)}:{(gameTime.white % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            </Card>

            {/* Game Controls */}
            <Card className="p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm">
                    <Flag className="w-4 h-4 mr-2" />
                    Pes Et
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Chat & Moves Section */}
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Hamle Geçmişi
              </h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                <div className="grid grid-cols-[auto_1fr_1fr] gap-2 text-sm">
                  <span className="text-muted-foreground">1.</span>
                  <span>e4</span>
                  <span>e5</span>
                  <span className="text-muted-foreground">2.</span>
                  <span>Nf3</span>
                  <span>Nc6</span>
                  <span className="text-muted-foreground">3.</span>
                  <span>Bb5</span>
                  <span className="text-muted-foreground">...</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Oyun Bilgisi</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Oyun ID:</span>
                  <span className="font-mono">{id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mod:</span>
                  <span>Blitz (5+0)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sıra:</span>
                  <span className="font-semibold text-primary">Senin</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
