import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Coffee, Heart, Sparkles, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Destekle - ChessGame",
  description: "ChessGame projesini destekleyin ve geliştirmeye katkıda bulunun",
}

export default function SupportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <Heart className="w-4 h-4 mr-2" />
                <span className="font-medium">Bağış Yap</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">ChessGame'e Destek Olun</h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                ChessGame açık kaynak ve tamamen ücretsiz bir projedir. Geliştirmeyi sürdürmek için desteğinize
                ihtiyacımız var.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid gap-8 md:grid-cols-3 mb-12">
              <SupportTier
                icon={<Coffee className="w-8 h-8" />}
                title="Kahve Ismarla"
                price="$5"
                description="Tek seferlik küçük bir destek"
                features={[
                  "Topluluk Slack'ine özel erişim",
                  "Teşekkür mesajı Discord'da",
                  "Supporters listesinde isminiz",
                ]}
                buttonText="Ko-fi ile Destek Ol"
                buttonHref="https://ko-fi.com/chessgame"
              />
              <SupportTier
                icon={<Heart className="w-8 h-8" />}
                title="Destekçi"
                price="$10/ay"
                description="Aylık sürekli destek"
                features={[
                  "Tüm Kahve özellikleri",
                  "Erken erişim yeni özelliklere",
                  "Özel Destekçi rozeti",
                  "Aylık gelişim raporları",
                ]}
                buttonText="GitHub Sponsors"
                buttonHref="https://github.com/sponsors/chessgame"
                featured
              />
              <SupportTier
                icon={<Sparkles className="w-8 h-8" />}
                title="Sponsor"
                price="$50/ay"
                description="Premium destek paketi"
                features={[
                  "Tüm Destekçi özellikleri",
                  "Logo'nuz README'de",
                  "Öncelikli issue desteği",
                  "Özellik isteği önceliği",
                  "1-1 danışmanlık saati",
                ]}
                buttonText="İletişime Geçin"
                buttonHref="mailto:support@chessgame.io"
              />
            </div>

            <div className="rounded-lg border border-border bg-card p-8 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Gift className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Kurumsal Sponsorluk</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Şirketiniz ChessGame'i kullanıyor mu? Kurumsal sponsorluk paketlerimiz hakkında bilgi almak için
                  bizimle iletişime geçin.
                </p>
              </div>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:enterprise@chessgame.io">Kurumsal Paket için İletişim</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Destekleriniz Nerelere Gidiyor?</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <BudgetItem
                percentage="40%"
                title="Geliştirme"
                description="Yeni özellikler, hata düzeltmeleri ve kod iyileştirmeleri"
              />
              <BudgetItem
                percentage="25%"
                title="Altyapı"
                description="Server maliyetleri, CI/CD, ve hosting giderleri"
              />
              <BudgetItem
                percentage="20%"
                title="Dokümantasyon"
                description="Kapsamlı kılavuzlar, API docs ve örnekler"
              />
              <BudgetItem
                percentage="15%"
                title="Topluluk"
                description="Etkinlikler, yarışmalar ve topluluk ödülleri"
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center space-y-6">
            <h2 className="text-3xl font-bold">Teşekkürler!</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Destekleriniz sayesinde ChessGame her geçen gün daha iyi hale geliyor. Küçük veya büyük, her katkı bizim
              için çok değerli.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <a href="https://ko-fi.com/chessgame" target="_blank" rel="noopener noreferrer">
                  <Coffee className="w-5 h-5 mr-2" />
                  Kahve Ismarla
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com/sponsors/chessgame" target="_blank" rel="noopener noreferrer">
                  <Heart className="w-5 h-5 mr-2" />
                  Sponsor Ol
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

function SupportTier({
  icon,
  title,
  price,
  description,
  features,
  buttonText,
  buttonHref,
  featured = false,
}: {
  icon: React.ReactNode
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonHref: string
  featured?: boolean
}) {
  return (
    <div
      className={`rounded-lg border p-6 ${featured ? "border-primary bg-primary/5 shadow-lg scale-105" : "border-border bg-card"}`}
    >
      <div className="rounded-lg bg-primary/10 p-3 text-primary w-fit mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <div className="text-3xl font-bold text-primary mb-2">{price}</div>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="text-primary mt-0.5">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full" variant={featured ? "default" : "outline"} asChild>
        <a href={buttonHref} target="_blank" rel="noopener noreferrer">
          {buttonText}
        </a>
      </Button>
    </div>
  )
}

function BudgetItem({ percentage, title, description }: { percentage: string; title: string; description: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="text-2xl font-bold text-primary mb-2">{percentage}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
