"use client"

import { Header } from "@/components/header"
import { DynamicSidebar } from "@/components/dynamic-sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, MessageSquare, ThumbsUp, Share2 } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function CommunityPage() {
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

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-balance">Topluluk</h1>
                <p className="text-muted-foreground mt-2">Satranç severlerle bağlantı kurun</p>
              </div>
              <Button>Yeni Gönderi</Button>
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <div>
                        <p className="font-semibold">Kullanıcı {i}</p>
                        <p className="text-sm text-muted-foreground">2 saat önce</p>
                      </div>
                      <p className="text-foreground">
                        Bugün harika bir oyun oynadım! Sicilya Savunması ile 20 hamlede mat ettim. Analiz için
                        paylaşıyorum.
                      </p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          {Math.floor(Math.random() * 100)}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {Math.floor(Math.random() * 20)}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Paylaş
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
