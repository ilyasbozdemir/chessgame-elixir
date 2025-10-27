import { listPlayers } from "../actions/db/player";
import PageClient from "./page.client";

export default async function Page() {
  const ALLplayers = await listPlayers();
  console.log("🏓 [lobby/page.tsx] Tüm Oyuncular:", ALLplayers);

  return (
    <>
      <PageClient />
    </>
  );
}
