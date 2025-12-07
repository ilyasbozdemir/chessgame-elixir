"use client";

import { Button } from "@/components/ui/button";
import { ChessBoard } from "@/components/game/chess-board";

import {
  BookOpen,
  Coffee,
  Cpu,
  Heart,
  LifeBuoy,
  Play,
  Search,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface PageClientProps {
  //
}

const PageClient: React.FC<PageClientProps> = ({}) => {
  type LinkItem = {
    id: string;
    href: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  };

  const LINKS: LinkItem[] = [
    {
      id: "online",
      href: "/play/online",
      title: "Çevrimiçi Oyna",
      description: "Hızlı eşleşme — dereceli & derecesiz.",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "friend",
      href: "/play/online/friend",
      title: "Bir Arkadaşa Karşı",
      description: "Özel oda oluştur, davet linki paylaş.",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      id: "bot",
      href: "/play/online/bot",
      title: "Botlara Karşı",
      description: "Seviye seç, pratik yap.",
      icon: <Cpu className="w-5 h-5" />,
    },
    {
      id: "tournaments",
      href: "/play/online/tournaments",
      title: "Turnuvalar",
      description: "Swiss, arena ve günlük kupalar.",
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      id: "puzzles",
      href: "/puzzles",
      title: "Puzzle — Taktik Çalışmaları",
      description: "Günlük görevler ve taktik setleri.",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: "training",
      href: "/training",
      title: "Eğitim Modu",
      description: "Açılış, orta oyun ve kapanış rehberleri.",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: "coaching",
      href: "/coaching",
      title: "Ders / Koçluk",
      description: "Birebir eğitmen eşleştirme.",
      icon: <LifeBuoy className="w-5 h-5" />,
    },
    {
      id: "analysis",
      href: "/analysis",
      title: "Analiz Odası",
      description: "Oyun analizleri, motor değerlendirmeleri.",
      icon: <Search className="w-5 h-5" />,
    },
    {
      id: "friends",
      href: "/friends",
      title: "Arkadaşlar",
      description: "Online arkadaşlar ve davet gönderme.",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Center - Chess Board */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex justify-center">
                <div className="space-y-4 w-full max-w-2xl">
                  <ChessBoard />
                </div>
              </div>
            </div>

            {/* Right Panel - Tabbed Interface */}
            <div className="lg:col-span-4">
              <aside className="w-full">
                <div className="space-y-3">
                  {LINKS.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group block rounded-lg border border-transparent hover:border-border/70 bg-card/80 hover:bg-card transition p-3 md:p-4 flex items-start gap-3"
                    >
                      <div className="flex-none flex items-center justify-center w-10 h-10 rounded-md bg-muted/30 group-hover:bg-muted/50">
                        {item.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm md:text-base font-semibold truncate">
                            {item.title}
                          </h3>
                        </div>

                        <p className="mt-1 text-xs text-muted-foreground truncate">
                          {item.description}
                        </p>
                      </div>

                      <div className="hidden sm:flex items-center pl-3">
                        <span className="text-xs text-muted-foreground">›</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageClient;
