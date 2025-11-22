// services/game.service.ts
import {
  createGameAction,
  getAllGamesAction,
  getGameByIdAction,
} from "@/app/actions/db/game";
import { Logger } from "@/lib/utils";
import { useChessStore } from "@/stores/chess-store";
import { table } from "console";

const isBrowser = typeof window !== "undefined";

export class GameService {
  private logger = new Logger("ChessGame-GameService");

  constructor() {}

  // ---------------------------------------------------
  // 🎮 GAME CRUD (DB)
  // ---------------------------------------------------

  /** 🆕 Oyun oluştur */
  async createGame(tableId: string, mode?: string) {
    if (!tableId) {
      return {
        ok: false,
        error: "TableId boş",
        gameId: undefined,
        game: undefined,
      };
    }

    try {
      const result = await createGameAction(tableId, mode || "10+0");

      if (isBrowser && result?.ok) {
        const { tables } = useChessStore.getState();
        useChessStore.setState({
          tables: tables.map((t) =>
            t._id?.toString() === tableId ? { ...t, gameId: result.gameId } : t
          ),
        });
      }

      return (
        result ?? {
          ok: false,
          error: "Server action returned undefined",
          gameId: undefined,
          game: undefined,
        }
      );
    } catch (err: any) {
      return {
        ok: false,
        error: err.message || "Bilinmeyen hata",
        gameId: undefined,
        game: undefined,
      };
    }
  }

  /** 🆕 Oyunu başlat */

  async startGame(gameId: string) {
    //
  }

  /** 📄 Tüm oyunları listele */
  async list() {
    try {
      const result = await getAllGamesAction();

      if (isBrowser && result?.ok) {
        //
      }

      return result;
    } catch (err: any) {
      this.logger.error("❌ list() hata:", err.message);
      return { ok: false, error: err.message, games: [] };
    }
  }

  /** 📘 Tek oyun detayı */
  async getById(gameId: string) {
    try {
      return await getGameByIdAction(gameId);
    } catch (err) {
      this.logger.error("getByIdAction hata:", err);
      return null;
    }
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
