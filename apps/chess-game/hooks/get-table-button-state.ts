import { useMemo, useEffect } from "react";
import { useChessStore } from "@/stores/chess-store";
import { useTableButtonStore } from "@/stores/table-button-store";
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
  const { setButton } = useTableButtonStore();

  // --- ÇÖZÜCÜ FONKSİYON ---
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

      let label = "";
      let disabled = false;
      let action = () => {};

      if (isPlaying) {
        label = "Oyunu İzle";
        action = () => handlers?.onWatch?.(tableId);
      } else if (meInTable) {
        label = "Masaya Git";
        action = () => handlers?.onGoToTable?.(tableId);
      } else if (isEmpty) {
        label = "Masayı İncele";
        action = () => handlers?.onPreview?.(tableId);
      } else if (isFull) {
        label = "Masa Dolu";
        disabled = true;
      } else {
        label = "Masaya Katıl";
        action = () => handlers?.onJoin?.(tableId);
      }

      return { label, disabled, action };
    };
  }, [tables, player, handlers]);

  const tableButtonStore = useTableButtonStore.getState();

  useEffect(() => {
    tables.forEach((table) => {
      const tableId = table._id?.toString() || "null";
      const result = resolve(tableId);
      if (!result) return;

      const currentState = tableButtonStore.buttons[tableId];

      if (
        !currentState ||
        currentState.label !== result.label ||
        currentState.disabled !== result.disabled
      ) {
        setButton(tableId, {
          label: result.label,
          disabled: result.disabled,
        });
      }
    });
  }, [tables, resolve, setButton, tableButtonStore.buttons]);

  return resolve;
}
