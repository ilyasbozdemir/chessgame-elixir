"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Settings2, Shield, Bell, Database, Zap } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Settings2 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Ayarlar</h1>
          <p className="text-muted-foreground">Sistem ayarlarını yapılandırın</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle>Güvenlik Ayarları</CardTitle>
            </div>
            <CardDescription>Güvenlik ve erişim kontrollerini yönetin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>İki Faktörlü Kimlik Doğrulama</Label>
                <p className="text-sm text-muted-foreground">Yönetici hesabı için 2FA zorunluluğu</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Otomatik Hile Algılama</Label>
                <p className="text-sm text-muted-foreground">Şüpheli hareketleri otomatik tespit et</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>IP Yasaklama Sistemi</Label>
                <p className="text-sm text-muted-foreground">Yasaklanan kullanıcıların IP'lerini engelle</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>Maksimum Başarısız Giriş Denemesi</Label>
              <Input type="number" defaultValue="5" className="w-32" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <CardTitle>Bildirim Ayarları</CardTitle>
            </div>
            <CardDescription>Yönetici bildirimlerini yapılandırın</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Yeni Rapor Bildirimleri</Label>
                <p className="text-sm text-muted-foreground">Yeni rapor geldiğinde bildir</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sistem Uyarıları</Label>
                <p className="text-sm text-muted-foreground">Kritik sistem olaylarını bildir</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Günlük Rapor E-postaları</Label>
                <p className="text-sm text-muted-foreground">Günlük özet e-postaları gönder</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>Bildirim E-posta Adresi</Label>
              <Input type="email" placeholder="admin@example.com" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <CardTitle>Oyun Ayarları</CardTitle>
            </div>
            <CardDescription>Genel oyun kurallarını ve limitleri ayarlayın</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Minimum Oyun Süresi (dakika)</Label>
              <Input type="number" defaultValue="1" className="w-32" />
            </div>
            <div className="space-y-2">
              <Label>Maksimum Oyun Süresi (dakika)</Label>
              <Input type="number" defaultValue="180" className="w-32" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Misafir Kullanıcılara İzin Ver</Label>
                <p className="text-sm text-muted-foreground">Kayıtsız kullanıcılar oynayabilir</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sohbet Sistemi</Label>
                <p className="text-sm text-muted-foreground">Oyun içi sohbeti etkinleştir</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Başlangıç Rating</Label>
              <Input type="number" defaultValue="1200" className="w-32" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              <CardTitle>Sistem Bakımı</CardTitle>
            </div>
            <CardDescription>Veritabanı ve sistem bakım işlemleri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Bakım Modu Mesajı</Label>
              <Textarea
                placeholder="Sistem bakımda, lütfen daha sonra tekrar deneyin..."
                className="resize-none"
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bakım Modu</Label>
                <p className="text-sm text-muted-foreground">Siteyi bakım moduna al</p>
              </div>
              <Switch />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Veritabanı Yedeği Al</Button>
              <Button variant="outline">Cache'i Temizle</Button>
              <Button variant="destructive">Eski Oyunları Temizle</Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Değişiklikleri İptal</Button>
          <Button>Ayarları Kaydet</Button>
        </div>
      </div>
    </div>
  )
}
