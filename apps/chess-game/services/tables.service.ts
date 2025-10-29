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

  async create(name: string, owner: PlayerDoc) {
    this.logger.group(`[ChessGame-TableService] create()`);

    const data = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      ownerId: owner._id?.toString() || "",
      ownerName: owner.name,
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
}
