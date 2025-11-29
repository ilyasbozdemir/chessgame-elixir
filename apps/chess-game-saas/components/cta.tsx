import { Button } from "@/components/ui/button"
import { Download, Github } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative px-6 py-16 sm:px-12 sm:py-24 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-6">
              Tamamen Ücretsiz ve Açık Kaynak
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
              ChessGame platformunu hemen indirin ve kendi satranç topluluğunuzu oluşturun. Lisans ücreti yok, kullanıcı
              limiti yok.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 min-w-[200px]">
                <Download className="w-5 h-5" />
                Şimdi İndirin
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 min-w-[200px] bg-transparent">
                <a href="https://github.com/ilyasbozdemir/chessgame-elixir" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>MIT License</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Self-Hosted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Production Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
