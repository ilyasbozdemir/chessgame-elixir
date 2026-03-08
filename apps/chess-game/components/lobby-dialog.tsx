"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Clock, Target, Zap, User, Star } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { socketManager } from "@/lib/phoenix-socket"

interface LobbyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface PresencePlayer {
  username: string
  rating?: number
  is_licensed: boolean
  online_at: number
}

const gameFormats = [
  { icon: Zap, label: "Bullet", times: ["1+0", "1+1", "2+1"] },
  { icon: Target, label: "Blitz", times: ["3+0", "3+2", "5+0"] },
  { icon: Clock, label: "Rapid", times: ["10+0", "15+10", "20+0"] },
  { icon: Users, label: "Klasik", times: ["30+0", "60+0", "90+30"] },
]

export function LobbyDialog({ open, onOpenChange }: LobbyDialogProps) {
  const [players, setPlayers] = useState<PresencePlayer[]>([])

  useEffect(() => {
    if (open) {
      socketManager.connect()
      const channel = socketManager.joinChannel("game:lobby:players")

      if (channel) {
        channel.on("presence_state", (state: any) => {
          const list = Object.keys(state).map(id => state[id].metas[0])
          setPlayers(list)
        })

        channel.on("presence_diff", (diff: any) => {
          console.log("📡 Presence Update:", diff)
          // Ideally use Presence.syncDiff here
        })
      }
    } else {
      socketManager.leaveChannel("game:lobby:players")
    }
  }, [open])
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Oyun Lobisi</DialogTitle>
          <DialogDescription>Bir oyuna katılın veya yeni oyun oluşturun</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="quick" className="w-full flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-3 gap-1">
            <TabsTrigger value="quick" className="text-xs sm:text-sm">
              Hızlı Eşleşme
            </TabsTrigger>
            <TabsTrigger value="lobby" className="text-xs sm:text-sm">
              Aktif Oyunlar
            </TabsTrigger>
            <TabsTrigger value="custom" className="text-xs sm:text-sm">
              Özel Oyun
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quick" className="space-y-4 mt-4 flex-1 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gameFormats.map((format) => {
                const Icon = format.icon
                return (
                  <Card key={format.label} className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-card-foreground">{format.label}</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {format.times.map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          className="w-full hover:bg-primary hover:text-primary-foreground bg-transparent"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </Card>
                )
              })}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="flex-1" size="lg">
                <User className="w-4 h-4 mr-2" />
                Anonim Oyna
              </Button>
              <Button className="flex-1 bg-transparent" variant="outline" size="lg">
                Giriş Yap ve Oyna
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="lobby" className="mt-4 flex-1 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 pr-2">
              <div className="space-y-2">
                {players.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Şu an lobide kimse yok. İlk sen ol!
                  </div>
                )}
                {players.map((player, index) => (
                  <Card key={index} className="p-3 hover:border-primary/50 cursor-pointer transition-all">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl">
                          <User className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-card-foreground text-sm sm:text-base flex items-center gap-2">
                            {player.username}
                            {player.is_licensed && (
                              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-[10px] h-4 px-1 gap-0.5 border-none">
                                <Star className="w-2.5 h-2.5 fill-current" />
                                PRO
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 mt-1 flex-wrap">
                            <Badge variant="secondary" className="text-xs">
                              {player.rating || 1500}
                            </Badge>
                            <span className="text-xs text-muted-foreground">Aktif</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="flex-shrink-0">
                        Maç Yap
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="custom" className="mt-4 flex-1 overflow-auto">
            <ScrollArea className="h-full pr-2">
              <Card className="p-4 sm:p-6">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Oyun Formatı</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["1+0", "3+0", "5+0", "10+0", "15+10", "30+0"].slice(0, 4).map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          className="hover:bg-primary hover:text-primary-foreground bg-transparent"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minutes">Dakika</Label>
                      <Input id="minutes" type="number" placeholder="10" min="1" max="180" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="increment">Artış (saniye)</Label>
                      <Input id="increment" type="number" placeholder="0" min="0" max="60" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Renk Seçimi</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        className="hover:bg-primary hover:text-primary-foreground bg-transparent"
                      >
                        ⚪ Beyaz
                      </Button>
                      <Button
                        variant="outline"
                        className="hover:bg-primary hover:text-primary-foreground bg-transparent"
                      >
                        ⚫ Siyah
                      </Button>
                      <Button
                        variant="outline"
                        className="hover:bg-primary hover:text-primary-foreground bg-transparent"
                      >
                        🎲 Rastgele
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="rated" className="cursor-pointer">
                        Dereceli Oyun
                      </Label>
                      <Switch id="rated" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="private" className="cursor-pointer">
                        Özel Oyun (Sadece Link ile)
                      </Label>
                      <Switch id="private" />
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Oyun Oluştur
                  </Button>
                </div>
              </Card>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
