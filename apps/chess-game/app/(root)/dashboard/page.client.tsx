"use client";

import Link from "next/link";
import { Trophy, Settings, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockManagedClubs = [
  {
    id: 1,
    name: "İstanbul Satranç Kulübü",
    role: "Kurucu",
    members: 1250,
    status: "active",
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Blitz Federasyonu",
    role: "Yönetici",
    members: 850,
    status: "active",
    createdAt: "2023-06-20",
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Hesabınız ve kulüplerinizi yönetin
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="clubs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="clubs" className="gap-2">
              <Trophy className="w-4 h-4" />
              Yönetilen Kulüpler
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Ayarlar
            </TabsTrigger>
          </TabsList>

          {/* Yönetilen Kulüpler Tab */}
          <TabsContent value="clubs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Yönetilen Kulüpler</h2>
              <Link href="/clubs/create">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Yeni Kulüp
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockManagedClubs.map((club) => (
                <Card key={club.id} className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{club.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {club.members} üye
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Rolü</p>
                      <p className="font-semibold text-sm">{club.role}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Kuruluş</p>
                      <p className="font-semibold text-sm">{club.createdAt}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/clubs/${club.id}/manage`} className="flex-1">
                      <Button
                        size="sm"
                        className="w-full gap-2"
                        variant="default"
                      >
                        <Settings className="w-4 h-4" />
                        Yönet
                      </Button>
                    </Link>
                    <Link href={`/clubs/${club.id}`} className="flex-1">
                      <Button
                        size="sm"
                        className="w-full bg-transparent"
                        variant="outline"
                      >
                        Ziyaret Et
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Ayarlar Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Profil Ayarları</h3>
                <Button variant="outline">Profili Düzenle</Button>
                <Button variant="outline">Şifremi Değiştir</Button>
              </div>
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Gizlilik ve Bildirimler</h3>
                <Button variant="outline">Gizlilik Ayarları</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
