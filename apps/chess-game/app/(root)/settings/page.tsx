"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, User, Bell, Shield, Palette } from "lucide-react"
import React from "react"

export default function SettingsPage() {
  return (
    <React.Fragment>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Settings className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl font-bold">Ayarlar</CardTitle>
            </div>
            <CardDescription>Hesap ve uygulama ayarlarınızı yönetin</CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Bildirimler
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="w-4 h-4 mr-2" />
              Gizlilik
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="w-4 h-4 mr-2" />
              Görünüm
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profil Bilgileri</CardTitle>
                <CardDescription>Profil bilgilerinizi güncelleyin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Kullanıcı Adı</Label>
                  <Input id="username" placeholder="kullaniciadi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input id="email" type="email" placeholder="ornek@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Ülke</Label>
                  <Select defaultValue="tr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr">Türkiye</SelectItem>
                      <SelectItem value="us">Amerika Birleşik Devletleri</SelectItem>
                      <SelectItem value="uk">Birleşik Krallık</SelectItem>
                      <SelectItem value="de">Almanya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Değişiklikleri Kaydet</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bildirim Tercihleri</CardTitle>
                <CardDescription>Hangi bildirimleri almak istediğinizi seçin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Oyun Davetleri</Label>
                    <p className="text-sm text-muted-foreground">Oyun davetleri için bildirim al</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Arkadaş İstekleri</Label>
                    <p className="text-sm text-muted-foreground">Yeni arkadaş istekleri için bildirim al</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Turnuva Bildirimleri</Label>
                    <p className="text-sm text-muted-foreground">Turnuva başlangıçları için bildirim al</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>E-posta Bildirimleri</Label>
                    <p className="text-sm text-muted-foreground">Önemli güncellemeler için e-posta al</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gizlilik Ayarları</CardTitle>
                <CardDescription>Gizlilik tercihlerinizi yönetin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Profil Görünürlüğü</Label>
                    <p className="text-sm text-muted-foreground">Profilinizi herkes görebilsin</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Oyun Geçmişi</Label>
                    <p className="text-sm text-muted-foreground">Oyun geçmişinizi herkese açık yap</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Çevrimiçi Durumu</Label>
                    <p className="text-sm text-muted-foreground">Çevrimiçi durumunuzu göster</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Görünüm Ayarları</CardTitle>
                <CardDescription>Uygulamanın görünümünü özelleştirin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Açık</SelectItem>
                      <SelectItem value="dark">Koyu</SelectItem>
                      <SelectItem value="system">Sistem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Satranç Tahtası Teması</Label>
                  <Select defaultValue="classic">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classic">Klasik</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="wood">Ahşap</SelectItem>
                      <SelectItem value="marble">Mermer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animasyonlar</Label>
                    <p className="text-sm text-muted-foreground">Taş hareketlerinde animasyon göster</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </React.Fragment>
  )
}
