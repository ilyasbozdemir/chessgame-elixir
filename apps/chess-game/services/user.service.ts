// services/user.service.ts
import { getUserByIdAction } from "@/app/actions/db/user";
import { Logger } from "@/lib/utils";

export class UserService {
  private logger = new Logger("ChessGame-UserService");

  constructor() {}

  /** 👤 ID ile kullanıcı bilgisi al */
  async getById(userId: string) {
    this.logger.info("🎯 getById() çağrıldı:", userId);
    const result = await getUserByIdAction(userId);
    if (!result) {
      this.logger.warn("⚠️ Kullanıcı bulunamadı:", userId);
      return null;
    }
    this.logger.success("✅ Kullanıcı bulundu:", result.username || result.displayName);
    return result;
  }
}
