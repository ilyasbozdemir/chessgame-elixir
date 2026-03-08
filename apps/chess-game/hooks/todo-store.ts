"use client";

import { create } from "zustand";

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

export interface TodoStore {
  todos: Todo[];
  toggle: (id: string) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => {
  const prev = get?.();

  return {
    todos: prev?.todos ?? [],

    toggle: (id) =>
      set((state) => ({
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, done: !t.done } : t
        ),
      })),
  };
});
