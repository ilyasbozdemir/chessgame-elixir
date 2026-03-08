"use client";

import { TodoStore, useTodoStore } from "@/hooks/todo-store";
import { useZustandHydrate } from "@/hooks/use-zustand-hydrate";
import { maskSensitive, stripSensitive, user } from "@/utils";

export default function PageClient({ initial }: { initial: any }) {
  useZustandHydrate<TodoStore>(useTodoStore, (s) => s.todos, initial);

  const todos = useTodoStore((s) => s.todos);

  console.log("User (maskSensitive log) =>", maskSensitive(user));
  console.log("User (stripSensitive log) =>", stripSensitive(user));

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

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
