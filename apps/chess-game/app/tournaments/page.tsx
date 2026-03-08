"use client"

import { Header } from "@/components/header"
import { DynamicSidebar } from "@/components/dynamic-sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, Trophy, Users, Clock } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function TournamentsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

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

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-balance">Turnuvalar</h1>
              <p className="text-muted-foreground mt-2">Yarışmalara katılın ve ödüller kazanın</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Haftalık Blitz", time: "2 saat sonra", players: 128, prize: "1000₺" },
                { title: "Günlük Rapid", time: "30 dakika sonra", players: 64, prize: "500₺" },
                { title: "Bullet Şampiyonası", time: "Yarın 20:00", players: 256, prize: "2000₺" },
              ].map((tournament, idx) => (
                <Card key={idx} className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-yellow-500/10">
                      <Trophy className="w-6 h-6 text-yellow-500" />
                    </div>
                    <Badge variant="secondary">{tournament.prize}</Badge>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{tournament.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{tournament.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{tournament.players} katılımcı</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Katıl</Button>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
