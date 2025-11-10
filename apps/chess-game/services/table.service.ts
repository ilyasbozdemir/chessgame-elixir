// services/table.service.ts
import { Logger } from "@/lib/utils";
import { PlayerDoc } from "@/models/player";
import type { TableDoc } from "@/models/table";
export class TableService {
  private socketChannel?: any;
  private logger = new Logger("ChessGame-TableService");

  constructor(channel?: any) {
    this.socketChannel = channel;
  }

  /** 🧩 Masa oluşturma */
  async create(name: string, owner: PlayerDoc) {
    this.logger.group(`[ChessGame-TableService] create()`);

    const data = {
      id: Math.random().toString(36).substring(2, 9),
      name: name,
      ownerId: owner._id?.toString(),
      ownerName: owner.userId.toString(),
      maxPlayers: 2,
    };

    this.logger.info("🌐 create() çağrıldı:", data);

    const res = await fetch("/api/table", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.text();
      this.logger.error("❌ /api/table hatası:", err);
      this.logger.groupEnd();
      throw new Error(`Masa oluşturulamadı: ${err}`);
    }

    const table = await res.json();
    this.logger.success("✅ /api/table yanıtı:", table);
    this.logger.groupEnd();

    return table;
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
