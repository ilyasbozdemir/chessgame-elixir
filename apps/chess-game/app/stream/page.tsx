"use client"

import { Header } from "@/components/header"
import { DynamicSidebar } from "@/components/dynamic-sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Menu, Video, Copy, Eye, EyeOff, Play, Square, Settings, Twitch, Youtube, Radio } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StreamPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [showStreamKey, setShowStreamKey] = useState(false)
  const [enableChat, setEnableChat] = useState(true)
  const [enableAnalysis, setEnableAnalysis] = useState(true)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-balance">Canlı Yayın</h1>
                <p className="text-muted-foreground mt-2">Satranç oyunlarınızı canlı yayınlayın</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={isStreaming ? "default" : "secondary"} className="px-3 py-1">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${isStreaming ? "bg-red-500 animate-pulse" : "bg-gray-500"}`}
                  />
                  {isStreaming ? "Yayında" : "Çevrimdışı"}
                </Badge>
                <Button
                  onClick={() => setIsStreaming(!isStreaming)}
                  variant={isStreaming ? "destructive" : "default"}
                  className="gap-2"
                >
                  {isStreaming ? (
                    <>
                      <Square className="w-4 h-4" />
                      Yayını Durdur
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Yayını Başlat
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <div className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center space-y-3">
                      <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                        <Video className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground">
                        {isStreaming ? "Yayın aktif" : "Yayın başlatıldığında görüntü burada görünecek"}
                      </p>
                    </div>
                  </div>

                  <Tabs defaultValue="rtmp" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="rtmp">RTMP</TabsTrigger>
                      <TabsTrigger value="twitch">
                        <Twitch className="w-4 h-4 mr-2" />
                        Twitch
                      </TabsTrigger>
                      <TabsTrigger value="youtube">
                        <Youtube className="w-4 h-4 mr-2" />
                        YouTube
                      </TabsTrigger>
                      <TabsTrigger value="kick">
                        <Radio className="w-4 h-4 mr-2" />
                        Kick
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="rtmp" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="rtmp-url">RTMP Server URL</Label>
                        <div className="flex gap-2">
                          <Input
                            id="rtmp-url"
                            placeholder="rtmp://your-server.com/live"
                            className="flex-1"
                            defaultValue="rtmp://stream.chessgame.com/live"
                          />
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => copyToClipboard("rtmp://stream.chessgame.com/live")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stream-key">Stream Key</Label>
                        <div className="flex gap-2">
                          <Input
                            id="stream-key"
                            type={showStreamKey ? "text" : "password"}
                            placeholder="••••••••••••••••"
                            className="flex-1"
                            defaultValue="sk_live_1234567890abcdef"
                          />
                          <Button size="icon" variant="outline" onClick={() => setShowStreamKey(!showStreamKey)}>
                            {showStreamKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => copyToClipboard("sk_live_1234567890abcdef")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="twitch" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="twitch-url">Twitch RTMP URL</Label>
                        <div className="flex gap-2">
                          <Input
                            id="twitch-url"
                            placeholder="rtmp://live.twitch.tv/app"
                            className="flex-1"
                            defaultValue="rtmp://live.twitch.tv/app"
                          />
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => copyToClipboard("rtmp://live.twitch.tv/app")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="twitch-key">Twitch Stream Key</Label>
                        <div className="flex gap-2">
                          <Input
                            id="twitch-key"
                            type={showStreamKey ? "text" : "password"}
                            placeholder="live_*****************"
                            className="flex-1"
                          />
                          <Button size="icon" variant="outline" onClick={() => setShowStreamKey(!showStreamKey)}>
                            {showStreamKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="youtube" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="youtube-url">YouTube RTMP URL</Label>
                        <div className="flex gap-2">
                          <Input
                            id="youtube-url"
                            placeholder="rtmp://a.rtmp.youtube.com/live2"
                            className="flex-1"
                            defaultValue="rtmp://a.rtmp.youtube.com/live2"
                          />
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => copyToClipboard("rtmp://a.rtmp.youtube.com/live2")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="youtube-key">YouTube Stream Key</Label>
                        <div className="flex gap-2">
                          <Input
                            id="youtube-key"
                            type={showStreamKey ? "text" : "password"}
                            placeholder="****-****-****-****-****"
                            className="flex-1"
                          />
                          <Button size="icon" variant="outline" onClick={() => setShowStreamKey(!showStreamKey)}>
                            {showStreamKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="kick" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="kick-url">Kick RTMP URL</Label>
                        <div className="flex gap-2">
                          <Input
                            id="kick-url"
                            placeholder="rtmps://fa723fc1b171.global-contribute.live-video.net/app"
                            className="flex-1"
                          />
                          <Button size="icon" variant="outline">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="kick-key">Kick Stream Key</Label>
                        <div className="flex gap-2">
                          <Input
                            id="kick-key"
                            type={showStreamKey ? "text" : "password"}
                            placeholder="sk_******************"
                            className="flex-1"
                          />
                          <Button size="icon" variant="outline" onClick={() => setShowStreamKey(!showStreamKey)}>
                            {showStreamKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Settings className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold">Yayın Ayarları</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="quality">Video Kalitesi</Label>
                      <Select defaultValue="1080p">
                        <SelectTrigger id="quality">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4k">4K (2160p)</SelectItem>
                          <SelectItem value="1080p">Full HD (1080p)</SelectItem>
                          <SelectItem value="720p">HD (720p)</SelectItem>
                          <SelectItem value="480p">SD (480p)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bitrate">Bitrate</Label>
                      <Select defaultValue="6000">
                        <SelectTrigger id="bitrate">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8000">8000 kbps (Yüksek)</SelectItem>
                          <SelectItem value="6000">6000 kbps (Orta)</SelectItem>
                          <SelectItem value="4000">4000 kbps (Düşük)</SelectItem>
                          <SelectItem value="2500">2500 kbps (Mobil)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fps">FPS</Label>
                      <Select defaultValue="60">
                        <SelectTrigger id="fps">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="60">60 FPS</SelectItem>
                          <SelectItem value="30">30 FPS</SelectItem>
                          <SelectItem value="24">24 FPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4 space-y-4 border-t">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="chat" className="cursor-pointer">
                          Sohbet Göster
                        </Label>
                        <Switch id="chat" checked={enableChat} onCheckedChange={setEnableChat} />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="analysis" className="cursor-pointer">
                          Canlı Analiz
                        </Label>
                        <Switch id="analysis" checked={enableAnalysis} onCheckedChange={setEnableAnalysis} />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">İstatistikler</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">İzleyici</span>
                      <span className="font-semibold">{isStreaming ? "127" : "0"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Süre</span>
                      <span className="font-semibold">{isStreaming ? "01:23:45" : "00:00:00"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Bağlantı</span>
                      <Badge variant={isStreaming ? "default" : "secondary"}>
                        {isStreaming ? "İyi" : "Bağlı Değil"}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
