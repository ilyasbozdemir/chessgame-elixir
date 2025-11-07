"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PageClient() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      {/* Hero Section */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Gerçek Zamanlı <span className="text-primary">Satranç Deneyimi</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Canlı oyuncularla anında eşleş, hamlelerini milisaniyeler içinde ilet,
          modern mimariyle geliştirilmiş gelişmiş satranç altyapısını deneyimle.
        </p>

        <div className="pt-6">
          <Link href="/lobby">
            <Button size="lg" className="text-lg px-10">
              ♟️ Lobiye Katıl
            </Button>
          </Link>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-20 max-w-4xl mx-auto">
        <div className="p-6 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors">
          <h2 className="text-2xl font-semibold mb-3">🎮 Nasıl Oynanır?</h2>
          <p className="text-muted-foreground text-left leading-relaxed">
            Lobiye gir, mevcut masaları görüntüle veya kendi masanı oluştur.
            Rakibini seç, hazır olduğunda <strong>klasik satranç</strong> kurallarıyla oyuna başla.
            <br /><br />
            Tek tıkla katılım • Sıfır kurulum • Anında senkronize
          </p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors">
          <h2 className="text-2xl font-semibold mb-3">⚡ Realtime Mimari</h2>
          <p className="text-muted-foreground text-left leading-relaxed">
            Oyun sunucusu <strong>Elixir Phoenix Channels</strong>,
            istemci tarafı ise <strong>Next.js 15</strong> ve Zustand ile güçlendirilmiştir.
            Her hamle WebSocket üzerinden yayılır, <strong>gecikme ≈ 0ms</strong>.
            <br /><br />
            <span className="block mt-2 text-sm font-semibold text-foreground">
              Phoenix Presence • MongoDB • Server Actions • Full-Stack Sync
            </span>
          </p>
        </div>
      </div>

      {/* Roadmap */}
      <div className="mt-24 max-w-4xl mx-auto text-left space-y-6">
        <h2 className="text-3xl font-bold">🚀 Yakında Gelecek Özellikler</h2>

        <ul className="space-y-3 text-muted-foreground text-lg">
          <li>🤖 <strong>AI Bot Desteği</strong> — Tek oyuncu modu, AI rakibe karşı oyun</li>
          <li>🧠 <strong>Chess Engine + LLM Hibrit AI</strong> — Hem taktiksel motor, hem stratejik yapay zeka</li>
          <li>📊 <strong>Oyuncu İstatistikleri</strong> — ELO sistemi, win-rate, hareket analizleri</li>
          <li>🎥 <strong>Replay & Time Travel</strong> — Oyun geçmişini kaydet, geri sar, incele</li>
          <li>🌍 <strong>Seyirci Modu</strong> — Devam eden oyunları canlı izleme</li>
          <li>📱 <strong>Mobil UI</strong> — Cross-device responsive oyun deneyimi</li>
          <li>🕹️ <strong>Turnuva Sistemi</strong> — 1v1 bracket & hızlı maç eşleşmesi</li>
        </ul>

        <p className="text-sm text-muted-foreground pt-2">
          Tüm geliştirmeler açık kaynak olarak GitHub üzerinde ilerliyor. 
          ⭐ vererek projeye destek olabilirsin!
        </p>
      </div>
    </div>
  )
}
