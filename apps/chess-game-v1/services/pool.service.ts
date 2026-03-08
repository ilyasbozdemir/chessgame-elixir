// services/pool.service.ts
import { Logger } from "@/lib/utils";

export class PoolService {
  private logger = new Logger("ChessGame-PoolService");

  // 🟢 Pool memory, Elixir / Phoenix process mantığında
  private pool: Record<string, { playerId: string; name: string; joinedAt: number }[]> = {
    blitz: [],
    bullet: [],
  };

  /** 👤 Oyuncuyu pool’a ekle */
  async addPlayer(playerId: string, name: string, mode: string = "blitz") {
    this.pool[mode] = this.pool[mode] || [];
    this.pool[mode].push({ playerId, name, joinedAt: Date.now() });
    return { ok: true };
  }

  /** 🚪 Oyuncuyu pool’dan çıkar */
  async removePlayer(playerId: string, mode: string = "blitz") {
    this.pool[mode] = this.pool[mode].filter(p => p.playerId !== playerId);
    return { ok: true };
  }

  /** 🔎 Eşleşebilecek oyuncuları al */
  async matchPlayers(mode: string = "blitz", count: number = 2) {
    const available = this.pool[mode] || [];
    if (available.length >= count) {
      const matched = available.slice(0, count);
      // pool’dan çıkar
      this.pool[mode] = available.slice(count);
      return matched;
    }
    return [];
  }

  /** 📄 Pool durumu (debug / admin) */
  async list(mode?: string) {
    if (mode) return this.pool[mode] || [];
    return this.pool;
  }
}
