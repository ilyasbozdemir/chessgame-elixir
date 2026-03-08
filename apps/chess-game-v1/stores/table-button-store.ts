import { create } from "zustand";

type TableButtonState = {
  label: string;
  disabled: boolean;
};

type TableButtonStore = {
  buttons: Record<string, TableButtonState>;
  setButton: (tableId: string, state: TableButtonState) => void;
  resetButton: (tableId: string) => void;
};

export const useTableButtonStore = create<TableButtonStore>((set) => ({
  buttons: {},
  setButton: (tableId, state) =>
    set((s) => ({ buttons: { ...s.buttons, [tableId]: state } })),
  resetButton: (tableId) =>
    set((s) => {
      const copy = { ...s.buttons };
      delete copy[tableId];
      return { buttons: copy };
    }),
}));
