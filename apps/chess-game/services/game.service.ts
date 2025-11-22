// services/game.service.ts
import { createGameAction } from "@/app/actions/db/game";
import { Logger } from "@/lib/utils";

export class GameService {
  private logger = new Logger("ChessGame-GameService");

  constructor() {}

  // ---------------------------------------------------
  // 🎮 GAME CRUD (DB)
  // ---------------------------------------------------

  /** 🆕 Oyun oluştur */
  async create(data: { tableId?: string; mode?: string }) {
    const result = await createGameAction(data.tableId!, data.mode || "10+0");
  }

  /** 📄 Tüm oyunları listele */
  async list() {
    // return all games
  }

  /** 📘 Tek oyun detayı */
  async getById(gameId: string) {
    // return game detail
  }

  /** ✏️ Oyunu güncelle */
  async update(gameId: string, updateData: any) {
    // update game
  }

  /** 🗑️ Oyunu sil */
  async delete(gameId: string) {
    // delete game
  }

  // ---------------------------------------------------
  // 🎮 GAME OPERATIONS
  // ---------------------------------------------------

  /** 👤 Oyuncuyu oyuna ekle */
  async addPlayer(gameId: string, playerId: string) {
    // add player into game.players
  }

  /** 🚪 Oyuncuyu çıkar */
  async removePlayer(gameId: string, playerId: string) {
    // remove from game.players
  }

  /** 🟢 Oyuncuyu hazır olarak işaretle */
  async setReady(gameId: string, playerId: string, ready: boolean) {
    // mark player ready/not ready
  }

  /** ♟️ Renk ata */
  async assignColor(
    gameId: string,
    playerId: string,
    color: "white" | "black"
  ) {
    // set color
  }

  /** 🧭 Oyunun durumunu değiştir */
  async setStatus(gameId: string, status: "waiting" | "playing" | "finished") {
    // update game.status
  }

  /** 🕹️ Oyunu başlat */
  async start(gameId: string) {
    // set status to "playing"
  }

  /** 🔄 Oyunu sıfırla */
  async reset(gameId: string) {
    // reset board, players, readiness etc
  }

  /** ➡️ Hamle gönder */
  async move(gameId: string, moveData: any) {
    // push move event
  }

  // ---------------------------------------------------
  // 🔔 REALTIME HELPERS
  // ---------------------------------------------------

  /** 📡 Oyun güncellemesi yayınla */
  async broadcastUpdate(gameId: string, event: string, payload: any) {
    // emit socket event
  }

  /** 🧠 Replay için log yaz */
  async logEvent(gameId: string, message: string) {
    // insert to logs
  }
}
