"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, FileText, BookOpen, Target, Puzzle, Lightbulb } from "lucide-react"

const tools = [
  {
    icon: Calculator,
    title: "ELO Hesaplayıcı",
    description: "Rating değişimlerini hesaplayın",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    action: "Hesapla",
  },
  {
    icon: FileText,
    title: "PGN Görüntüleyici",
    description: "Oyun kayıtlarını analiz edin",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    action: "Görüntüle",
  },
  {
    icon: BookOpen,
    title: "Açılış Kitaplığı",
    description: "Açılış repertuarı oluşturun",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    action: "Keşfet",
  },
  {
    icon: Target,
    title: "Pozisyon Analizi",
    description: "Yapay zeka ile pozisyon değerlendirme",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    action: "Analiz Et",
  },
  {
    icon: Puzzle,
    title: "Taktik Eğitici",
    description: "Günlük taktik egzersizleri",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    action: "Başla",
  },
  {
    icon: Lightbulb,
    title: "Strateji Rehberi",
    description: "Oyun planı geliştirme tavsiyeleri",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    action: "Öğren",
  },
]

export function ToolsSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Araçlar</h2>
        <Button variant="outline">Tüm Araçlar</Button>
      </div>

      <p className="text-sm text-muted-foreground">Oyununuzu geliştirmek için profesyonel satranç araçları</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Card
              key={tool.title}
              className="p-5 hover:shadow-lg transition-all group hover:border-primary/50 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${tool.bgColor} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${tool.color}`} />
                  </div>
                  <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {tool.action}
                  </Button>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-card-foreground group-hover:text-primary transition-colors mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
