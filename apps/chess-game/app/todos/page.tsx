import PageClient from "./page.client";

async function fetchTodos() {
  return [
    { id: "1", title: "Zustand SSR Hydrate yaz", done: false },
    { id: "2", title: "LinkedIn gönderisi paylaş", done: false },
  ];
}

export default async function Page() {
  const todos = await fetchTodos();

  return <PageClient initial={todos} />;
}
