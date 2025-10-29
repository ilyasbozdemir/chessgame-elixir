// services/players.service.ts
import type { Player } from "@/lib/chess-types";
import { BaseService } from "./base.service";

export class PlayerService extends BaseService {
  async fetchCurrent(): Promise<Player | null> {
    try {
      const res = await this.request<{ player: Player }>("/api/me", {
        credentials: "include",
      });
      return res.player;
    } catch {
      return null;
    }
  }

  async create(name: string): Promise<Player> {
    const res = await this.request<{ player: Player }>("/api/player", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    return res.player;
  }
}
