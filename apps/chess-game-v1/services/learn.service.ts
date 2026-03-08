// services/learn.service.ts
import { Logger } from "@/lib/utils";

export class LearnService {
  private logger = new Logger("ChessGame-LearnService");

  constructor() {}

  // -----------------------------------------------------
  // 📚 ÖĞRENME YOLLARI (Beginner / Intermediate / Advanced)
  // -----------------------------------------------------

  /** Tüm öğrenme yollarını getir */
  async getLearningPaths() {}

  /** Tek bir öğrenme yolunu getir (beginner / advanced vs.) */
  async getLearningPath(pathId: string) {}

  /** Öğrenme yolu ilerleme durumunu getir */
  async getPathProgress(userId: string, pathId: string) {}

  /** Öğrenme yolu ilerlemesini güncelle */
  async updatePathProgress(
    userId: string,
    pathId: string,
    progress: number
  ) {}

  // -----------------------------------------------------
  // 🎥 DERSLER (Video / text lesson)
  // -----------------------------------------------------

  /** Bir öğrenme yoluna ait tüm dersleri getir */
  async getLessonsByPath(pathId: string) {}

  /** Bir dersi getir */
  async getLesson(lessonId: string) {}

  /** Ders içeriklerini getir */
  async getLessonContent(lessonId: string) {}

  /** Bir ders tamamlandı olarak işaretle */
  async markLessonCompleted(userId: string, lessonId: string) {}

  /** Ders ilerleme yüzdesini değiştir */
  async updateLessonProgress(
    userId: string,
    lessonId: string,
    progress: number
  ) {}

  /** Kullanıcının izlediği son dersleri al */
  async getRecentLessons(userId: string) {}

  // -----------------------------------------------------
  // 🧠 KULLANICI GENEL EĞİTİM STATÜSÜ
  // -----------------------------------------------------

  /** Kullanıcının tüm eğitim ilerlemesini getir */
  async getUserLearningOverview(userId: string) {}

  /** Kullanıcının tüm ilerlemelerini sıfırla */
  async resetAllLearning(userId: string) {}

  // -----------------------------------------------------
  // 🔍 ARAMA / FILTER
  // -----------------------------------------------------

  /** Başlık / kategori / seviyeye göre ders arama */
  async searchLessons(query: string) {}

  /** Kategoriye göre ders listele */
  async filterLessonsByCategory(category: string) {}

  // -----------------------------------------------------
  // ⭐ DERECELENDIRME & FAVORI DERSLER (opsiyonel)
  // -----------------------------------------------------

  /** Kullanıcı bir dersi favoriye eklesin */
  async addFavoriteLesson(userId: string, lessonId: string) {}

  /** Kullanıcı favorilerini listele */
  async getFavoriteLessons(userId: string) {}

  /** Kullanıcı derslere puan versin */
  async rateLesson(userId: string, lessonId: string, rating: number) {}
}
