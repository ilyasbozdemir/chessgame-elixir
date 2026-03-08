"use client";

import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useGame } from "@/context/game-context";

export function GameControls2() {
  const { pushResign } = useGame();
  const [showResignDialog, setShowResignDialog] = useState(false);

  const handleResign = () => {
    setShowResignDialog(false);
    pushResign(); // servera "pes et" eventini gönder
  };

  return (
    <div className="flex justify-center gap-2 my-3">
      <Button
        variant="outline"
        size="lg"
        className="gap-2 text-destructive hover:text-destructive"
        onClick={() => setShowResignDialog(true)}
      >
        <Flag className="h-5 w-5" />
        Pes Et
      </Button>

      <Dialog open={showResignDialog} onOpenChange={setShowResignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pes Etmek İstediğinize Emin Misiniz?</DialogTitle>
            <DialogDescription>
              Bu oyunu kaybetmiş sayılacaksınız ve ELO puanınız düşebilir. Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResignDialog(false)}>
              İptal
            </Button>
            <Button variant="destructive" onClick={handleResign}>
              Evet, Pes Et
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
