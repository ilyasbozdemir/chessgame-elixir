"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CalendarPage() {
  const week = {
    monday: [
      { time: "18:00", student: "Ali Y.", type: "Rapid" },
      { time: "20:00", student: "Ceren D.", type: "Blitz" },
    ],
    tuesday: [
      { time: "19:00", student: "Serhat E.", type: "Açılış Analizi" },
    ],
    wednesday: [],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Takvim</h1>

      {Object.entries(week).map(([day, lessons]) => (
        <Card key={day}>
          <CardHeader>
            <CardTitle className="capitalize">{day}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {lessons.length === 0 && (
              <p className="text-muted-foreground text-sm">Ders yok</p>
            )}

            {lessons.map((l, i) => (
              <div key={i} className="border p-3 rounded-lg">
                <p className="font-semibold">{l.time}</p>
                <p className="text-sm">{l.student}</p>
                <p className="text-xs text-muted-foreground">{l.type}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Button className="mt-5">Yeni Ders Ekle</Button>
    </div>
  );
}
