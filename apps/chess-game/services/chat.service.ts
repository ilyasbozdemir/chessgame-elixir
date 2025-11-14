// services/chat.service.ts
import { Logger } from "@/lib/utils";

export class ChatService {
  private logger = new Logger("ChessGame-ChatService");

  constructor() {}

  // -----------------------------------------------------
  // 📩 CONVERSATIONS
  // -----------------------------------------------------

  /** Kullanıcının tüm sohbetlerini getir */
  async listConversations(userId: string) {}

  /** Tek bir konuşmanın bilgilerini getir */
  async getConversation(conversationId: string) {}

  /** Yeni bir sohbet başlat */
  async createConversation(userId: string, targetId: string) {}

  /** Sohbeti sil (soft delete) */
  async deleteConversation(conversationId: string, requesterId: string) {}

  /** Sohbeti temizle (mesajları sil) */
  async clearConversation(conversationId: string) {}

  // -----------------------------------------------------
  // 💬 MESSAGES
  // -----------------------------------------------------

  /** Belirli bir konuşmanın mesajlarını getir (paged) */
  async listMessages(conversationId: string, page = 1, limit = 50) {}

  /** Tek bir mesaj gönder */
  async sendMessage(conversationId: string, userId: string, content: string) {}

  /** Mesajı okundu olarak işaretle */
  async markAsRead(conversationId: string, messageId: string) {}

  /** Mesajı sil */
  async deleteMessage(messageId: string) {}

  /** Mesaj düzenle (opsiyonel) */
  async editMessage(messageId: string, content: string) {}

  // -----------------------------------------------------
  // 📎 ATTACHMENTS (image/file)
  // -----------------------------------------------------

  /** Dosya upload (MinIO / S3 / Cloudflare R2 vs.) */
  async uploadFile(
    file: File,
    type: "image" | "file",
    senderId: string,
    conversationId: string
  ) {}

  /** Mesaj + attachment birlikte gönder */
  async sendAttachment(
    conversationId: string,
    userId: string,
    fileData: {
      type: "image" | "file";
      url: string;
      name: string;
    }
  ) {}

  // -----------------------------------------------------
  // 🕒 MESSAGE STATUS (sent/delivered/read/failed)
  // -----------------------------------------------------

  /** Mesajı gönderildi olarak işaretle (server ack) */
  async markAsSent(messageId: string) {}

  /** Mesaj karşıya teslim edildi */
  async markAsDelivered(messageId: string) {}

  /** Mesaj karşı taraf tarafından görüldü */
  async markAsSeen(conversationId: string, userId: string) {}

  // -----------------------------------------------------
  // 🔍 SEARCH
  // -----------------------------------------------------

  /** Mesajlar içinde arama */
  async searchMessages(conversationId: string, query: string) {}

  /** Kullanıcı adına göre sohbet ara */
  async searchConversations(userId: string, query: string) {}

  // -----------------------------------------------------
  // 🔔 REALTIME EVENTS (socket / Phoenix channel vs.)
  // -----------------------------------------------------

  /** Kullanıcı yazıyor bilgisi */
  async sendTyping(conversationId: string, userId: string) {}

  /** Kullanıcı online/offline durumunu güncelle */
  async setOnline(userId: string, isOnline: boolean) {}

  /** Yeni mesaj yayınlama (socket) */
  async broadcastMessage(conversationId: string, message: any) {}

  /** Mesaj okundu bilgisi yayınlama */
  async broadcastRead(conversationId: string, userId: string) {}

  // -----------------------------------------------------
  // 🚫 BLOCKING
  // -----------------------------------------------------

  /** Kullanıcıyı engelle */
  async blockUser(userId: string, blockedId: string) {}

  /** Engeli kaldır */
  async unblockUser(userId: string, blockedId: string) {}

  /** Engelli mi? */
  async isBlocked(userId: string, targetId: string) {}
}
