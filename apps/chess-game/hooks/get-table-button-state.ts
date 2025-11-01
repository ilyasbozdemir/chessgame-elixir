// hooks/use-table-button.ts
import { useMemo } from "react";
import { useChessStore } from "@/lib/chess-store";
import type { PlayerDoc } from "@/models/player";

type Handlers = {
  onPreview?: (id: string) => void;
  onJoin?: (id: string) => void;
  onGoToTable?: (id: string) => void;
  onWatch?: (id: string) => void;
};

export function useTableButtonResolver(
  player: PlayerDoc | null,
  handlers?: Handlers
) {
  const tables = useChessStore((s) => s.tables);

  const resolve = useMemo(() => {
    return (tableId: string | null | undefined) => {
      if (!tableId) {
        return {
          label: "Masaya Erişilemiyor",
          disabled: true,
          action: () => {},
        };
      }

      const table = tables.find((t) => t._id?.toString() === tableId);
      if (!table) {
        return {
          label: "Masaya Erişilemiyor",
          disabled: true,
          action: () => {},
        };
      }

      const playerId = player?._id?.toString();
      const players = table.players ?? [];

      const meInTable = players.some((p) => p.id?.toString() === playerId);
      const isFull = players.length >= 2;
      const isEmpty = players.length === 0;
      const isPlaying = table.status === "playing";

      // label & action
      if (isPlaying) {
        return {
          label: "Oyunu İzle",
          disabled: false,
          action: () => handlers?.onWatch?.(tableId),
        };
      }

      if (meInTable) {
        return {
          label: "Masaya Git",
          disabled: false,
          action: () => handlers?.onGoToTable?.(tableId),
        };
      }

      if (isEmpty) {
        return {
          label: "Masayı İncele",
          disabled: false,
          action: () => handlers?.onPreview?.(tableId),
        };
      }

      if (isFull && !isPlaying) {
        return {
          label: "Masa Dolu",
          disabled: true,
          action: () => {},
        };
      }

      return {
        label: "Masaya Katıl",
        disabled: false,
        action: () => handlers?.onJoin?.(tableId),
      };
    };
  }, [tables, player, handlers]);

  return resolve;
}
