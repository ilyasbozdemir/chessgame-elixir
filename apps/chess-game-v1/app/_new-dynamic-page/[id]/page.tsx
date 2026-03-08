import PageClient from "./page.client";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <PageClient id={id} />;
}
