import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Code2, Puzzle, Bot, Users, Trophy, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Örnekler - ChessGame",
  description: "ChessGame platformu için hazır kod örnekleri ve entegrasyonlar",
}

export default function ExamplesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <Puzzle className="w-4 h-4 mr-2" />
                <span className="font-medium">Kod Örnekleri</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">Hazır Örnekler</h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                ChessGame'i entegre etmek için hazır kod örnekleri. Kopyalayın, yapıştırın ve özelleştirin.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              <ExampleCard
                icon={<Code2 className="w-6 h-6" />}
                title="Temel Oyun"
                description="İki oyunculu temel satranç oyunu kurulumu"
                tags={["Next.js", "React"]}
                githubUrl="https://github.com/ilyasbozdemir/chessgame-elixir/tree/main/examples/basic-game"
              />
              <ExampleCard
                icon={<Bot className="w-6 h-6" />}
                title="AI Rakip"
                description="Stockfish entegrasyonu ile AI'ya karşı oynama"
                tags={["Elixir", "AI"]}
                githubUrl="https://github.com/ilyasbozdemir/chessgame-elixir/tree/main/examples/ai-opponent"
              />
              <ExampleCard
                icon={<Users className="w-6 h-6" />}
                title="Çoklu Oyuncu Lobby"
                description="Oyuncu eşleştirme ve oda sistemi"
                tags={["Phoenix", "WebSocket"]}
                githubUrl="https://github.com/ilyasbozdemir/chessgame-elixir/tree/main/examples/multiplayer-lobby"
              />
              <ExampleCard
                icon={<Trophy className="w-6 h-6" />}
                title="Turnuva Sistemi"
                description="Otomatik eşleştirme ve sıralama tablosu"
                tags={["MongoDB", "Backend"]}
                githubUrl="https://github.com/ilyasbozdemir/chessgame-elixir/tree/main/examples/tournament"
              />
              <ExampleCard
                icon={<Eye className="w-6 h-6" />}
                title="Seyirci Modu"
                description="Canlı oyunları izleme ve replay"
                tags={["React", "WebSocket"]}
                githubUrl="https://github.com/ilyasbozdemir/chessgame-elixir/tree/main/examples/spectator-mode"
              />
              <ExampleCard
                icon={<Code2 className="w-6 h-6" />}
                title="Discord Bot"
                description="Discord sunucunuzda satranç oynama"
                tags={["Discord.js", "Bot"]}
                githubUrl="https://github.com/ilyasbozdemir/chessgame-elixir/tree/main/examples/discord-bot"
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Hızlı Başlangıç Şablonları</h2>
              <div className="space-y-4">
                <TemplateCard
                  title="Next.js + TypeScript Starter"
                  description="Tam özellikli Next.js uygulaması, TypeScript, Tailwind CSS ve tüm ChessGame özellikleri"
                  command="npx create-chessgame-app my-app"
                />
                <TemplateCard
                  title="Docker Compose Stack"
                  description="Elixir backend, Next.js frontend ve MongoDB'yi tek komutla başlatın"
                  command="curl -fsSL https://chessgame.io/docker-compose.yml | docker-compose -f - up"
                />
                <TemplateCard
                  title="Kubernetes Helm Chart"
                  description="Production-ready Kubernetes deployment"
                  command="helm install chessgame chessgame/chessgame"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function ExampleCard({
  icon,
  title,
  description,
  tags,
  githubUrl,
}: {
  icon: React.ReactNode
  title: string
  description: string
  tags: string[]
  githubUrl: string
}) {
  return (
    <div className="group rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className="rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              Kodu Görüntüle
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

function TemplateCard({ title, description, command }: { title: string; description: string; command: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="rounded-md bg-muted p-3 font-mono text-sm overflow-x-auto">
        <code>{command}</code>
      </div>
    </div>
  )
}
