"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RequestsPage() {
  const requests = [
    {
      id: 1,
      student: "Mehmet A.",
      type: "Blitz (5 dk)",
      note: "Açılış çalışmak istiyorum.",
    },
    {
      id: 2,
      student: "Selin G.",
      type: "Rapid (10 dk)",
      note: "Orta oyun strateji dersi.",
    },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Ders Talepleri</h1>

      {requests.map((r) => (
        <Card key={r.id}>
          <CardHeader>
            <CardTitle>Talep #{r.id}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p><strong>Öğrenci:</strong> {r.student}</p>
            <p><strong>Tür:</strong> <Badge>{r.type}</Badge></p>
            <p><strong>Not:</strong> {r.note}</p>

            <div className="flex gap-3">
              <Button>Kabul Et</Button>
              <Button variant="destructive">Reddet</Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {requests.length === 0 && (
        <p className="text-muted-foreground text-center py-10">
          Bekleyen talep yok.
        </p>
      )}
    </div>
  );
}
