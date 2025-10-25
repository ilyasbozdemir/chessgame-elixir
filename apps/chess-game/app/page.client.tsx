"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PageClient() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      {/* Hero Section */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Satranç Oyununa <span className="text-primary">Hoş Geldiniz</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Gerçek zamanlı iki oyunculu satranç deneyimi. Masaları görüntüle, rakibini seç ve oyuna başla!
        </p>

        <div className="pt-6">
          <Link href="/lobby">
            <Button size="lg" className="text-lg px-10">
              ♟️ Lobiye Katıl
            </Button>
          </Link>
        </div>
      </div>

      {/* Alt bilgi kartları */}
      <div className="grid md:grid-cols-2 gap-6 mt-20 max-w-4xl mx-auto">
        <div className="p-6 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors">
          <h2 className="text-2xl font-semibold mb-3">🎮 Nasıl Oynanır</h2>
          <p className="text-muted-foreground text-left">
            Lobiye girin, mevcut masaları görüntüleyin veya kendi masanızı oluşturun. 
            Rakibinizi seçtikten sonra klasik satranç kurallarıyla oyuna başlayın.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors">
          <h2 className="text-2xl font-semibold mb-3">⚡ Gerçek Zamanlı Güç</h2>
          <p className="text-muted-foreground text-left">
            Bu uygulama <span className="font-medium text-foreground">Elixir Phoenix</span> ile geliştirilen 
            güçlü bir <span className="font-medium text-foreground">realtime sunucudan</span> gücünü alır.  
            Ön yüzü ise <span className="font-medium text-foreground">Next.js</span> ile inşa edilmiştir.  
            <br /><br />
            Her hamle anında iletilir, gecikme sıfıra yakındır.  
            <span className="block mt-2 text-sm text-foreground font-semibold">
              Modern mimari • Güçlü performans • Tam senkronizasyon
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
