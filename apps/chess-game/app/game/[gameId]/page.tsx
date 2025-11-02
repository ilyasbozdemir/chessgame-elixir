import PageClient from "./page.client";

interface PageProps {
  params: {
    gameId: string;
  };
}

export default function Page({ params }: PageProps) {
  return <PageClient gameId={params.gameId} />;
}
