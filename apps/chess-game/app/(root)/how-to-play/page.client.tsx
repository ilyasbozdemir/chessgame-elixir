"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Brain, Trophy, Eye } from "lucide-react"

export default function HowToPlayPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-5xl font-bold">Nasıl Oynanır</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Satranç oynamak hiç bu kadar kolay olmamıştı.  
          Aşağıdaki adımları izleyerek saniyeler içinde oyuna başlayabilir, dilersen diğer oyuncuların maçlarını izleyebilirsin!
        </p>
      </div>

      {/* Steps Section */}
      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className="p-6 rounded-xl border border-border bg-card text-center hover:bg-accent/40 transition-colors">
          <div className="flex justify-center mb-4">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">1. Lobiye Katıl</h2>
          <p className="text-muted-foreground">
            Lobiye girerek mevcut masaları görebilir veya yeni bir masa oluşturabilirsin.
          </p>
          <div className="pt-4">
            <Link href="/lobby">
              <Button variant="outline">Lobiye Git</Button>
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card text-center hover:bg-accent/40 transition-colors">
          <div className="flex justify-center mb-4">
            <Brain className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">2. Rakibini Seç</h2>
          <p className="text-muted-foreground">
            İstersen arkadaşını davet et, istersen açık bir masaya katılarak anında oyna.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card text-center hover:bg-accent/40 transition-colors">
          <div className="flex justify-center mb-4">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">3. Oyuna Başla</h2>
          <p className="text-muted-foreground">
            Her hamle gerçek zamanlı olarak iletilir. Stratejini belirle, rakibini zekanla mat et!
          </p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card text-center hover:bg-accent/40 transition-colors">
          <div className="flex justify-center mb-4">
            <Eye className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">4. Canlı Maçları İzle</h2>
          <p className="text-muted-foreground">
            Devam eden maçları anlık olarak takip edebilirsin.  
            Hamleleri gerçek zamanlı izle, oyuncuların stratejilerini öğren.
          </p>
          <div className="pt-4">
            <Link href="/lobby">
              <Button variant="outline">Canlı Maçlara Göz At</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-20 max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-3">♟️ Oyun Kuralları</h3>
        <p className="text-muted-foreground mb-6">
          Klasik satranç kuralları geçerlidir. Her oyuncu sırayla hamle yapar ve amaç rakibin şahını mat etmektir.  
          Oyunun tüm hareketleri anlık olarak senkronize edilir.
        </p>
        <Link href="/lobby">
          <Button size="lg">Oyuna Başla</Button>
        </Link>
      </div>
    </div>
  )
}
