"use client"

import { Header } from "@/components/header"
import { DynamicSidebar } from "@/components/dynamic-sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Menu, Trophy, Target, TrendingUp, Clock, Zap, Shield, Award } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function ProfilePage() {
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

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          <div className="space-y-6">
            <Card className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="text-2xl bg-primary/20 text-primary">MK</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h1 className="text-3xl font-bold">Misafir Kullanıcı</h1>
                    <Badge variant="secondary" className="w-fit">
                      Anonim
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">Üyelik tarihi: Bugün</p>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm">Profili Düzenle</Button>
                    <Button size="sm" variant="outline">
                      Giriş Yap
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-orange-500/10">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1580</p>
                    <p className="text-sm text-muted-foreground">ELO Puanı</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-green-500/10">
                    <Target className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">247</p>
                    <p className="text-sm text-muted-foreground">Kazanılan</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">%68</p>
                    <p className="text-sm text-muted-foreground">Kazanma</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-purple-500/10">
                    <Clock className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">142</p>
                    <p className="text-sm text-muted-foreground">Toplam Oyun</p>
                  </div>
                </div>
              </Card>
            </div>

            <Tabs defaultValue="games" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="games">Oyunlar</TabsTrigger>
                <TabsTrigger value="achievements">Başarımlar</TabsTrigger>
                <TabsTrigger value="stats">İstatistikler</TabsTrigger>
              </TabsList>

              <TabsContent value="games" className="space-y-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Son Oyunlar</h3>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant={i % 2 === 0 ? "default" : "destructive"}>
                            {i % 2 === 0 ? "Kazandı" : "Kaybetti"}
                          </Badge>
                          <span className="text-sm">vs Player{i}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">Blitz 5+0</span>
                          <Button size="sm" variant="ghost">
                            Analiz
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Award, title: "İlk Zafer", desc: "İlk oyununuzu kazandınız", unlocked: true },
                    { icon: Zap, title: "Hızlı Düşünen", desc: "10 bullet oyunu oynayın", unlocked: true },
                    { icon: Shield, title: "Savunma Ustası", desc: "5 oyun üst üste kazanın", unlocked: false },
                    { icon: Trophy, title: "Turnuva Şampiyonu", desc: "Bir turnuva kazanın", unlocked: false },
                  ].map((achievement, i) => (
                    <Card key={i} className={`p-6 ${!achievement.unlocked && "opacity-50"}`}>
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${achievement.unlocked ? "bg-primary/10" : "bg-muted"}`}>
                          <achievement.icon
                            className={`w-6 h-6 ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`}
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Oyun Türü Dağılımı</h3>
                    <div className="space-y-3">
                      {[
                        { type: "Bullet", games: 45, color: "bg-red-500" },
                        { type: "Blitz", games: 62, color: "bg-orange-500" },
                        { type: "Rapid", games: 28, color: "bg-blue-500" },
                        { type: "Klasik", games: 7, color: "bg-purple-500" },
                      ].map((stat) => (
                        <div key={stat.type}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{stat.type}</span>
                            <span className="text-muted-foreground">{stat.games} oyun</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full ${stat.color}`} style={{ width: `${(stat.games / 142) * 100}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Rating Geçmişi</h3>
                    <div className="h-48 flex items-end justify-between gap-2">
                      {[1400, 1420, 1450, 1480, 1520, 1500, 1550, 1580].map((rating, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div
                            className="w-full bg-primary rounded-t"
                            style={{ height: `${((rating - 1300) / 300) * 100}%` }}
                          />
                          <span className="text-xs text-muted-foreground">{i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
