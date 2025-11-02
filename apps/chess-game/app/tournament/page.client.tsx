"use client";

import React from "react";
import { Trophy, CalendarDays, Users, MonitorPlay, Crown, Medal } from "lucide-react";

const PageClient: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center max-w-xl space-y-6">
        <div className="flex items-center justify-center gap-3 text-primary">
          <Trophy className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Turnuva Modu (Beta)</h1>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          Bu bölüm şu anda <strong>aktif geliştirme aşamasındadır</strong>.  
          Oyuncuların katılabildiği, eleme tablosu (bracket) ile ilerleyen  
          gerçek zamanlı satranç turnuvaları planlanmaktadır.
        </p>

        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-lg border bg-card">
            <CalendarDays className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-sm font-medium">Planlanmış Turnuvalar</p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <Users className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-sm font-medium">Oyuncu Kayıt Sistemi</p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <Crown className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-sm font-medium">Şampiyonluk Rozetleri</p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <MonitorPlay className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-sm font-medium">Canlı İzleme (Spectate)</p>
          </div>

          <div className="p-4 rounded-lg border bg-card col-span-3">
            <Trophy className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-sm font-medium">Bracket Görselleştirme</p>
          </div>
        </div>

        {/* ✅ Bracket & Ödül sistemi açıklaması */}
        <div className="pt-2 text-sm text-muted-foreground leading-relaxed">
          Turnuvalar <strong>tekli eleme (single elimination)</strong> formatıyla başlayacak.  
          Her turda kazanan bir üst tura çıkar, kaybeden elenir.  
          Final turunu kazanan → <strong>Turnuva Şampiyonu 🏆</strong>
        </div>

        {/* ✅ Rozet sistemi açıklaması */}
        <div className="text-sm text-muted-foreground leading-relaxed pt-3">
          Oyuncular turnuva geçmişine göre profilinde görünür rozetler kazanabilir:
          <br />
          <span className="block mt-2">
            🥇 <strong>Champion Badge</strong> — Turnuvayı kazananlar  
            <br />
            🥈 <strong>Finalist Badge</strong> — Final maçına çıkanlar  
            <br />
            🎖️ <strong>Participation Badge</strong> — Turnuvaya katılan herkes  
          </span>
        </div>

        <p className="text-sm text-muted-foreground pt-4">
          🔍 Tüm bu özellikler <strong>öğrenme ve geliştirici deneyimi amacıyla</strong> eklenmektedir.  
          İlk demo turnuva duyurusu GitHub üzerinden paylaşılacak.
        </p>

        <p className="text-xs text-muted-foreground">
          Geri bildirim & katkı → GitHub: @ilyasbozdemir
        </p>
      </div>
    </div>
  );
};

export default PageClient;
