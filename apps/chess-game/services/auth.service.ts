import {
  loginAction,
  logoutAction,
  registerAction,
} from "@/app/actions/db/user";
import { Logger } from "@/lib/utils";

const isBrowser = typeof window !== "undefined";

export class AuthService {
  private socketChannel?: any;
  private logger = new Logger("ChessGame-AuthService");

  constructor(channel?: any) {
    this.socketChannel = channel;
  }

  /** 🧩 Kayıt ol */
  async register(data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) {
    this.logger.info("🔐 register() çağrıldı:", data.username);

    const result = await registerAction(data);

    this.logger.success("✅ Kayıt başarılı:", result.user);

    this.socketChannel?.push("user:registered", result.user);

    return result;
  }

  /** 🔐 Giriş yap */
  async login(email: string, password: string) {
    this.logger.info("🔐 login() çağrıldı:", email);

    const result = await loginAction(email, password);

    this.logger.success("✅ Giriş başarılı:", result.user);

    this.socketChannel?.push("user:logged_in", result.user);

    return result;
  }

  /** 🚪 Çıkış yap */
  async logout() {
    this.logger.info("🔐 logout() çağrıldı");

    await logoutAction();

    this.socketChannel?.push("user:logged_out", {});

    this.logger.success("✅ Çıkış başarılı");
  }
}
