// services/live-match.service.ts
import { Logger } from "@/lib/utils";

const isBrowser = typeof window !== "undefined";

export class LiveMatchService {
  private logger = new Logger("ChessGame-LiveMatchService");

  constructor() {}

  // ---------------------------------------------------
  // 🧩 CRUD OPERASYONLARI
  // ---------------------------------------------------

  /** 📌 belirli bir maçı getir */
  async getById(matchId: string) {
    // return await MatchModel.findById(matchId)
  }

  /** 📡 canlı maçları listele (oynanan) */
  async listActive() {
    // return await MatchModel.find({ status: "playing" })
  }

  /** 🆕 maç oluştur */
  async createMatch(data: {
    whitePlayerId: string;
    blackPlayerId: string;
    tableId: string;
  }) {
    // const match = await MatchModel.create({...})
  }

  /** 🔄 maç durumunu güncelle */
  async updateStatus(
    matchId: string,
    status: "waiting" | "playing" | "finished"
  ) {
    // await MatchModel.updateOne({_id: matchId}, {status})
  }

  /** ♟️ hamleyi kaydet */
  async pushMove(matchId: string, move: any) {
    // match.moves.push(move)
  }

  /** 🔚 maçı bitir */
  async finish(matchId: string, winnerId: string | null) {
    // await MatchModel.updateOne({_id: matchId}, {...})
  }

  // ---------------------------------------------------
  // 🎥 İZLEME & GERİYE DÖNÜK ANALİZ
  // ---------------------------------------------------

  /** 👀 kullanıcı maçı izliyor */
  async addWatcher(matchId: string, userId: string) {
    // watchers.push(userId)
  }

  /** ❌ izleyiciyi kaldır */
  async removeWatcher(matchId: string, userId: string) {
    // watchers.remove(userId)
  }

  /** 📈 trend, popüler maçlar */
  async listTrending() {
    // aktif izleyiciye göre sıralama
  }

  // ---------------------------------------------------
  // 📡 REALTIME (Phoenix push'lar)
  // ---------------------------------------------------

  /** 📢 maç güncellemesi yayınla */
  async broadcast(matchId: string, event: string, payload: any) {
    // socket.push(...)
  }

  /** 🧠 hamle logları (replay sistemi) */
  async logEvent(matchId: string, message: string) {
    // match.logs.push(...)
  }
}
