"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, ArrowRight } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { ChessPiece } from "@/components/chess-piece"
import type { PieceType } from "@/components/chess-piece"

export default function LearnPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const lessons = [
    {
      piece: "p" as PieceType,
      title: "Piyon",
      description: "İleri doğru hareket eder, çapraz yer",
      difficulty: "Kolay",
      duration: "5 dk",
    },
    {
      piece: "n" as PieceType,
      title: "At",
      description: "L şeklinde hareket eder",
      difficulty: "Orta",
      duration: "8 dk",
    },
    {
      piece: "b" as PieceType,
      title: "Fil",
      description: "Çapraz hareket eder",
      difficulty: "Orta",
      duration: "7 dk",
    },
    {
      piece: "r" as PieceType,
      title: "Kale",
      description: "Dikey ve yatay hareket eder",
      difficulty: "Orta",
      duration: "7 dk",
    },
    {
      piece: "q" as PieceType,
      title: "Vezir",
      description: "Her yöne hareket edebilir",
      difficulty: "Zor",
      duration: "10 dk",
    },
    {
      piece: "k" as PieceType,
      title: "Şah",
      description: "Her yöne 1 kare hareket eder",
      difficulty: "Orta",
      duration: "6 dk",
    },
  ]

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
              <h1 className="text-3xl font-bold text-balance">Temel Dersler</h1>
              <p className="text-muted-foreground mt-2">Satranç taşlarını ve hareketlerini öğrenin</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => (
                <Card
                  key={lesson.title}
                  className="p-6 hover:shadow-lg transition-all cursor-pointer group hover:border-primary/50"
                >
                  <div className="space-y-4">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ChessPiece type={lesson.piece} color="w" className="scale-75" />
                    </div>

                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{lesson.description}</p>
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-2">
                      <Badge variant="secondary">{lesson.difficulty}</Badge>
                      <Badge variant="outline">{lesson.duration}</Badge>
                    </div>

                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Derse Başla
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-orange-500/10 border-primary/20">
              <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">İleri Seviye Dersler</h3>
                  <p className="text-muted-foreground mb-4">
                    Tüm temel dersleri tamamladıktan sonra açılış stratejileri, orta oyun taktikleri ve son oyun
                    tekniklerini öğrenmeye başlayabilirsiniz.
                  </p>
                  <Button variant="outline">Yakında</Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
