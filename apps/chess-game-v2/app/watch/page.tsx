"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Menu, Play, Users, Eye, Calendar, Clock } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function WatchPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

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
              <h1 className="text-3xl font-bold text-balance">İzle</h1>
              <p className="text-muted-foreground mt-2">Canlı yayınlar, etkinlikler ve oyun kayıtları</p>
            </div>

            <Tabs defaultValue="live" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="live">Canlı</TabsTrigger>
                <TabsTrigger value="events">Etkinlikler</TabsTrigger>
                <TabsTrigger value="history">Geçmiş</TabsTrigger>
              </TabsList>

              <TabsContent value="live" className="space-y-6 mt-6">
                <Card className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="font-semibold text-red-500">CANLI</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Dünya Şampiyonası - Final</h3>
                  <p className="text-muted-foreground mb-4">Magnus Carlsen vs. Hikaru Nakamura</p>
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary">
                      <Eye className="w-3 h-3 mr-1" />
                      24.5K izleyici
                    </Badge>
                    <Badge variant="secondary">Klasik</Badge>
                  </div>
                  <Button className="w-full sm:w-auto">
                    <Play className="w-4 h-4 mr-2" />
                    İzlemeye Başla
                  </Button>
                </Card>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Popüler Canlı Yayınlar</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Card key={i} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-orange-500/20 flex items-center justify-center relative">
                          <Play className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                          <div className="absolute top-2 left-2">
                            <Badge variant="destructive" className="gap-1">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              Canlı
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">Blitz Turnuvası #{i}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{(Math.random() * 10 + 1).toFixed(1)}K izleyici</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-6 mt-6">
                <div className="grid gap-4">
                  {[
                    {
                      title: "Dünya Kupası 2025",
                      date: "15-20 Haziran",
                      participants: "128 oyuncu",
                      status: "Kayıtlar Açık",
                    },
                    {
                      title: "Blitz Masters Turnuvası",
                      date: "3 Temmuz",
                      participants: "256 oyuncu",
                      status: "Yakında",
                    },
                    {
                      title: "Türkiye Şampiyonası",
                      date: "August 10-15",
                      participants: "64 oyuncu",
                      status: "Kayıtlar Açık",
                    },
                  ].map((event, i) => (
                    <Card key={i} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{event.title}</h3>
                            <Badge variant="secondary">{event.status}</Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{event.participants}</span>
                            </div>
                          </div>
                        </div>
                        <Button>Detaylar</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-6 mt-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <Card key={i} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative">
                        <Play className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">Klasik Maç #{i}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Clock className="w-4 h-4" />
                          <span>{i} gün önce</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{(Math.random() * 50 + 10).toFixed(1)}K görüntülenme</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
