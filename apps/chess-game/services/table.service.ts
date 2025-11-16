// services/table.service.ts
import { Logger } from "@/lib/utils";
import { PlayerDoc } from "@/models/player";

import {
  createTableAction,
  joinTableAction,
  listTablesAction,
} from "@/app/actions/db/table";

import { useChessStore } from "@/lib/chess-store";

const isBrowser = typeof window !== "undefined";

export class TableService {
  private logger = new Logger("ChessGame-TableService");

  constructor() {}

  /** 🧩 Masa oluşturma */
  async create(data: { name: string; ownerId: string }) {
    this.logger.info("🎯 create() çağrıldı:", data.name);

    const result = await createTableAction(data);

    this.logger.success("✅ Masa oluşturuldu:", result.id);

    if (data.ownerId) {
      await this.addPlayer(result._id, data.ownerId.toString());
    }

    // 🧠 Client tarafındaysak Zustand store’a ekle
    if (isBrowser) {
      try {
        const { tables } = useChessStore.getState();

        // önce masayı listeden çıkar
        const filtered = (tables ?? []).filter((t) => t._id !== result.id);

        // güncellenmiş masayı ekle
        useChessStore.setState({
          tables: [...filtered, result],
        });

        this.logger.info("🧩 Masa chess-store'a eklendi:", result.name);
      } catch (err) {
        this.logger.warn("⚠️ Chess store güncellemesi atlandı:", err);
      }
    }

    return result;
  }

  async delete(tableId: string, player: PlayerDoc) {
    //
  }

  /** 📄 Tüm masaları listele */
  async list() {
    this.logger.info("📄 list() çağrıldı");

    const result = await listTablesAction();

    this.logger.success(`✅ ${result.length} masa listelendi.`);

    // 🧠 Client tarafındaysak Zustand store’u güncelle
    if (isBrowser) {
      try {
        useChessStore.setState({ tables: result });
        this.logger.info("🧩 Chess-store tablolar güncellendi.");
      } catch (err) {
        this.logger.warn("⚠️ Chess store güncellemesi atlandı:", err);
      }
    }

    return result;
  }

  async getById(tableId: string) {
    // return await Table.findById(tableId);
  }

  // ---------------------------------------------------
  // 🎮 MASA İÇİ İŞLEMLER
  // ---------------------------------------------------

  /** 👤 Oyuncuyu masaya ata */
  async addPlayer(tableId: string, playerId: string) {
    this.logger.info("👤 addPlayer() çağrıldı:", {
      tableId,
      playerId,
    });

    try {
      const updatedTable = await joinTableAction(tableId, playerId);

      if (!updatedTable) {
        this.logger.warn(
          "⚠️ joinTableAction null döndü — masa bulunamadı veya eklenemedi"
        );
        return { ok: false };
      }

      this.logger.success("🧩 Oyuncu masaya başarıyla eklendi:", {
        tableId,
        playerId,
        players: updatedTable.players,
      });

      return {
        ok: true,
        table: updatedTable,
      };
    } catch (error: any) {
      this.logger.error("❌ addPlayer hata:", {
        message: error.message,
        stack: error.stack,
      });

      return { ok: false, error: error.message };
    }
  }

  /** 🗑️ Masa sil */
  async deleteTable(tableId: string, requesterId: string) {
    // kontrol: sadece kurucu silebilir
  }

  /** 🚪 Oyuncuyu masadan çıkar */
  async removePlayer(tableId: string, playerId: string) {
    // tablo.players = tablo.players.filter(p => p !== playerId)
  }

  /** 🟢 Oyuncuyu "hazır" olarak işaretle */
  async setReady(tableId: string, playerId: string, ready: boolean) {
    // tablo.readiness[playerId] = ready
  }

  /** 🕹️ Masa dolduysa oyunu başlat */
  async startGame(tableId: string) {
    // kontrol: tüm oyuncular hazır mı?
  }

  /** 🔄 Masa durumunu değiştir (waiting / playing / finished) */
  async setStatus(tableId: string, status: "waiting" | "playing" | "finished") {
    // tablo.status = status
  }

  // ---------------------------------------------------
  // 🔔 Realtime / event helper’lar (sonraki aşama)
  // ---------------------------------------------------

  /** 📡 Masa güncellemesini yayınla */
  async broadcastUpdate(tableId: string, event: string, payload: any) {
    // phoenix / socket.emit logic burada
  }

  /** 🧠 Masa logları (örnek: history veya replay için) */
  async logEvent(tableId: string, message: string) {
    // tablo.logs.push({ message, date: new Date() })
  }
}
