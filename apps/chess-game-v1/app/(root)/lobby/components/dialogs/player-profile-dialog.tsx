"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UserCircle,
  Settings,
  BarChart3,
  Trophy,
  PlayCircle,
  Users,
} from "lucide-react";

import { Logger } from "@/lib/utils";
import { useUser } from "@/context/user-context";

interface PlayerProfileDialogProps {
  //
}

export function PlayerProfileDialog({}: PlayerProfileDialogProps) {
  const {
    user,
    playerUser,
    loading: userLoading,
    refresh,
    login,
    logout,
  } = useUser();

  const [playerName, setPlayerName] = useState("");

  const [profileSection, setProfileSection] = useState<
    "main" | "edit" | "settings" | "stats"
  >("main");
  const [editName, setEditName] = useState(user?.displayName ?? "");

  //const addPlayer = useChessStore((s) => s.addPlayer);

  const handleSetPlayerName = async () => {
    const logger = new Logger("ChessGame-LOBBY");

    logger.group("👤 [Player Setup]");
    logger.info("🟢 handleSetPlayerName çağrıldı.");

    //await addPlayer(playerName);
    setPlayerName("");
    logger.success("✅ Oyuncu eklendi:", playerName);

    await refresh();
    logger.info("🌐 refresh() tamamlandı.");
    logger.groupEnd();
  };

  return (
    <>
      {playerUser ? (
        <Dialog onOpenChange={(open) => !open && setProfileSection("main")}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors cursor-pointer">
              <UserCircle className="w-5 h-5 text-accent-foreground" />
              <span className="font-medium text-accent-foreground">
                {user?.displayName}
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {profileSection === "main" && "Oyuncu Profili"}
                {profileSection === "edit" && "Profili Düzenle"}
                {profileSection === "settings" && "Oyun Ayarları"}
                {profileSection === "stats" && "İstatistikler"}
              </DialogTitle>
              <DialogDescription>
                {profileSection === "main" && "Hesap ayarlarınızı yönetin"}
                {profileSection === "edit" &&
                  "Profil bilgilerinizi güncelleyin"}
                {profileSection === "settings" &&
                  "Oyun tercihlerinizi ayarlayın"}
                {profileSection === "stats" &&
                  "Oyun performansınızı görüntüleyin"}
              </DialogDescription>
            </DialogHeader>

            {profileSection === "main" && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <UserCircle className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-foreground">
                      {user?.displayName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Oyuncu ID: {playerUser?._id?.toString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => {
                      setEditName(user?.displayName || "");
                      setProfileSection("edit");
                    }}
                  >
                    <UserCircle className="w-4 h-4 mr-2" />
                    Profili Düzenle
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setProfileSection("settings")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Oyun Ayarları
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setProfileSection("stats")}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    İstatistikler
                  </Button>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={async () => {
                      setProfileSection("main");
                      const res = await fetch("/api/logout", {
                        method: "POST",
                      });
                      if (res.ok) {
                        console.log("✅ Oyuncu çıkış yaptı");
                      }
                      await refresh();
                    }}
                  >
                    Çıkış Yap
                  </Button>
                </div>
              </div>
            )}

            {profileSection === "edit" && (
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Oyuncu İsmi</Label>
                  <Input
                    id="edit-name"
                    placeholder="Yeni isminiz"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setProfileSection("main")}
                  >
                    İptal
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={!editName.trim()}
                    onClick={() => {
                      setProfileSection("main");
                    }}
                  >
                    Kaydet
                  </Button>
                </div>
              </div>
            )}

            {profileSection === "settings" && (
              <div className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                    <div>
                      <p className="font-medium text-foreground">
                        Ses Efektleri
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Oyun seslerini aç/kapat
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Açık
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                    <div>
                      <p className="font-medium text-foreground">Bildirimler</p>
                      <p className="text-xs text-muted-foreground">
                        Masa bildirimleri
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Açık
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                    <div>
                      <p className="font-medium text-foreground">
                        Otomatik Katılım
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Boş masalara otomatik katıl
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Kapalı
                    </Button>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setProfileSection("main")}
                >
                  Geri Dön
                </Button>
              </div>
            )}

            {profileSection === "stats" && (
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-lg bg-accent/50 text-center">
                    <Trophy className="w-6 h-6 text-chart-2 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">24</p>
                    <p className="text-xs text-muted-foreground">
                      Kazanılan Oyun
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/50 text-center">
                    <PlayCircle className="w-6 h-6 text-chart-1 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">42</p>
                    <p className="text-xs text-muted-foreground">Toplam Oyun</p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/50 text-center">
                    <BarChart3 className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">57%</p>
                    <p className="text-xs text-muted-foreground">
                      Kazanma Oranı
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/50 text-center">
                    <Users className="w-6 h-6 text-chart-3 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">156</p>
                    <p className="text-xs text-muted-foreground">
                      Toplam Hamle
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm font-medium text-foreground mb-1">
                    En İyi Seri
                  </p>
                  <p className="text-2xl font-bold text-primary">7 Galibiyet</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setProfileSection("main")}
                >
                  Geri Dön
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <UserCircle className="w-4 h-4 mr-2" />
              İsim Belirle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Oyuncu İsmi</DialogTitle>
              <DialogDescription>
                Lobide görünecek isminizi girin
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="player-name">İsim</Label>
                <Input
                  id="player-name"
                  placeholder="Oyuncu isminiz"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                />
              </div>
              <Button
                onClick={handleSetPlayerName}
                className="w-full"
                disabled={!playerName.trim()}
              >
                Kaydet
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
