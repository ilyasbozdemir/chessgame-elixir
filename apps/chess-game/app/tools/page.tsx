"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, Calculator, FileText, BookOpen, Target, Puzzle, Lightbulb, TrendingUp, Activity } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function ToolsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const tools = [
    {
      icon: Calculator,
      title: "ELO Hesaplayıcı",
      description: "Rating değişimlerini hesaplayın",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      status: "Aktif",
      users: "1,247",
    },
    {
      icon: FileText,
      title: "PGN Görüntüleyici",
      description: "Oyun kayıtlarını analiz edin",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      status: "Aktif",
      users: "892",
    },
    {
      icon: BookOpen,
      title: "Açılış Kitaplığı",
      description: "Açılış repertuarı oluşturun",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      status: "Beta",
      users: "3,421",
    },
    {
      icon: Target,
      title: "Pozisyon Analizi",
      description: "Yapay zeka ile pozisyon değerlendirme",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      status: "Aktif",
      users: "2,156",
    },
    {
      icon: Puzzle,
      title: "Taktik Eğitici",
      description: "Günlük taktik egzersizleri",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      status: "Aktif",
      users: "5,834",
    },
    {
      icon: Lightbulb,
      title: "Strateji Rehberi",
      description: "Oyun planı geliştirme tavsiyeleri",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      status: "Yakında",
      users: "-",
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
              <h1 className="text-3xl font-bold text-balance">Satranç Araçları</h1>
              <p className="text-muted-foreground mt-2">Profesyonel araçlarla oyununuzu geliştirin</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">13,550</p>
                    <p className="text-xs text-muted-foreground">Toplam Kullanım</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">6</p>
                    <p className="text-xs text-muted-foreground">Aktif Araç</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Puzzle className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-xs text-muted-foreground">Yakında</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => {
                const Icon = tool.icon
                const isActive = tool.status === "Aktif" || tool.status === "Beta"
                return (
                  <Card
                    key={tool.title}
                    className={`p-6 transition-all ${
                      isActive ? "hover:shadow-lg cursor-pointer hover:border-primary/50" : "opacity-60"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div
                          className={`p-3 rounded-xl ${tool.bgColor} transition-transform ${isActive ? "group-hover:scale-110" : ""}`}
                        >
                          <Icon className={`w-6 h-6 ${tool.color}`} />
                        </div>
                        <Badge
                          variant={
                            tool.status === "Aktif" ? "default" : tool.status === "Beta" ? "secondary" : "outline"
                          }
                        >
                          {tool.status}
                        </Badge>
                      </div>

                      <div>
                        <h3 className="font-bold text-lg text-card-foreground mb-2">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{tool.description}</p>

                        {isActive && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{tool.users} kullanıcı</span>
                            <Button size="sm" variant="ghost">
                              Kullan
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
