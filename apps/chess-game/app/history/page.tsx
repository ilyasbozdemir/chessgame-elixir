"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function HistoryPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const games = [
    { opponent: "GrandMaster_TR", result: "Kazandı", rating: "+12", time: "2 saat önce", mode: "Blitz 5+0" },
    { opponent: "Beginner123", result: "Kazandı", rating: "+8", time: "5 saat önce", mode: "Rapid 10+0" },
    { opponent: "ProPlayer99", result: "Kaybetti", rating: "-15", time: "1 gün önce", mode: "Bullet 1+0" },
    { opponent: "ChessMaster", result: "Berabere", rating: "0", time: "1 gün önce", mode: "Klasik" },
    { opponent: "Rookie_42", result: "Kazandı", rating: "+10", time: "2 gün önce", mode: "Blitz 3+2" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <aside className="hidden lg:block w-64 border-r border-border sticky top-16 h-[calc(100vh-4rem)]">
          <Sidebar />
        </aside>

        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetTrigger asChild className="lg:hidden fixed bottom-4 left-4 z-50">
            <Button size="icon" className="rounded-full shadow-lg h-14 w-14">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-balance">Oyun Geçmişi</h1>
              <p className="text-muted-foreground mt-2">Geçmiş oyunlarınızı ve istatistiklerinizi görüntüleyin</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Trophy className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">127</p>
                    <p className="text-xs text-muted-foreground">Toplam Galibiyet</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1,847</p>
                    <p className="text-xs text-muted-foreground">Mevcut Rating</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Minus className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">68%</p>
                    <p className="text-xs text-muted-foreground">Kazanma Oranı</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Son Oyunlar</h2>
              <div className="space-y-3">
                {games.map((game, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {game.opponent.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{game.opponent}</p>
                        <p className="text-sm text-muted-foreground">{game.mode}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge
                          variant={
                            game.result === "Kazandı"
                              ? "default"
                              : game.result === "Kaybetti"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {game.result}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{game.time}</p>
                      </div>

                      <div className="flex items-center gap-1 min-w-[60px] justify-end">
                        {game.rating.startsWith("+") ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : game.rating.startsWith("-") ? (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        ) : (
                          <Minus className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span
                          className={`font-semibold ${
                            game.rating.startsWith("+")
                              ? "text-green-500"
                              : game.rating.startsWith("-")
                                ? "text-red-500"
                                : "text-muted-foreground"
                          }`}
                        >
                          {game.rating}
                        </span>
                      </div>

                      <Button size="sm" variant="ghost">
                        İncele
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
