import { DebugBox } from "@/components/debug-box";
import PageClient from "./page.client";
import { GameService } from "@/services/game.service";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const gameService = new GameService();

  const game = await gameService.getById(id);

  if (!game?.ok) {
    return notFound();
  }

  return (
    <>
      <PageClient id={params.id} />
    </>
  );
}
