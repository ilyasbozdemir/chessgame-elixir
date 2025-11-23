import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  History,
  Settings,
  Users,
  RotateCcw,
  Volume2,
  Bell,
  User,
  Clock,
  Crown,
} from "lucide-react";

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
  currentPlayer: {
    name: string;
    avatar?: string;
    rating?: number;
    capturedPieces: string[];
    timeLeft?: number;
  };
  opponent: {
    name: string;
    avatar?: string;
    rating?: number;
    capturedPieces: string[];
    timeLeft?: number;
  };
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
  currentPlayer,
  opponent,
}: GameMenuDrawerProps) {
  const formatTime = (seconds?: number) => {
    if (seconds === undefined) return "-:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderPlayerDetails = (player: typeof currentPlayer, label: string) => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={player.avatar} alt={player.name} />
          <AvatarFallback>
            <User className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h4 className="font-semibold text-lg">{player.name}</h4>
          {player.rating && (
            <Badge variant="secondary" className="mt-1">
              Rating: {player.rating}
            </Badge>
          )}
        </div>
        {player.timeLeft !== undefined && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted font-mono text-lg font-semibold">
            <Clock className="w-4 h-4" />
            {formatTime(player.timeLeft)}
          </div>
        )}
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Alınan Taşlar</p>
        <div className="flex flex-wrap gap-1 p-3 rounded-lg bg-muted/50 min-h-[60px]">
          {player.capturedPieces.length > 0 ? (
            player.capturedPieces.map((piece, i) => (
              <span key={i} className="text-3xl">
                {piece}
              </span>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              Henüz alınan taş yok
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-auto py-2 hover:bg-accent/50 transition-colors"
        >
          <Menu className="h-5 w-5" />
          <span className="text-xs">Menü</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Oyun Menüsü</DrawerTitle>
          <DrawerDescription>
            Hamle geçmişi, ayarlar ve oyuncu bilgileri
          </DrawerDescription>
        </DrawerHeader>

        <Tabs defaultValue="history" className="flex-1">
          <TabsList className="grid w-full grid-cols-3 mx-4">
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              Hamleler
            </TabsTrigger>
            <TabsTrigger value="players" className="gap-2">
              <Users className="h-4 w-4" />
              Oyuncular
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Ayarlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="px-4 mt-4">
            <ScrollArea className="h-[400px] pr-4">
              {moveHistory.length > 0 ? (
                <div className="space-y-2">
                  {moveHistory.map((move, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Badge variant="outline" className="font-mono">
                        {Math.floor(index / 2) + 1}
                      </Badge>
                      <span className="font-medium">
                        {move.piece.type} {move.from.row},{move.from.col} →{" "}
                        {move.to.row},{move.to.col}
                      </span>
                      {move.captured && (
                        <span className="text-lg ml-auto">
                          {move.captured.type}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Henüz hamle yapılmadı</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="players" className="px-4 mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Rakip
                  </h3>
                  {renderPlayerDetails(opponent, "Rakip")}
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Sen
                  </h3>
                  {renderPlayerDetails(currentPlayer, "Sen")}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="settings" className="px-4 mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-3 flex-1">
                    <RotateCcw className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Tahtayı Döndür</p>
                      <p className="text-sm text-muted-foreground">
                        Oyun tahtasını 180 derece döndür
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={boardRotated}
                    onCheckedChange={onToggleBoardRotation}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-3 flex-1">
                    <Volume2 className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Ses Efektleri</p>
                      <p className="text-sm text-muted-foreground">
                        Hamle ve olaylar için ses çal
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={onToggleSound}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-3 flex-1">
                    <Bell className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Bildirimler</p>
                      <p className="text-sm text-muted-foreground">
                        Önemli olaylar için bildirim al
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={onToggleNotifications}
                  />
                </div>
              </div>
            </ScrollArea>
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
