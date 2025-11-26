import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { BookOpen, Server, Puzzle, Zap, Code2, Terminal } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Dokümantasyon - ChessGame",
  description: "ChessGame platformunun kurulum, yapılandırma ve kullanım kılavuzu",
}

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <BookOpen className="w-4 h-4 mr-2" />
                <span className="font-medium">Dokümantasyon</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">ChessGame Kılavuzu</h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                ChessGame platformunu kurun, yapılandırın ve özelleştirin. Detaylı kılavuzlar ve API referansları.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              <DocCard
                icon={<Terminal className="w-6 h-6" />}
                title="Hızlı Başlangıç"
                description="5 dakikada ChessGame'i kurun ve çalıştırın"
                href="/docs/quickstart"
              />
              <DocCard
                icon={<Server className="w-6 h-6" />}
                title="Backend (Elixir)"
                description="Phoenix WebSocket ve MongoDB entegrasyonu"
                href="/docs/backend"
              />
              <DocCard
                icon={<Code2 className="w-6 h-6" />}
                title="Frontend (Next.js)"
                description="React bileşenleri ve state yönetimi"
                href="/docs/frontend"
              />
              <DocCard
                icon={<Zap className="w-6 h-6" />}
                title="Realtime Socket"
                description="Phoenix Channels ve WebSocket iletişimi"
                href="/docs/realtime"
              />
              <DocCard
                icon={<Puzzle className="w-6 h-6" />}
                title="API Referansı"
                description="REST ve WebSocket API dokümantasyonu"
                href="/docs/api"
              />
              <DocCard
                icon={<Server className="w-6 h-6" />}
                title="Deployment"
                description="Docker, Kubernetes ve cloud deployment"
                href="/docs/deployment"
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Popüler Konular</h2>
              <div className="space-y-4">
                <TopicLink title="ChessGame'i Docker ile nasıl deploy ederim?" href="/docs/deployment/docker" />
                <TopicLink title="Özel satranç motoru nasıl entegre edilir?" href="/docs/advanced/custom-engine" />
                <TopicLink title="WebSocket bağlantı sorunları nasıl çözülür?" href="/docs/troubleshooting/websocket" />
                <TopicLink title="MongoDB sharding yapılandırması" href="/docs/database/sharding" />
                <TopicLink title="Turnuva sistemi nasıl kurulur?" href="/docs/features/tournaments" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center space-y-6">
              <h2 className="text-3xl font-bold">Yardıma mı ihtiyacınız var?</h2>
              <p className="text-lg text-muted-foreground">
                Discord topluluğumuz size yardımcı olmaya hazır. Sorularınızı sorun, deneyimlerinizi paylaşın.
              </p>
              <Button size="lg" asChild>
                <a href="https://discord.gg/chessgame" target="_blank" rel="noopener noreferrer">
                  Discord'a Katıl
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function DocCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:bg-accent/50 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  )
}

function TopicLink({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-border bg-card p-4 hover:border-primary/50 hover:bg-accent/50 transition-all"
    >
      <p className="font-medium hover:text-primary transition-colors">{title}</p>
    </Link>
  )
}
