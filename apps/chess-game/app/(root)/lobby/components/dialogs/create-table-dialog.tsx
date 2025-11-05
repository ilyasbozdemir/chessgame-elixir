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
import { Plus } from "lucide-react";

import { useChessStore } from "@/lib/chess-store";
import { usePlayer } from "@/context/player-context";

interface CreateTableDialogProps {
  //
}

export function CreateTableDialog({}: CreateTableDialogProps) {
  const { player, channel, setPlayer, loading, refresh } = usePlayer();

  const [newTableName, setNewTableName] = useState("");

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const createTable = useChessStore((s) => s.createTable);

  const handleCreateTable = async () => {
    if (!player?._id) {
      console.warn("Oyuncunun _id değeri yok, tablo oluşturulamadı.");
      return;
    }
    if (newTableName.trim() && player) {
      console.log("🧩 Masa oluşturma başlatıldı:", {
        tableName: newTableName,
        player,
      });
      try {
        const tableId = await createTable(newTableName.trim(), player, channel);
        console.log("✅ createTable dönen ID:", tableId);
        if (tableId) {
          console.log("🎮 Oyuncu masaya katıldı:", { tableId, player });
          setNewTableName("");
        } else {
          console.warn("⚠️ createTable bir ID döndürmedi!");
        }
      } catch (error: any) {
        console.error("❌ Masa oluşturma hatası:", {
          message: error.message || error,
          stack: error.stack,
        });
      }
    } else {
      console.warn("🚫 Eksik bilgi:", { newTableName, player });
    }
  };

  return (
    <>
      {player ? (
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Yeni Masa
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Masa Oluştur</DialogTitle>
              <DialogDescription>
                Oyun masanızın detaylarını belirleyin
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="table-name">Masa Adı</Label>
                <Input
                  id="table-name"
                  placeholder="Örn: Hızlı Oyun"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                />
              </div>

              <Button
                onClick={handleCreateTable}
                className="w-full"
                disabled={!newTableName.trim()}
              >
                Masa Oluştur
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}
