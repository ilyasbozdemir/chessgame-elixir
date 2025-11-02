"use client";

import React from "react";
import { Trophy, CalendarDays, Users } from "lucide-react";

const PageClient: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center max-w-lg space-y-6">
        <div className="flex items-center justify-center gap-3 text-primary">
          <Trophy className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Turnuva Modu (Beta)</h1>
        </div>

        <p className="text-muted-foreground">
          Yakında özel turnuvalar, eleme sistemi (bracket), ödüller ve canlı izleme desteği geliyor.
        </p>

        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-lg border bg-card">
            <CalendarDays className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-sm font-medium">Zamanlanmış Maçlar</p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <Users className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-sm font-medium">Oyuncu Kayıt Sistemi</p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <Trophy className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-sm font-medium">Bracket Görselleştirme</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground pt-4">
          🔧 Şu an geliştirme aşamasında. Yakında ilk mini turnuva duyurulacak!
        </p>
      </div>
    </div>
  );
};

export default PageClient;
