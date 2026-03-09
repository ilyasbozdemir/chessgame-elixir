"use client";

import { useState, useEffect } from "react";
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
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChannel } from "@/context/channel-context";
import { usePresence } from "@/context/presence-context";
import { useChat } from "@/context/chat-context";
import { useUser } from "@/context/user-context";
import { SOCKET_CHANNELS, SOCKET_EVENTS } from "@/const/elixir-socket-names";

export default function PageClient() {
  const [isLobbyOpen, setIsLobbyOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { lobbyCount, globalCount } = usePresence();
  const { messages, sendMessage } = useChat();
  const { getChannel, socketConnected } = useChannel();
  const { user } = useUser();

  const [stats, setStats] = useState({
    playing: 0,
    lobby: 0,
    tournaments: 0,
    online: 0,
  });

  // Sync internal stats with presence context
  useEffect(() => {
    setStats(prev => ({
      ...prev,
      lobby: lobbyCount,
      online: globalCount || (lobbyCount + 12) // Fallback if global is 0
    }));
  }, [lobbyCount, globalCount]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !user) return;
    const senderName = user.user_metadata?.username || user.email?.split("@")[0] || "Anonim";
    sendMessage(inputValue, senderName);
    setInputValue("");
  };

  function formatNumber(num: number) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onOpenLobby={() => setIsLobbyOpen(true)} />

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-border sticky top-16 h-[calc(100vh-4rem)]">
          <DynamicSidebar />
        </aside>

        {/* Mobile Sidebar — controlled via state, no SheetTrigger needed */}
        <Button
          size="icon"
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden fixed bottom-20 left-4 z-40 rounded-full shadow-lg h-14 w-14"
        >
          <Menu className="w-6 h-6" />
        </Button>
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetContent side="left" className="w-72 p-0 overflow-y-auto">
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
                    <h3 className="font-semibold px-2">Global Sohbet</h3>
                    <div className="ml-auto flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-muted-foreground">
                        {stats.online} çevrimiçi
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2">
                    <div className="space-y-4">
                      {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-20">
                          <MessageSquare className="w-8 h-8 mb-2 opacity-20" />
                          <p className="text-xs">Henüz mesaj yok.</p>
                          <p className="text-[10px]">İlk mesajı sen gönder!</p>
                        </div>
                      )}
                      {messages.map((chat, i) => (
                        <div key={i} className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300 px-2 leading-relaxed">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-semibold text-primary/90">
                              {chat.sender}
                            </span>
                            <span className="text-[10px] text-muted-foreground opacity-70">
                              {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-sm text-foreground/90 bg-secondary/30 p-2 rounded-lg rounded-tl-none border border-border/50">
                            {chat.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t flex gap-2">
                    <Input
                      placeholder={user ? "Mesaj yaz..." : "Sohbet etmek için giriş yapın"}
                      className="flex-1"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      disabled={!user}
                    />
                    <Button size="icon" onClick={handleSendMessage} disabled={!user}>
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

