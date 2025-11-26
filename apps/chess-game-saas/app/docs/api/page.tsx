import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Code2, Zap, Lock, Database } from "lucide-react"

export const metadata = {
  title: "API Docs - ChessGame",
  description: "ChessGame REST ve WebSocket API dokümantasyonu",
}

export default function ApiDocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <Code2 className="w-4 h-4 mr-2" />
                <span className="font-medium">API Referansı</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">ChessGame API</h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                REST API ve WebSocket bağlantıları için kapsamlı referans dokümantasyonu
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2 mb-12">
              <ApiSection
                icon={<Code2 className="w-6 h-6" />}
                title="REST API"
                description="HTTP endpoint'leri ve authentication"
                items={["POST /api/auth/register", "POST /api/auth/login", "GET /api/games", "POST /api/games/create"]}
              />
              <ApiSection
                icon={<Zap className="w-6 h-6" />}
                title="WebSocket Events"
                description="Gerçek zamanlı hamle senkronizasyonu"
                items={[
                  "game:join - Oyuna katıl",
                  "move:make - Hamle yap",
                  "move:receive - Hamle al",
                  "game:end - Oyun bitti",
                ]}
              />
            </div>

            <div className="space-y-8">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Authentication
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">JWT Token Kullanımı</h4>
                    <div className="rounded-md bg-muted p-4 font-mono text-sm overflow-x-auto">
                      <code>Authorization: Bearer YOUR_JWT_TOKEN</code>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Örnek Kullanım</h4>
                    <div className="rounded-md bg-muted p-4 font-mono text-sm overflow-x-auto">
                      <pre>{`fetch('https://api.chessgame.io/games', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})`}</pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  WebSocket Bağlantısı
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Phoenix Socket</h4>
                    <div className="rounded-md bg-muted p-4 font-mono text-sm overflow-x-auto">
                      <pre>{`import { Socket } from "phoenix"

const socket = new Socket("ws://localhost:4000/socket", {
  params: { token: userToken }
})

socket.connect()

const channel = socket.channel("game:123")
channel.join()
  .receive("ok", resp => console.log("Joined", resp))
  .receive("error", resp => console.log("Error", resp))

channel.on("move:receive", payload => {
  console.log("New move:", payload)
})`}</pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-xl font-bold mb-4">Rate Limiting</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>REST API:</strong> 100 istek / dakika
                  </p>
                  <p>
                    <strong>WebSocket:</strong> 1000 mesaj / dakika
                  </p>
                  <p>
                    <strong>Hamle:</strong> 1 hamle / saniye (hile koruması)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function ApiSection({
  icon,
  title,
  description,
  items,
}: {
  icon: React.ReactNode
  title: string
  description: string
  items: string[]
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm font-mono bg-muted px-3 py-2 rounded">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
