import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Scale } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "MIT Lisansı - ChessGame",
  description: "ChessGame açık kaynak MIT lisans detayları",
}

export default function LicensePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <Scale className="w-4 h-4 mr-2" />
                <span className="font-medium">Açık Kaynak</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">MIT Lisansı</h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                ChessGame açık kaynak ve özgür yazılımdır
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 mb-8">
              <h2 className="text-xl font-bold mb-3">Neden MIT Lisansı?</h2>
              <p className="text-muted-foreground leading-relaxed">
                MIT Lisansı, en özgür ve esnek açık kaynak lisanslarından biridir. ChessGame'i ticari projelerinizde
                kullanabilir, değiştirebilir ve dağıtabilirsiniz.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3 mb-12">
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">✓</div>
                <h3 className="font-semibold mb-1">Ticari Kullanım</h3>
                <p className="text-sm text-muted-foreground">Ticari projelerde özgürce kullanın</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">✓</div>
                <h3 className="font-semibold mb-1">Değiştirme</h3>
                <p className="text-sm text-muted-foreground">Kaynak kodu istediğiniz gibi düzenleyin</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">✓</div>
                <h3 className="font-semibold mb-1">Dağıtım</h3>
                <p className="text-sm text-muted-foreground">Değiştirilmiş versiyonları paylaşın</p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">MIT License</h2>
              <div className="font-mono text-sm space-y-4 text-muted-foreground leading-relaxed">
                <p>Copyright (c) 2025 ChessGame Contributors</p>

                <p>
                  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
                  associated documentation files (the "Software"), to deal in the Software without restriction,
                  including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
                  and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
                  subject to the following conditions:
                </p>

                <p>
                  The above copyright notice and this permission notice shall be included in all copies or substantial
                  portions of the Software.
                </p>

                <p>
                  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
                  LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                  NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Türkçe Özet</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">İzin verilen:</strong> ChessGame'i kullanabilir, kopyalayabilir,
                    değiştirebilir, birleştirebilir, yayınlayabilir, dağıtabilir, alt lisans verebilir ve/veya
                    satabilirsiniz.
                  </p>
                  <p>
                    <strong className="text-foreground">Koşul:</strong> Yukarıdaki telif hakkı bildirimi ve bu izin
                    bildirimi, Yazılımın tüm kopyalarına veya önemli bölümlerine dahil edilmelidir.
                  </p>
                  <p>
                    <strong className="text-foreground">Garanti yok:</strong> Yazılım "olduğu gibi" sağlanır, açık veya
                    zımni hiçbir garanti olmaksızın.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-xl font-bold mb-4">Sıkça Sorulan Sorular</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold mb-1">ChessGame'i ticari projemde kullanabilir miyim?</p>
                    <p className="text-muted-foreground">Evet, MIT Lisansı ticari kullanıma izin verir.</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Kaynak kodu değiştirmek zorunda mıyım?</p>
                    <p className="text-muted-foreground">
                      Hayır, kaynak kodunuzu açmak zorunda değilsiniz. Sadece lisans bildirimini korumalısınız.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">ChessGame ismini kullanabilir miyim?</p>
                    <p className="text-muted-foreground">
                      Kaynak kodu serbesttir, ancak marka kullanımı için izin gerekir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-8">
                <Button size="lg" asChild>
                  <a
                    href="https://github.com/yourusername/chessgame/blob/main/LICENSE"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub'da Tam Lisansı Görüntüle
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
