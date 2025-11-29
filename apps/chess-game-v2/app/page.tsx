"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { DynamicSidebar } from "@/components/dynamic-sidebar";
import { QuickPlaySection } from "@/components/quick-play-section";
import { FeaturesGrid } from "@/components/features-grid";
import { LiveGamesSection } from "@/components/live-games-section";
import { ToolsSection } from "@/components/tools-section";
import { LobbyDialog } from "@/components/lobby-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Menu, Users, Radio, Trophy, MessageSquare, Send } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HomePage() {
  const [isLobbyOpen, setIsLobbyOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    playing: 12345,
    lobby: 678,
    tournaments: 90,
    online: 7842,
  });

  function formatNumber(num: number) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenLobby={() => setIsLobbyOpen(true)} />

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-border sticky top-16 h-[calc(100vh-4rem)]">
          <DynamicSidebar />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetTrigger
            asChild
            className="lg:hidden fixed bottom-20 left-4 z-40"
          >
            <Button size="icon" className="rounded-full shadow-lg h-14 w-14">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <DynamicSidebar />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 hover:shadow-lg transition-shadow border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Radio className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {formatNumber(stats.playing)}
                    </p>
                    <p className="text-xs text-muted-foreground">Oyunda</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 hover:shadow-lg transition-shadow border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {formatNumber(stats.lobby)}
                    </p>
                    <p className="text-xs text-muted-foreground">Lobide</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 hover:shadow-lg transition-shadow border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {formatNumber(stats.tournaments)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Aktif Turnuva
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 hover:shadow-lg transition-shadow border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <MessageSquare className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {formatNumber(stats.online)}
                    </p>
                    <p className="text-xs text-muted-foreground">Çevrimiçi</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Play Section */}
            <QuickPlaySection onOpenLobby={() => setIsLobbyOpen(true)} />

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <LiveGamesSection />
                <ToolsSection />
                <FeaturesGrid />
              </div>

              <div className="lg:col-span-1">
                <Card className="p-4 h-[600px] flex flex-col sticky top-24">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Global Sohbet</h3>
                    <div className="ml-auto flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-muted-foreground">
                        8.2K çevrimiçi
                      </span>
                    </div>
                  </div>

                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                      {[
                        {
                          user: "Ahmet_47",
                          msg: "Kimse 5+0 blitz oynamak ister mi?",
                          time: "2 dk önce",
                        },
                        {
                          user: "GrandMaster_TR",
                          msg: "Yeni turnuva başladı!",
                          time: "5 dk önce",
                        },
                        {
                          user: "SatrancKrali",
                          msg: "Bugün bulmacalardan 95/100 yaptım 🎉",
                          time: "8 dk önce",
                        },
                        {
                          user: "Beginner123",
                          msg: "Açılışlar hakkında kaynak önerir misiniz?",
                          time: "12 dk önce",
                        },
                        {
                          user: "ProPlayer99",
                          msg: "Canlı yayında 2500+ ELO turnuvası var!",
                          time: "15 dk önce",
                        },
                      ].map((chat, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-semibold text-primary">
                              {chat.user}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {chat.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {chat.msg}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="mt-4 pt-3 border-t flex gap-2">
                    <Input placeholder="Mesaj yaz..." className="flex-1" />
                    <Button size="icon">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Lobby Dialog */}
      <LobbyDialog open={isLobbyOpen} onOpenChange={setIsLobbyOpen} />
    </div>
  );
}
