"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

import { TableService } from "@/services/table.service";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";

interface CreateTableDialogProps {
  //
}

export function CreateTableDialog({}: CreateTableDialogProps) {
  const { user, playerUser, loading: userLoading, login, logout } = useUser();

  const router = useRouter();

  const tableService = new TableService();

  const [newTableName, setNewTableName] = useState("");

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateTable = async () => {
    if (!playerUser?._id) {
      console.warn("Oyuncunun _id değeri yok, tablo oluşturulamadı.");
      return;
    }
    if (!user || !user._id) {
      console.warn("User veya user._id yok, masa oluşturulamadı.");
      return;
    }

    if (newTableName.trim() && playerUser && user) {
      try {
        const createdTable = await tableService.create({
          name: newTableName,
          ownerId: user?._id.toString(),
        });

        console.log("✅ createTable dönen ID:", createdTable);
        if (createdTable) {
          console.log("🎮 Oyuncu masaya katıldı:", {
            createdTable,
            playerUser,
          });
          setNewTableName("");
          setIsCreateDialogOpen(false);
          router.push(`/tables/${createdTable._id}`);
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
      console.warn("🚫 Eksik bilgi:", { newTableName, playerUser });
    }
  };

  return (
    <>
      {user ? (
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
