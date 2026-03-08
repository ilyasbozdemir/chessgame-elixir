"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useChessStore } from "@/stores/chess-store";
import { TableDoc } from "@/models/table";
import { Trash2 } from "lucide-react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/context/user-context";
import { TableService } from "@/services/table.service";

interface DeleteTableDialogProps {
  table: TableDoc;
}

export function DeleteTableDialog({ table }: DeleteTableDialogProps) {
  const { user, playerUser } = useUser();

  const tableService = new TableService();

  const handleDeleteTable = async (tableId: string) => {
    if (!playerUser?.userId) {
      console.warn("Oyuncunun userId değeri yok, tablo silinemedi.");
      return;
    }

    if (!user || !user._id) {
      console.warn("User veya user._id yok, tablo silinemedi.");
      return;
    }

    try {
      const result = await tableService.deleteTable(
        tableId,
        playerUser?.userId.toString()
      );

      if (result?.ok) {
        console.log("✅ Masa silindi:", tableId);
      } else {
        console.warn("⚠️ Masa silinemedi, sonuç:", result);
      }
    } catch (error: any) {
      console.error("❌ Masa silme hatası:", {
        message: error.message || error,
        stack: error.stack,
      });
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
            Silinecek masa: <strong>{table ? table["name"] : ""}</strong>
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">İptal</Button>
          </DialogClose>

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
