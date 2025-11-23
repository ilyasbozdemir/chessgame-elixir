import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, Flag, Handshake, Trophy, History, Settings } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ChessPiece, PieceType, Position } from "@/game/chess-types";


export interface Move {
  from: Position;
  to: Position;
  piece: ChessPiece;
  captured?: ChessPiece;
  notation: string;
  isCastling?: boolean;
  isPromotion?: boolean;
  promotedTo?: PieceType;
}


type GameMenuDrawerProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  moveHistory: Move[];
  boardRotated: boolean;
  onToggleBoardRotation: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  onNewGame?: () => void;
};

export function GameMenuDrawer({
  open,
  onOpenChange,
  moveHistory,
  boardRotated,
  onToggleBoardRotation,
  soundEnabled,
  onToggleSound,
  notificationsEnabled,
  onToggleNotifications,
  onNewGame,
}: GameMenuDrawerProps) {
  const { toast } = useToast();

  const handleResign = () => {
    toast({
      title: "Pes Edildi",
      description: "Oyunu kaybettiniz.",
      variant: "destructive",
    });
    onOpenChange?.(false);
  };

  const handleOfferDraw = () => {
    toast({
      title: "Beraberlik Teklifi",
      description: "Rakibinize beraberlik teklif edildi.",
    });
  };

  const handleNewGame = () => {
    onNewGame?.();
    onOpenChange?.(false);
    toast({
      title: "Yeni Oyun",
      description: "Yeni bir oyun başlatıldı.",
    });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="flex-col h-auto py-2 px-3 rounded-xl transition-all hover:bg-primary/10"
        >
          <Menu className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Menü</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Oyun Menüsü</DrawerTitle>
        </DrawerHeader>

        <Tabs defaultValue="history" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4">
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              Geçmiş
            </TabsTrigger>
            <TabsTrigger value="game" className="gap-2">
              <Trophy className="h-4 w-4" />
              Oyun
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Ayarlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="flex-1 mt-0">
            <ScrollArea className="h-[400px] px-4">
              {moveHistory.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Henüz hamle yapılmadı</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {moveHistory.map((move, index) => {
                    const moveNumber = Math.floor(index / 2) + 1;
                    const isWhiteMove = index % 2 === 0;

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <Badge variant="outline" className="font-mono">
                          {moveNumber}{isWhiteMove ? '.' : '...'}
                        </Badge>
                        <span className="font-semibold text-lg">{move.notation}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="game" className="flex-1 mt-0">
            <div className="px-4 py-6 space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">Oyun Aksiyonları</h3>
                
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-14"
                  onClick={handleOfferDraw}
                >
                  <Handshake className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-semibold">Beraberlik Teklif Et</p>
                    <p className="text-xs text-muted-foreground">Rakibinize beraberlik teklifi gönderin</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-14 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleResign}
                >
                  <Flag className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-semibold">Pes Et</p>
                    <p className="text-xs text-muted-foreground">Oyunu teslim edin</p>
                  </div>
                </Button>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">Yeni Oyun</h3>
                
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-14"
                  onClick={handleNewGame}
                >
                  <Trophy className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-semibold">Yeni Oyun Başlat</p>
                    <p className="text-xs text-muted-foreground">Tahtayı sıfırlayıp yeniden başlayın</p>
                  </div>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="flex-1 mt-0">
            <div className="px-4 py-6 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex-1">
                  <p className="font-medium">Tahtayı Döndür</p>
                  <p className="text-sm text-muted-foreground">Oyun tahtasını 180° döndür</p>
                </div>
                <Switch
                  checked={boardRotated}
                  onCheckedChange={onToggleBoardRotation}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex-1">
                  <p className="font-medium">Ses Efektleri</p>
                  <p className="text-sm text-muted-foreground">Hamle ve olaylar için ses çal</p>
                </div>
                <Switch
                  checked={soundEnabled}
                  onCheckedChange={onToggleSound}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex-1">
                  <p className="font-medium">Bildirimler</p>
                  <p className="text-sm text-muted-foreground">Önemli olaylar için bildirim al</p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={onToggleNotifications}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Kapat</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
