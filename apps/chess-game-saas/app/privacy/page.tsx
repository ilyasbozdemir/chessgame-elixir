import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield } from "lucide-react"

export const metadata = {
  title: "Gizlilik Politikası - ChessGame",
  description: "ChessGame gizlilik politikası ve veri koruma uygulamaları",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <Shield className="w-4 h-4 mr-2" />
                <span className="font-medium">Gizlilik</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">Gizlilik Politikası</h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">Son güncelleme: 15 Ocak 2025</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Giriş</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    ChessGame olarak gizliliğinize önem veriyoruz. Bu gizlilik politikası, kişisel verilerinizi nasıl
                    topladığımızı, kullandığımızı ve koruduğumuzu açıklamaktadır.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Topladığımız Bilgiler</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Kullanıcı Bilgileri</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>E-posta adresi (kayıt için)</li>
                        <li>Kullanıcı adı</li>
                        <li>Profil bilgileri (isteğe bağlı)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Oyun Verileri</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Oyun geçmişi ve hamle kayıtları</li>
                        <li>İstatistikler ve başarılar</li>
                        <li>Turnuva katılımları</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Teknik Veriler</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>IP adresi</li>
                        <li>Tarayıcı bilgileri</li>
                        <li>Cihaz bilgileri</li>
                        <li>Kullanım istatistikleri</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Verilerin Kullanımı</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Topladığımız verileri aşağıdaki amaçlar için kullanırız:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Hesap yönetimi ve kimlik doğrulama</li>
                    <li>Oyun deneyimini geliştirme</li>
                    <li>Eşleştirme algoritması ve ELO hesaplaması</li>
                    <li>Hile koruması ve fair play sistemi</li>
                    <li>Teknik destek sağlama</li>
                    <li>Platform performansını analiz etme</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Self-Hosted Kurulumlar</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    ChessGame'i kendi sunucunuzda çalıştırdığınızda, tüm veriler sizin kontrolünüzdedir. Biz self-hosted
                    kurulumlardan hiçbir veri toplamayız veya saklamayız. Veri yönetimi tamamen size aittir.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Veri Güvenliği</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Verilerinizi korumak için şu önlemleri alıyoruz:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>End-to-end şifreleme</li>
                    <li>Güvenli WebSocket bağlantıları (WSS)</li>
                    <li>Şifreler bcrypt ile hash'lenir</li>
                    <li>JWT token tabanlı kimlik doğrulama</li>
                    <li>MongoDB güvenlik best practices</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Çerezler (Cookies)</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Oturum yönetimi ve kullanıcı deneyimini iyileştirmek için çerezler kullanıyoruz. Tarayıcınızdan
                    çerez tercihlerinizi yönetebilirsiniz.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Üçüncü Taraf Hizmetler</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Aşağıdaki üçüncü taraf hizmetleri kullanıyoruz:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>MongoDB Atlas (veritabanı hosting)</li>
                    <li>GitHub (kaynak kodu ve kimlik doğrulama)</li>
                    <li>Discord (topluluk ve iletişim)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Haklarınız</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    KVKK ve GDPR kapsamında şu haklara sahipsiniz:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Verilerinize erişim hakkı</li>
                    <li>Verilerin düzeltilmesini talep etme</li>
                    <li>Verilerin silinmesini isteme ("unutulma hakkı")</li>
                    <li>Veri taşınabilirliği</li>
                    <li>İşlemeye itiraz etme</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Çocukların Gizliliği</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    ChessGame 13 yaşın altındaki çocuklardan bilerek veri toplamaz. Ebeveynseniz ve çocuğunuzun bize
                    veri verdiğini düşünüyorsanız, lütfen bizimle iletişime geçin.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Politika Değişiklikleri</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler e-posta ile
                    bildirilecektir.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">İletişim</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Gizlilik konusunda sorularınız için: <br />
                    E-posta: privacy@chessgame.io
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
