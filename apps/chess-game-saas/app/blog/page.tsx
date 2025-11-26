import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Blog - ChessGame",
  description: "ChessGame platformu hakkında güncellemeler, makaleler ve teknik yazılar",
}

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">Blog</h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                ChessGame platformu hakkında güncellemeler, teknik makaleler ve topluluk hikayeleri
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              <BlogPostCard
                title="ChessGame v2.0 Yayınlandı"
                excerpt="Yeni yapay zeka analiz sistemi, turnuva modu ve performans iyileştirmeleri ile ChessGame'in en büyük güncellemesi."
                author="Ekip"
                date="15 Ocak 2025"
                category="Güncelleme"
                slug="chessgame-v2-0-released"
              />
              <BlogPostCard
                title="Elixir ile Gerçek Zamanlı Oyun Geliştirme"
                excerpt="Phoenix Channels kullanarak düşük gecikmeli, ölçeklenebilir multiplayer satranç oyunu nasıl geliştirdik."
                author="Can Yılmaz"
                date="8 Ocak 2025"
                category="Teknik"
                slug="realtime-game-development-elixir"
              />
              <BlogPostCard
                title="MongoDB ile Satranç Oyunu Verilerini Yönetmek"
                excerpt="Hamle geçmişi, oyuncu istatistikleri ve turnuva verilerini verimli bir şekilde saklamak için MongoDB şeması tasarımı."
                author="Ayşe Demir"
                date="2 Ocak 2025"
                category="Veritabanı"
                slug="mongodb-chess-data-management"
              />
              <BlogPostCard
                title="Kubernetes'te ChessGame Deploy Etmek"
                excerpt="Production ortamında Kubernetes üzerinde ChessGame'i yüksek erişilebilirlik ile nasıl deploy edebilirsiniz?"
                author="Mehmet Kaya"
                date="27 Aralık 2024"
                category="DevOps"
                slug="kubernetes-deployment-guide"
              />
              <BlogPostCard
                title="Topluluk Spotlight: 10,000 Kullanıcı"
                excerpt="ChessGame topluluğu 10,000 aktif kullanıcıya ulaştı. Bu yolculukta bize eşlik eden herkese teşekkürler!"
                author="Ekip"
                date="20 Aralık 2024"
                category="Topluluk"
                slug="community-10k-users"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function BlogPostCard({
  title,
  excerpt,
  author,
  date,
  category,
  slug,
}: {
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  slug: string
}) {
  return (
    <article className="group rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:bg-accent/50 transition-all">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">{category}</span>
      </div>
      <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h2>
      <p className="text-muted-foreground mb-4 leading-relaxed">{excerpt}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>
        <Link
          href={`/blog/${slug}`}
          className="text-primary hover:underline flex items-center gap-1 text-sm font-medium"
        >
          Devamını Oku
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  )
}
