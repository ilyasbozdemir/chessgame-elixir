import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RotateCcw, Volume2, Bell } from "lucide-react";

type SettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boardRotated: boolean;
  onToggleBoardRotation: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
};

export function SettingsDialog({
  open,
  onOpenChange,
  boardRotated,
  onToggleBoardRotation,
  soundEnabled,
  onToggleSound,
  notificationsEnabled,
  onToggleNotifications,
}: SettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Oyun Ayarları</DialogTitle>
          <DialogDescription>
            Oyun deneyiminizi kişiselleştirin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Board Rotation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label htmlFor="board-rotation" className="text-base">
                  Tahtayı Döndür
                </Label>
                <p className="text-xs text-muted-foreground">
                  Siyah taraftan oyna
                </p>
              </div>
            </div>
            <Switch
              id="board-rotation"
              checked={boardRotated}
              onCheckedChange={onToggleBoardRotation}
            />
          </div>

          {/* Sound Effects */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label htmlFor="sound" className="text-base">
                  Ses Efektleri
                </Label>
                <p className="text-xs text-muted-foreground">
                  Hamle sesleri
                </p>
              </div>
            </div>
            <Switch
              id="sound"
              checked={soundEnabled}
              onCheckedChange={onToggleSound}
            />
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label htmlFor="notifications" className="text-base">
                  Bildirimler
                </Label>
                <p className="text-xs text-muted-foreground">
                  Sıra bildirimleri
                </p>
              </div>
            </div>
            <Switch
              id="notifications"
              checked={notificationsEnabled}
              onCheckedChange={onToggleNotifications}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Tamam</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
