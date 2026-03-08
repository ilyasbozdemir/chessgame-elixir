"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const specialties = ["Açılış", "Orta Oyun", "Taktik", "Blitz"];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Profilim</h1>

      <Card>
        <CardHeader>
          <CardTitle>Koç Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input defaultValue="GM Murat Kaya" placeholder="İsim" />
          <Input defaultValue="Grandmaster" placeholder="Unvan" />
          <Input defaultValue="2550" placeholder="Rating" />
          <Input defaultValue="600" placeholder="Saatlik Ücret (₺)" />

          <div>
            <p className="text-sm mb-2">Uzmanlıklar:</p>
            <div className="flex gap-2 flex-wrap">
              {specialties.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          </div>

          <Button className="w-full">Kaydet</Button>
        </CardContent>
      </Card>
    </div>
  );
}
