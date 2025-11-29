import Link from "next/link"
import { Crown, Github, Twitter, MessageSquare, Coffee, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-full bg-primary/15">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Chess<span className="text-primary">Game</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Gerçek zamanlı, açık kaynak satranç platformu. Kendi sunucunuzda deploy edin.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Ürün</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Özellikler
                </Link>
              </li>
              <li>
                <Link href="/deployment" className="text-muted-foreground hover:text-primary transition-colors">
                  Deployment
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                  Dokümantasyon
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-muted-foreground hover:text-primary transition-colors">
                  Örnekler
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kaynak</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/docs/api" className="text-muted-foreground hover:text-primary transition-colors">
                  API Docs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-primary transition-colors">
                  Topluluk
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  <Coffee className="w-3 h-3" />
                  Destekle
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Bağlantılar</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/ilyasbozdemir/chessgame-elixir"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background hover:bg-accent hover:border-primary/50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/chessgame"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background hover:bg-accent hover:border-primary/50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://discord.gg/chessgame"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background hover:bg-accent hover:border-primary/50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
                <span>Sevgiyle yapıldı</span>
                <a
                  href="https://ilyasbozdemir.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  İlyas Bozdemir
                </a>
                <span>tarafından</span>
              </p>
              <span className="hidden sm:inline text-muted-foreground/50">•</span>
              <p className="text-center sm:text-left">Portfolio amaçlı hazırlanmıştır</p>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Gizlilik
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Şartlar
              </Link>
              <Link href="/license" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                MIT License
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
