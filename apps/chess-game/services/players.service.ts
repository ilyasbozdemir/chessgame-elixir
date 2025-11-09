// services/players.service.ts
import { useChessStore } from "@/lib/chess-store";
import { Logger } from "@/lib/utils";
import { PlayerDoc } from "@/models/player";

const isBrowser = typeof window !== "undefined";

export class PlayerService {
  private socketChannel?: any;
  private logger = new Logger("ChessGame-PlayerService");

  constructor(channel?: any) {
    this.socketChannel = channel;
  }

  async fetchCurrent(): Promise<{ player: PlayerDoc | null }> {
    try {
      const res = await fetch("/api/me", { credentials: "include" });

      if (!res.ok) {
        return { player: null };
      }

      const data = await res.json();
      return { player: data?.player ?? null };
    } catch (err) {
      console.error("Failed to fetch current player:", err);
      return { player: null };
    }
  }

  async create(name: string): Promise<PlayerDoc> {
    console.log("🌐 [Service] create() çağrıldı:", name);

    const res = await fetch("/api/player", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ [Service] /api/player hatası:", text);
      throw new Error("Oyuncu oluşturulamadı: " + text);
    }

    const data = await res.json();
    console.log("✅ [Service] /api/player yanıtı:", data);

    if (isBrowser) {
      // useChessStore.getState().addPlayer(name, this.socketChannel);

      this.socketChannel?.push("player:joined", { name });
    }

    return data;
  }
}
