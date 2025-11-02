"use client";

import { Crown, Medal } from "lucide-react";

export default function LeaderboardPage() {
  // ileride API / DB'den gelecek veri
  const players: any[] = []; // şimdilik boş

  const hasData = players.length > 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <Crown className="w-7 h-7 text-primary" /> Lider Tablosu
      </h1>

      {!hasData ? (
        <div className="text-center py-20 text-muted-foreground space-y-3">
          <Medal className="w-10 h-10 mx-auto opacity-70" />
          <p className="text-lg font-medium">Henüz sıralama verisi bulunmuyor</p>
          <p className="text-sm">🛠️ Sistem geliştirme aşamasında — yakında aktif olacak.</p>
        </div>
      ) : (
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Oyuncu</th>
                <th className="p-3 text-center">Galibiyet</th>
                <th className="p-3 text-center">Mağlubiyet</th>
                <th className="p-3 text-center">Rozet</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, index) => (
                <tr key={p._id} className="border-t">
                  <td className="p-3 font-semibold">{index + 1}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3 text-center">{p.wins}</td>
                  <td className="p-3 text-center">{p.losses}</td>
                  <td className="p-3 text-center">
                    <Medal className="inline w-4 h-4 text-primary" /> {p.badges}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
