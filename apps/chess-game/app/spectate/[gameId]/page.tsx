import PageClient from "./page.client";

interface PageProps {
  params: {
    tableId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { tableId } = await params;

  return <PageClient tableId={tableId} />;
}
