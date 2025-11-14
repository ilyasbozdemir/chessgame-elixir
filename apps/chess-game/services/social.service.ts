// services/social.service.ts
import { Logger } from "@/lib/utils";

export class SocialService {
  private logger = new Logger("ChessGame-SocialService");

  constructor() {}

  // -------------------------------------------------
  // 📝 POST / FEED
  // -------------------------------------------------

  /** 📌 Tüm akış postlarını getir */
  async listFeed() {}

  /** ➕ Yeni gönderi oluştur */
  async createPost(data: {
    authorId: string;
    content: string;
    image?: string | null;
  }) {}

  /** 🗑️ Gönderiyi sil */
  async deletePost(postId: string, requesterId: string) {}

  /** ❤️ Post beğen */
  async likePost(postId: string, userId: string) {}

  /** 💬 Posta yorum ekle */
  async commentPost(postId: string, userId: string, content: string) {}

  /** 🔁 Gönderiyi paylaş */
  async sharePost(postId: string, userId: string) {}

  /** 🔍 Post detayını getir */
  async getPostById(postId: string) {}

  // -------------------------------------------------
  // 👥 FRIEND SYSTEM
  // -------------------------------------------------

  /** 📌 Arkadaş listesini getir */
  async listFriends(userId: string) {}

  /** ➕ Arkadaş isteği gönder */
  async sendFriendRequest(fromId: string, toId: string) {}

  /** ✔️ Arkadaş isteğini kabul et */
  async acceptFriendRequest(requestId: string) {}

  /** ❌ Arkadaş sil */
  async removeFriend(userId: string, friendId: string) {}

  /** 🔎 Kullanıcı arama */
  async searchUsers(query: string) {}

  // -------------------------------------------------
  // 🏆 TOURNAMENTS SECTION
  // -------------------------------------------------

  /** ⏳ Yaklaşan turnuvalar */
  async listUpcomingTournaments() {}

  /** 📝 Turnuvaya kayıt */
  async joinTournament(tournamentId: string, playerId: string) {}

  /** 🏅 Turnuva detayları */
  async getTournament(tournamentId: string) {}

  // -------------------------------------------------
  // 🎖️ ACHIEVEMENTS
  // -------------------------------------------------

  /** 🏆 Başarı listesi getir */
  async listAchievements(userId: string) {}

  /** ✔️ Yeni başarı ver */
  async grantAchievement(userId: string, achievementId: string) {}

  // -------------------------------------------------
  // 🔔 NOTIFICATIONS
  // -------------------------------------------------

  /** 🔔 Bildirimleri getir */
  async listNotifications(userId: string) {}

  /** 📬 Bildirimi okunmuş işaretle */
  async markNotificationRead(notificationId: string) {}
}
