// services/friend.service.ts
import { Logger } from "@/lib/utils";

export class FriendService {
  private logger = new Logger("ChessGame-FriendService");

  constructor() {}

  /** Arkadaşlık isteği gönder */
  async sendFriendRequest(fromUser: string, toUser: string, note?: string) {}

  /** Arkadaşlık isteğini kabul et */
  async acceptFriendRequest(requestId: string) {}

  /** Arkadaşlık isteğini reddet */
  async rejectFriendRequest(requestId: string) {}

  /** Arkadaş listesi */
  async listFriends(username: string) {}

  /** Bekleyen istekler */
  async pendingRequests(username: string) {}

  /** Arkadaşlıktan çıkar */
  async removeFriend(username: string, friend: string) {}

  /** Kullanıcı arkadaş mı? */
  async isFriend(userA: string, userB: string) {}
}
