"use client"

import { Header } from "@/components/header"
import { DynamicSidebar } from "@/components/dynamic-sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Menu, Download, Play, RotateCcw } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export default function FenToGifPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [fenString, setFenString] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  const [moves, setMoves] = useState("1. e4 e5 2. Nf3 Nc6 3. Bb5")
  const [speed, setSpeed] = useState([1])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    console.log("Generating GIF with FEN:", fenString)
    console.log("Moves:", moves)
    console.log("Speed:", speed[0])
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenLobby={() => {}} />

      <div className="flex">
        <aside className="hidden lg:block w-64 border-r border-border sticky top-16 h-[calc(100vh-4rem)]">
          <DynamicSidebar />
        </aside>

        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetTrigger asChild className="lg:hidden fixed bottom-20 left-4 z-40">
            <Button size="icon" className="rounded-full shadow-lg h-14 w-14">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <DynamicSidebar />
          </SheetContent>
        </Sheet>

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-balance">FEN to GIF Dönüştürücü</h1>
              <p className="text-muted-foreground mt-2">Satranç pozisyonlarınızı animasyonlu GIF'e dönüştürün</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fen">FEN Notasyonu</Label>
                  <Input
                    id="fen"
                    value={fenString}
                    onChange={(e) => setFenString(e.target.value)}
                    placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
                  />
                  <p className="text-xs text-muted-foreground">Başlangıç pozisyonunu FEN formatında girin</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="moves">Hamle Dizisi</Label>
                  <Textarea
                    id="moves"
                    value={moves}
                    onChange={(e) => setMoves(e.target.value)}
                    placeholder="1. e4 e5 2. Nf3 Nc6 3. Bb5"
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">Oyun hamleleri (PGN formatında)</p>
                </div>

                <div className="space-y-4">
                  <Label>Animasyon Hızı: {speed[0]}x</Label>
                  <Slider value={speed} onValueChange={setSpeed} min={0.5} max={3} step={0.5} />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleGenerate} disabled={isGenerating} className="flex-1">
                    {isGenerating ? (
                      <>
                        <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                        Oluşturuluyor...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        GIF Oluştur
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Önizleme</h3>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">GIF burada görünecek</p>
                  </div>
                </div>

                <Button className="w-full bg-transparent" variant="outline" disabled>
                  <Download className="w-4 h-4 mr-2" />
                  GIF İndir
                </Button>

                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <h4 className="font-semibold text-sm">Nasıl Kullanılır?</h4>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>FEN notasyonunu girin veya varsayılanı kullanın</li>
                    <li>Hamleleri PGN formatında ekleyin</li>
                    <li>Animasyon hızını ayarlayın</li>
                    <li>GIF'i oluşturun ve indirin</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
