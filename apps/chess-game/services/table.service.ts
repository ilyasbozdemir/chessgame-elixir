// services/table.service.ts
import { Logger } from "@/lib/utils";
import { PlayerDoc } from "@/models/player";
import type { TableDoc } from "@/models/table";

import { createTableAction } from "@/app/actions/db/table";
import { useChessStore } from "@/lib/chess-store";

const isBrowser = typeof window !== "undefined";

export class TableService {
  private socketChannel?: any;
  private logger = new Logger("ChessGame-TableService");

  constructor(channel?: any) {
    this.socketChannel = channel;
  }

  /** 🧩 Masa oluşturma */
  async create(data: {
    name: string;
    ownerId?: string;
  }) {
    this.logger.info("🎯 create() çağrıldı:", data.name);

    const result = await createTableAction(data);

    this.logger.success("✅ Masa oluşturuldu:", result.id);

    // 🧠 Client tarafındaysak Zustand store’a ekle
    if (isBrowser) {
      try {
        const { tables } = useChessStore.getState();
        useChessStore.setState({
          tables: [...(tables ?? []), result],
        });
        this.logger.info("🧩 Masa chess-store'a eklendi:", result.name);
      } catch (err) {
        this.logger.warn("⚠️ Chess store güncellemesi atlandı:", err);
      }
    }

    this.socketChannel?.push("table:created", result);

    return result;
  }

  async delete(tableId: string, player: PlayerDoc) {
    this.logger.group(`[ChessGame-TableService] delete(${tableId})`);
    this.logger.info("🌐 delete() çağrıldı:", {
      tableId,
      playerId: player._id,
    });
    const res = await fetch(`/api/table/${tableId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId: player._id?.toString() }),
    });
    if (!res.ok) {
      const err = await res.text();
      this.logger.error("❌ /api/table/[id] hatası:", err);
      this.logger.groupEnd();
      throw new Error(`Masa silinemedi: ${err}`);
    }
    const result = await res.json();
    this.logger.success("✅ /api/table/[id] yanıtı:", result);
    this.logger.groupEnd();
    return result;
  }

  /** 📄 Tüm masaları listele */
  static async list() {
    // return await Table.find();
  }

  static async getById(tableId: string) {
    // return await Table.findById(tableId);
  }

  /** 🗑️ Masa sil */
  static async delete(tableId: string, requesterId: string) {
    // kontrol: sadece kurucu silebilir
  }

  // ---------------------------------------------------
  // 🎮 MASA İÇİ İŞLEMLER
  // ---------------------------------------------------

  /** 👤 Oyuncuyu masaya ata */
  static async addPlayer(tableId: string, playerId: string) {
    // tablo.players.push(playerId)
  }

  /** 🚪 Oyuncuyu masadan çıkar */
  static async removePlayer(tableId: string, playerId: string) {
    // tablo.players = tablo.players.filter(p => p !== playerId)
  }

  /** 🟢 Oyuncuyu "hazır" olarak işaretle */
  static async setReady(tableId: string, playerId: string, ready: boolean) {
    // tablo.readiness[playerId] = ready
  }

  /** 🕹️ Masa dolduysa oyunu başlat */
  static async startGame(tableId: string) {
    // kontrol: tüm oyuncular hazır mı?
  }

  /** 🔄 Masa durumunu değiştir (waiting / playing / finished) */
  static async setStatus(
    tableId: string,
    status: "waiting" | "playing" | "finished"
  ) {
    // tablo.status = status
  }

  // ---------------------------------------------------
  // 🔔 Realtime / event helper’lar (sonraki aşama)
  // ---------------------------------------------------

  /** 📡 Masa güncellemesini yayınla */
  static async broadcastUpdate(tableId: string, event: string, payload: any) {
    // phoenix / socket.emit logic burada
  }

  /** 🧠 Masa logları (örnek: history veya replay için) */
  static async logEvent(tableId: string, message: string) {
    // tablo.logs.push({ message, date: new Date() })
  }
}
