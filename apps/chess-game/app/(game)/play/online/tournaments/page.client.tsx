import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Clock, ChevronRight } from "lucide-react";

export default function TournamentsPage() {
  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Trophy className="w-8 h-8" /> Turnuvalar
        </h1>

        {/* Featured Section */}
        <Card className="shadow-xl">
          <CardContent className="p-6 grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Günlük Turnuvalar</h2>
              <p className="text-muted-foreground text-sm">
                Her gün yüzlerce oyuncunun katıldığı hızlı eşleşen online turnuvalar.
              </p>
              <Link href="/play/online/tournaments/join">
                <Button size="lg" className="w-full md:w-auto flex items-center gap-2">
                  Turnuvaları Gör <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="bg-muted p-4 rounded-xl h-40 flex items-center justify-center text-muted-foreground">
              (görsel placeholder)
            </div>
          </CardContent>
        </Card>

        {/* Tournament Categories */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="hover:bg-accent transition cursor-pointer">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Hızlı Canlı Turnuvalar</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Blitz ve Rapid modlarında gerçek zamanlı rekabet.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:bg-accent transition cursor-pointer">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Topluluk Turnuvaları</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Kulüpler ve topluluklar tarafından düzenlenen özel etkinlikler.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:bg-accent transition cursor-pointer">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Açık Turnuvalar</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Her seviyeden oyuncuya açık büyük turnuvalar.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:bg-accent transition cursor-pointer">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Ödüllü Turnuvalar</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Ödüllü özel etkinliklerde yerinizi alın.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent or Ongoing */}
        <h2 className="text-xl font-bold mt-6">Devam Eden Turnuvalar</h2>
        <Card>
          <CardContent className="p-4 text-muted-foreground text-center">
            Şu anda aktif bir turnuva bulunmuyor.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
