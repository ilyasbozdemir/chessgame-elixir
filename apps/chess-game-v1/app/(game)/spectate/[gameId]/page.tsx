import PageClient from "./page.client";

interface PageProps {
  params: {
    gameId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { gameId } = await params;

  return <PageClient gameId={gameId} />;
}
