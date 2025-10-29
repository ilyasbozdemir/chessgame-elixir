// services/table.service.ts
import { useChessStore } from "@/lib/chess-store";
import type { TableDoc } from "@/models/table";
import { BaseService } from "./base.service";

export class TableService extends BaseService {
  private socketChannel?: any;

  constructor(channel?: any) {
    super();
    this.socketChannel = channel;
  }
}
