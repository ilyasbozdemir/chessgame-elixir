"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import ProfileCardWidget from "@/components/widgets/profile-card-widget"
import GameStatsWidget from "@/components/widgets/game-stats-widget"
import ChessClockWidget from "@/components/widgets/chess-clock-widget"
import TournamentWidget from "@/components/widgets/tournament-widget"

export default function WidgetsClient() {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null)
  const [showIframeDemo, setShowIframeDemo] = useState(false)

  const widgets = [
    {
      id: "profile-card",
      name: "Profil Kartı",
      description: "Oyuncu profili ve istatistikleri",
      icon: "👤",
    },
    {
      id: "game-stats",
      name: "Oyun İstatistikleri",
      description: "Detaylı oyun performans metrikleri",
      icon: "📊",
    },
    {
      id: "chess-clock",
      name: "Satranç Saati",
      description: "Gerçek zamanlı oyun saati",
      icon: "⏱️",
    },
    {
      id: "tournament",
      name: "Turnuva Tahtası",
      description: "Turnuva sonuçları ve sıralaması",
      icon: "🏆",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="space-y-2 mb-12">
          <h1 className="text-4xl font-bold text-foreground">Widget Kütüphanesi</h1>
          <p className="text-lg text-muted-foreground">
            İframe olarak sitelerinize entegre edebileceğiniz interaktif widget'ler
          </p>
        </div>

        {/* Widget Selection */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {widgets.map((widget) => (
            <Card
              key={widget.id}
              className="p-6 cursor-pointer hover:border-primary transition-colors"
              onClick={() => setSelectedWidget(widget.id)}
            >
              <div className="text-3xl mb-2">{widget.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{widget.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{widget.description}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(`/widgets/embed/${widget.id}`, "_blank")
                  }}
                >
                  Aç
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowIframeDemo(true)
                    setSelectedWidget(widget.id)
                  }}
                >
                  Önizle
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Preview Section */}
        {showIframeDemo && selectedWidget && (
          <Card className="p-6 mb-8 border-2 border-primary">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">İframe Önizlemesi</h2>
              <Button variant="outline" size="sm" onClick={() => setShowIframeDemo(false)}>
                Kapat
              </Button>
            </div>
            <div className="bg-background rounded-lg border border-border overflow-hidden">
              <iframe
                src={`/widgets/embed/${selectedWidget}`}
                className="w-full border-none"
                style={{ height: "600px" }}
                title={`Widget: ${selectedWidget}`}
              />
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-mono text-foreground mb-2">Embed Kodu:</p>
              <code className="text-xs bg-background p-2 rounded block overflow-auto text-foreground">
                {`<iframe src="${process.env.NEXT_PUBLIC_APP_URL || "https://yourapp.com"}/widgets/embed/${selectedWidget}" width="100%" height="600" frameborder="0" title="Widget"></iframe>`}
              </code>
            </div>
          </Card>
        )}

        {/* Widgets Live Demo */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold mt-12">Tüm Widget'ler</h2>

          {/* Profile Card Widget */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Profil Kartı Widget</h3>
            <ProfileCardWidget />
          </Card>

          {/* Game Stats Widget */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Oyun İstatistikleri Widget</h3>
            <GameStatsWidget />
          </Card>

          {/* Chess Clock Widget */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Satranç Saati Widget</h3>
            <ChessClockWidget />
          </Card>

          {/* Tournament Widget */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Turnuva Widget</h3>
            <TournamentWidget />
          </Card>
        </div>

        {/* Documentation */}
        <Card className="p-6 mt-12 bg-accent/10">
          <h3 className="text-lg font-semibold mb-4">Nasıl Kullanılır?</h3>
          <div className="space-y-3 text-sm text-foreground">
            <p>
              <strong>1. Widget Seçin:</strong> Yukarıdaki widget'lerden birini seçin
            </p>
            <p>
              <strong>2. Embed Kodunu Kopyalayın:</strong> Önizleme bölümünden iframe kodunu kopyalayın
            </p>
            <p>
              <strong>3. Sitenize Yapıştırın:</strong> HTML kodunuza iframe etiketi ekleyin
            </p>
            <p>
              <strong>4. Özelleştirin (Opsiyonel):</strong> width ve height parametrelerini ayarlayın
            </p>
          </div>
        </Card>
      </div>
    </main>
  )
}
