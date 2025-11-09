// services/players.service.ts
import { useChessStore } from "@/lib/chess-store";
import { Logger } from "@/lib/utils";

const isBrowser = typeof window !== "undefined";

export class AuthService {
  private socketChannel?: any;
  private logger = new Logger("ChessGame-AuthService");

  constructor(channel?: any) {
    this.socketChannel = channel;
  }

  async register(data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) {
    this.logger.info("🔐 register() çağrıldı:", data.username);

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Kayıt başarısız");

    const result: { user: any; token: string } = await res.json();

    this.logger.success("✅ Kayıt başarılı:", result.user);

    return result;
  }

  async login(email: string, password: string) {
    this.logger.info("🔐 login() çağrıldı:", email);

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Giriş başarısız");
    }

    const data = await res.json();

    this.logger.success("✅ Giriş başarılı:", data.user);

    this.socketChannel?.push("user:logged_in", data.user);

    return data;
  }
  async logout() {
    this.logger.info("🔐 logout() çağrıldı");

    await fetch("/api/logout", { method: "POST" });

    this.socketChannel?.push("user:logged_out", {});

    this.logger.success("✅ Çıkış başarılı");
  }
}
