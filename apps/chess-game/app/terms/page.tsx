"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function TermsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <aside className="hidden lg:block w-64 border-r border-border sticky top-16 h-[calc(100vh-4rem)]">
          <Sidebar />
        </aside>

        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetTrigger asChild className="lg:hidden fixed bottom-4 left-4 z-50">
            <Button size="icon" className="rounded-full shadow-lg h-14 w-14">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
          <Card className="p-8">
            <h1 className="text-3xl font-bold mb-6">Kullanım Şartları</h1>

            <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Genel Koşullar</h2>
                <p className="leading-relaxed">
                  ChessGame platformunu kullanarak bu şartları kabul etmiş sayılırsınız. Platformumuz satranç oyunu
                  oynamak, öğrenmek ve toplulukla etkileşim kurmak için tasarlanmıştır.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Hesap Kullanımı</h2>
                <p className="leading-relaxed">
                  Kullanıcılar hesaplarından sorumludur. Şifrenizi güvenli tutmalı ve başkalarıyla paylaşmamalısınız.
                  Anonim oyun özelliği hesap olmadan oyun oynamanıza izin verir.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Topluluk Kuralları</h2>
                <p className="leading-relaxed">
                  Saygılı olun, spam yapmayın ve adil oynayın. Hile yapan kullanıcılar banlanacaktır. Küfür, hakaret ve
                  uygunsuz içerik paylaşımı yasaktır.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Gizlilik</h2>
                <p className="leading-relaxed">
                  Kullanıcı verilerinizi koruma altına alıyoruz. Kişisel bilgileriniz üçüncü şahıslarla paylaşılmaz.
                  Daha fazla bilgi için Gizlilik Politikamızı inceleyebilirsiniz.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. İçerik Hakları</h2>
                <p className="leading-relaxed">
                  Platformda paylaşılan tüm içerikler telif hakları ile korunmaktadır. İzinsiz kopyalama ve dağıtım
                  yasaktır.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">6. Sorumluluk Reddi</h2>
                <p className="leading-relaxed">
                  Platform "olduğu gibi" sunulmaktadır. Hizmet kesintilerinden sorumlu değiliz. Demo içerikler
                  arkadaşlarımız tarafından hazırlanmıştır ve eğitim amaçlıdır.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-muted-foreground">Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
