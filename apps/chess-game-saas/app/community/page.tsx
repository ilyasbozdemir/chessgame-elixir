import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MessageSquare, Users, Heart, Github, Coffee, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Topluluk - ChessGame",
  description: "ChessGame topluluğuna katılın, katkıda bulunun ve projeyi destekleyin",
}

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <Users className="w-4 h-4 mr-2" />
                <span className="font-medium">Topluluk</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">Birlikte Geliştirelim</h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                ChessGame açık kaynak bir projedir. Topluluğumuzun katkıları sayesinde büyüyor ve gelişiyoruz.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
              <CommunityCard
                icon={<MessageSquare className="w-6 h-6" />}
                title="Discord Topluluğu"
                description="10,000+ geliştiricinin bulunduğu Discord sunucumuzda sorularınızı sorun, projelerinizi paylaşın."
                action={
                  <Button className="w-full" asChild>
                    <a href="https://discord.gg/chessgame" target="_blank" rel="noopener noreferrer">
                      Discord'a Katıl
                    </a>
                  </Button>
                }
              />
              <CommunityCard
                icon={<Github className="w-6 h-6" />}
                title="GitHub Katkısı"
                description="Kod katkısında bulunun, hata bildirin veya yeni özellikler önerin. Her katkı değerlidir."
                action={
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <a href="https://github.com/ilyasbozdemir/chessgame-elixir" target="_blank" rel="noopener noreferrer">
                      <Star className="w-4 h-4 mr-2" />
                      GitHub'da Star Verin
                    </a>
                  </Button>
                }
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                  <Heart className="w-8 h-8 text-primary" />
                  Projeyi Destekleyin
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  ChessGame tamamen ücretsiz ve açık kaynaktır. Projenin sürdürülebilirliği için desteğinize ihtiyacımız
                  var.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <SupportCard
                  icon={<Coffee className="w-8 h-8" />}
                  title="Kahve Ismarla"
                  description="Tek seferlik bağış yaparak projeyi destekleyin"
                  buttonText="Ko-fi ile Destek Ol"
                  buttonHref="https://ko-fi.com/chessgame"
                />
                <SupportCard
                  icon={<Heart className="w-8 h-8" />}
                  title="Sponsor Olun"
                  description="Aylık sponsorluk ile sürekli destek sağlayın"
                  buttonText="GitHub Sponsors"
                  buttonHref="https://github.com/sponsors/chessgame"
                />
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold mb-2">Diğer Destek Yolları</h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>GitHub'da star vererek projeye görünürlük kazandırın</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Sosyal medyada ChessGame'i paylaşın</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Dokümantasyon ve blog yazıları yazarak katkıda bulunun</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Yeni kullanıcılara Discord'da yardımcı olun</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Topluluk İstatistikleri</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard number="10,000+" label="Aktif Kullanıcı" />
                <StatCard number="2,500+" label="GitHub Stars" />
                <StatCard number="150+" label="Katkıda Bulunan" />
                <StatCard number="50+" label="Açık Kaynak Proje" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function CommunityCard({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode
  title: string
  description: string
  action: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="rounded-lg bg-primary/10 p-3 text-primary w-fit mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      {action}
    </div>
  )
}

function SupportCard({
  icon,
  title,
  description,
  buttonText,
  buttonHref,
}: {
  icon: React.ReactNode
  title: string
  description: string
  buttonText: string
  buttonHref: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 text-center">
      <div className="rounded-full bg-primary/10 p-4 text-primary w-fit mx-auto mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Button variant="outline" className="w-full bg-transparent" asChild>
        <a href={buttonHref} target="_blank" rel="noopener noreferrer">
          {buttonText}
        </a>
      </Button>
    </div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 text-center">
      <div className="text-3xl font-bold text-primary mb-2">{number}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
