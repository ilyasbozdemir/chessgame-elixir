// services/table.service.ts
import { Logger } from "@/lib/utils";
import { PlayerDoc } from "@/models/player";

import { createTableAction, listTablesAction } from "@/app/actions/db/table";

import { useChessStore } from "@/lib/chess-store";

const isBrowser = typeof window !== "undefined";

export class TableService {
  private logger = new Logger("ChessGame-TableService");

  constructor() {}

  /** 🧩 Masa oluşturma */
  async create(data: { name: string; ownerId?: string }) {
    
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
    // tablo.players.push(playerId)
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
