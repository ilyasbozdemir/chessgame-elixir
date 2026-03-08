"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Save, Camera } from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();
  const [username, setUsername] = useState("ilyas-bozdemir");
  const [fullName, setFullName] = useState("İlyas Bozdemir");
  const [email, setEmail] = useState("ilyas@example.com");
  const [bio, setBio] = useState("Satranç tutkunuyum. Haftasonları genelde online oynuyorum.");
  const [country, setCountry] = useState("TR");
  const [avatarUrl, setAvatarUrl] = useState(`https://ui-avatars.com/api/?name=Ilyas+Bozdemir&background=0D8ABC&color=fff`);
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoQueen, setAutoQueen] = useState(false);
  const [boardTheme, setBoardTheme] = useState("classic");
  const [pieceSet, setPieceSet] = useState("standard");

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        toast({
          title: "Fotoğraf Yüklendi",
          description: "Profil fotoğrafınız başarıyla güncellendi.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profil Güncellendi",
      description: "Profil bilgileriniz başarıyla güncellendi.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Tercihler Kaydedildi",
      description: "Oyun tercihlerin başarıyla kaydedildi.",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Ayarlar</h1>
        <p className="text-muted-foreground mt-1">Hesap ve oyun ayarlarınızı yönetin</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="game">Oyun Tercihleri</TabsTrigger>
          <TabsTrigger value="privacy">Gizlilik</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profil Bilgileri</CardTitle>
              <CardDescription>Görünen profil bilgilerinizi düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                  <Avatar className="w-32 h-32 border-4 border-border">
                    <AvatarImage src={avatarUrl || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">IB</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                    <Button variant="outline" size="default" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Fotoğraf Yükle
                      </span>
                    </Button>
                  </Label>
                  <Input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleAvatarUpload}
                  />
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG veya GIF. Maksimum 5MB.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullname">Ad Soyad</Label>
                <Input id="fullname" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Ülke</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger id="country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TR">Türkiye</SelectItem>
                    <SelectItem value="US">Amerika Birleşik Devletleri</SelectItem>
                    <SelectItem value="GB">Birleşik Krallık</SelectItem>
                    <SelectItem value="DE">Almanya</SelectItem>
                    <SelectItem value="FR">Fransa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biyografi</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} placeholder="Kendiniz hakkında birkaç cümle yazın..." />
              </div>

              <Button onClick={handleSaveProfile}>
                <Save className="w-4 h-4 mr-2" />
                Profili Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="game" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Oyun Ayarları</CardTitle>
              <CardDescription>Oyun deneyiminizi kişiselleştirin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="board-theme">Tahta Teması</Label>
                <Select value={boardTheme} onValueChange={setBoardTheme}>
                  <SelectTrigger id="board-theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Klasik</SelectItem>
                    <SelectItem value="wood">Ahşap</SelectItem>
                    <SelectItem value="marble">Mermer</SelectItem>
                    <SelectItem value="dark">Koyu</SelectItem>
                    <SelectItem value="blue">Mavi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="piece-set">Taş Seti</Label>
                <Select value={pieceSet} onValueChange={setPieceSet}>
                  <SelectTrigger id="piece-set">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standart</SelectItem>
                    <SelectItem value="alpha">Alpha</SelectItem>
                    <SelectItem value="chess7">Chess7</SelectItem>
                    <SelectItem value="companion">Companion</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ses Efektleri</Label>
                  <p className="text-sm text-muted-foreground">Hamle sesleri ve bildirimler</p>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Otomatik Vezir</Label>
                  <p className="text-sm text-muted-foreground">Piyon terfi ederken otomatik vezir yap</p>
                </div>
                <Switch checked={autoQueen} onCheckedChange={setAutoQueen} />
              </div>

              <Button onClick={handleSavePreferences}>
                <Save className="w-4 h-4 mr-2" />
                Tercihleri Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gizlilik ve Bildirimler</CardTitle>
              <CardDescription>Gizlilik ayarlarınızı yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bildirimler</Label>
                  <p className="text-sm text-muted-foreground">Oyun davetleri ve mesajlar için bildirim al</p>
                </div>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Profil Görünürlüğü</Label>
                  <p className="text-sm text-muted-foreground">Profilim herkese açık</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Oyun Geçmişi</Label>
                  <p className="text-sm text-muted-foreground">Oyun geçmişim herkese açık</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Çevrimiçi Durumu</Label>
                  <p className="text-sm text-muted-foreground">Çevrimiçi durumumun görünmesine izin ver</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button onClick={handleSavePreferences}>
                <Save className="w-4 h-4 mr-2" />
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
