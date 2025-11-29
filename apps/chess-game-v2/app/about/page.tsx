"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Menu, Users, Target, Heart, Zap } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function AboutPage() {
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

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
          <div className="space-y-6">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-orange-500/10">
              <h1 className="text-3xl font-bold mb-4">Hakkımızda</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ChessGame, satranç severleri bir araya getiren modern bir platformdur. Amacımız, her seviyeden oyuncuya
                kaliteli bir satranç deneyimi sunmaktır.
              </p>
            </Card>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Misyonumuz</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Satranç öğrenmeyi ve oynamayı herkes için erişilebilir kılmak, güçlü bir topluluk oluşturmak.
                </p>
              </Card>

              <Card className="p-6">
                <div className="p-3 rounded-xl bg-orange-500/10 w-fit mb-4">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Vizyonumuz</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dünyanın en iyi çevrimiçi satranç platformlarından biri olmak ve milyonlarca oyuncuyu buluşturmak.
                </p>
              </Card>

              <Card className="p-6">
                <div className="p-3 rounded-xl bg-blue-500/10 w-fit mb-4">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Topluluk</h3>
                <p className="text-muted-foreground leading-relaxed">
                  15,000+ aktif oyuncu, günlük turnuvalar ve canlı sohbet ile güçlü bir satranç topluluğu.
                </p>
              </Card>

              <Card className="p-6">
                <div className="p-3 rounded-xl bg-green-500/10 w-fit mb-4">
                  <Heart className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Değerlerimiz</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Adil oyun, saygı, öğrenme ve sürekli gelişim ilkelerine bağlıyız.
                </p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Özelliklerimiz</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Hızlı eşleşme sistemi ile anında oyun bulma</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Binlerce bulmaca ile taktik geliştirme</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Canlı turnuvalar ve etkinlikler</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Profesyonel analiz araçları</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Mobil uyumlu tasarım</span>
                </li>
              </ul>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
