import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FileText } from "lucide-react"

export const metadata = {
  title: "Kullanım Şartları - ChessGame",
  description: "ChessGame platformu kullanım şartları ve koşulları",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <FileText className="w-4 h-4 mr-2" />
                <span className="font-medium">Yasal</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">Kullanım Şartları</h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">Son güncelleme: 15 Ocak 2025</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">1. Kabul</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    ChessGame platformunu kullanarak, bu kullanım şartlarını kabul etmiş olursunuz. Şartları kabul
                    etmiyorsanız, lütfen platformu kullanmayın.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">2. Lisans</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    ChessGame, MIT Lisansı altında dağıtılan açık kaynak bir yazılımdır. Kaynak kodunu özgürce
                    kullanabilir, değiştirebilir ve dağıtabilirsiniz.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">3. Hesap Kullanımı</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>Kullanıcılar şunları kabul eder:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Hesap bilgilerinin güvenliğinden sorumlu olmak</li>
                      <li>Tek bir kişiye ait hesap oluşturmak</li>
                      <li>Hesap paylaşımı yapmamak</li>
                      <li>Şüpheli aktiviteleri bildirmek</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">4. Fair Play ve Hile</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>Aşağıdaki davranışlar kesinlikle yasaktır:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Satranç motoru veya yapay zeka yardımı kullanmak (belirlenen modlar dışında)</li>
                      <li>Çoklu hesap kullanarak ELO manipülasyonu</li>
                      <li>Kasıtlı oyun bozma veya trolleme</li>
                      <li>Botlar kullanarak otomatik oynama</li>
                      <li>Rakibe hakaret veya tehdit</li>
                    </ul>
                    <p className="mt-4">İhlaller hesap askıya alma veya kalıcı banla sonuçlanabilir.</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">5. İçerik Politikası</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>Kullanıcılar şunları paylaşamaz:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Nefret söylemi veya ayrımcılık içeren içerik</li>
                      <li>Müstehcen veya uygunsuz içerik</li>
                      <li>Spam veya reklam</li>
                      <li>Yanıltıcı veya sahte bilgiler</li>
                      <li>Telif hakkı ihlali yapan içerik</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">6. Self-Hosted Kurulumlar</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    ChessGame'i kendi sunucunuzda çalıştırdığınızda, o sunucunun yönetiminden ve yasal
                    sorumluluklarından siz sorumlusunuz. MIT Lisansı koşullarına uygun kullanım gereklidir.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">7. Hizmet Garantisi</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    ChessGame "olduğu gibi" sunulmaktadır. Hizmetin kesintisiz veya hatasız olacağını garanti etmiyoruz.
                    Bakım için geçici kesintiler olabilir.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">8. Sorumluluk Reddi</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    ChessGame, kullanımdan kaynaklanan doğrudan veya dolaylı zararlardan sorumlu değildir. Platform
                    eğitim ve eğlence amaçlıdır.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">9. Fikri Mülkiyet</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    ChessGame logosu, marka ve özgün içerik ChessGame projesine aittir. MIT Lisansı altında kaynak kodu
                    serbestçe kullanılabilir, ancak marka kullanımı için izin gerekir.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">10. Hesap Feshi</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Kullanım şartlarını ihlal eden hesapları bildirimsiz feshetme hakkını saklı tutarız. Hesabınızı
                    istediğiniz zaman kapatabilirsiniz.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">11. Değişiklikler</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Bu şartları zaman zaman güncelleyebiliriz. Önemli değişiklikler platformda duyurulacaktır. Devam
                    eden kullanım, güncellenmiş şartları kabul ettiğiniz anlamına gelir.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">12. İletişim</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Şartlar hakkında sorularınız için:
                    <br />
                    E-posta: legal@chessgame.io
                    <br />
                    Discord: discord.gg/chessgame
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
