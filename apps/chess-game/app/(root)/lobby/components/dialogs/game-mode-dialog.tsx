"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Zap, Gamepad2 } from "lucide-react"
import { TableService } from "@/services/table.service"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import { useChessStore } from "@/stores/chess-store"

type GameMode = "custom" | "online-match" | null

type GameModeDialogProps = {}

export function GameModeDialog({}: GameModeDialogProps) {
  const { user, playerUser } = useUser()
  const router = useRouter()
  const tableService = new TableService()
  const tables = useChessStore((s) => s.tables)

  const [isOpen, setIsOpen] = useState(false)
  const [gameMode, setGameMode] = useState<GameMode>(null)
  const [tableName, setTableName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleOnlineMatch = async () => {
    if (!playerUser?._id || !user?._id) {
      console.warn("Oyuncu bilgileri eksik")
      return
    }

    setIsLoading(true)
    try {
      // Boş olan masaları bul
      const waitingTables = tables.filter((t) => t.status === "waiting" && t.players?.length === 1)

      if (waitingTables.length > 0) {
        // Rastgele bir masaya katıl
        const matchedTable = waitingTables[0]
        const joined = await tableService.addPlayer(matchedTable._id?.toString() || "", user._id.toString())

        if (joined.ok) {
          console.log("🎯 Eşleştirme başarılı:", matchedTable.name)
          setIsOpen(false)
          setGameMode(null)
          router.push(`/tables/${matchedTable._id}`)
        }
      } else {
        // Eğer boş masa yoksa yeni masa oluştur ve beklemeye al
        const newTable = await tableService.create({
          name: "Çevrimiçi Eşleştirme Bekleniyor",
          ownerId: user._id.toString(),
        })

        if (newTable) {
          console.log("⏳ Yeni eşleştirme masası oluşturuldu")
          setIsOpen(false)
          setGameMode(null)
          router.push(`/tables/${newTable._id}`)
        }
      }
    } catch (error) {
      console.error("❌ Eşleştirme hatası:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCustomGame = async () => {
    if (!playerUser?._id || !user?._id) {
      console.warn("Oyuncu bilgileri eksik")
      return
    }

    if (!tableName.trim()) {
      console.warn("Masa adı gerekli")
      return
    }

    setIsLoading(true)
    try {
      const newTable = await tableService.create({
        name: tableName,
        ownerId: user._id.toString(),
      })

      if (newTable) {
        console.log("🎮 Özel masa oluşturuldu:", tableName)
        setIsOpen(false)
        setGameMode(null)
        setTableName("")
        router.push(`/tables/${newTable._id}`)
      }
    } catch (error) {
      console.error("❌ Masa oluşturma hatası:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Yeni Oyun
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Oyun Modu Seç</DialogTitle>
          <DialogDescription>
            {gameMode === null
              ? "Nasıl oynamak istersin?"
              : gameMode === "custom"
                ? "Özel masa ayrıntılarını gir"
                : "Çevrimiçi rakip bul"}
          </DialogDescription>
        </DialogHeader>

        {gameMode === null && (
          <div className="space-y-3 pt-4">
            <Button
              onClick={() => setGameMode("custom")}
              variant="outline"
              className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2"
            >
              <Gamepad2 className="w-6 h-6" />
              <div className="text-center">
                <p className="font-semibold">Özel Masa</p>
                <p className="text-xs text-muted-foreground">Arkadaşını davet et</p>
              </div>
            </Button>

            <Button
              onClick={() => setGameMode("online-match")}
              variant="outline"
              className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2"
              disabled={isLoading}
            >
              <Zap className="w-6 h-6" />
              <div className="text-center">
                <p className="font-semibold">Çevrimiçi Eşleştirme</p>
                <p className="text-xs text-muted-foreground">Otomatik rakip bul</p>
              </div>
            </Button>
          </div>
        )}

        {gameMode === "custom" && (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="table-name">Masa Adı</Label>
              <Input
                id="table-name"
                placeholder="Örn: Hızlı Oyun"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={() => setGameMode(null)} variant="outline" className="flex-1" disabled={isLoading}>
                Geri
              </Button>
              <Button onClick={handleCustomGame} className="flex-1" disabled={!tableName.trim() || isLoading}>
                {isLoading ? "Oluşturuluyor..." : "Masa Oluştur"}
              </Button>
            </div>
          </div>
        )}

        {gameMode === "online-match" && (
          <div className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">Çevrimiçi bir rakip bulmak için lütfen bekle...</p>

            <Button onClick={handleOnlineMatch} className="w-full" disabled={isLoading}>
              {isLoading ? "Eşleştiriliyor..." : "Eşleştirmeyi Başlat"}
            </Button>

            <Button onClick={() => setGameMode(null)} variant="outline" className="w-full" disabled={isLoading}>
              İptal
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
