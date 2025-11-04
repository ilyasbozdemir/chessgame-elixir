"use client";

import { TodoStore, useTodoStore } from "@/hooks/todo-store";
import { useZustandHydrate } from "@/hooks/use-zustand-hydrate";
import { useEffect, useState } from "react";

export default function PageClient({ initial }: { initial: any }) {
  useZustandHydrate<TodoStore>(useTodoStore, (s) => s.todos, initial);

  const todos = useTodoStore((s) => s.todos);

  return (
    <div style={{ display: "flex", gap: "3rem" }}>
      <div>
        <h3>SSR (prop olarak gelen)</h3>
        <pre>{JSON.stringify(initial, null, 2)}</pre>
      </div>

      <div>
        <h3>Zustand Store</h3>
        <pre>{JSON.stringify(todos, null, 2)}</pre>
      </div>
    </div>
  );
}
