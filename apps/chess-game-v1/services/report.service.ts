// services/report.service.ts
import { Logger } from "@/lib/utils";

export class ReportService {
  private logger = new Logger("ChessGame-ReportService");

  constructor() {}

  /** Kullanıcı rapor et */
  async reportUser(reporter: string, target: string, reason: string, details: string) {}

  /** Raporu getir (admin) */
  async getReport(reportId: string) {}

  /** Tüm raporları listele (admin) */
  async listReports(filters?: any) {}

  /** Raporu çöz / kapat (admin) */
  async resolveReport(reportId: string, action: "ban" | "warn" | "ignore") {}
}
