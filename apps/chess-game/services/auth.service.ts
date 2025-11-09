// services/players.service.ts
import { useChessStore } from "@/lib/chess-store";
import { Logger } from "@/lib/utils";
import { PlayerDoc } from "@/models/player";

const isBrowser = typeof window !== "undefined";

export class AuthService {
  private socketChannel?: any;
  private logger = new Logger("ChessGame-AuthService");

  constructor(channel?: any) {
    this.socketChannel = channel;
  }

  async register(name: string) {
    this.logger.info("🔐 register() çağrıldı:", name);

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Kayıt başarısız");
    }

    const player = await res.json();
    this.logger.success("✅ Kayıt başarılı:", player);

    // Phoenix'e haber ver
    this.socketChannel?.push("player:registered", player);

    return player;
  }

  async login(name: string) {
    this.logger.info("🔐 login() çağrıldı:", name);

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Giriş başarısız");
    }

    const player = await res.json();
    this.logger.success("✅ Giriş başarılı:", player);

    // Phoenix'e haber ver
    this.socketChannel?.push("player:logged_in", player);

    return player;
  }

  async logout() {
    this.logger.info("🔐 logout() çağrıldı");

    await fetch("/api/logout", { method: "POST", credentials: "include" });

    // Phoenix'e haber ver
    this.socketChannel?.push("player:logged_out", {});

    this.logger.success("✅ Çıkış başarılı");
  }
}
