"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useChessStore } from "@/lib/chess-store";
import { usePlayer } from "@/context/player-context";
import { TableDoc } from "@/models/table";
import { Trash2 } from "lucide-react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DeleteTableDialogProps {
  table: TableDoc;
}

export function DeleteTableDialog({ table }: DeleteTableDialogProps) {
  const { player, channel, setPlayer, loading, refresh } = usePlayer();

  const currentTable = useChessStore((s) => s.currentTable);
  const deleteTable = useChessStore((s) => s.deleteTable);

  const handleDeleteTable = async (tableId: string) => {
    //if (!currentPlayer) return;

    try {
      await deleteTable(tableId, channel);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="top">Masayı Sil</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Masa Silinsin mi?</DialogTitle>
          <DialogDescription>
            Bu işlem geri alınamaz. Masadaki tüm oyuncular masadan çıkarılacak.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <p className="text-sm text-muted-foreground">
            Silinecek masa:{" "}
            <strong>{currentTable ? currentTable["name"] : ""}</strong>
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline">İptal</Button>

          <Button
            variant="destructive"
            onClick={() => handleDeleteTable(table._id?.toString() ?? "")}
          >
            Evet, Sil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
