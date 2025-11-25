import PageClient from "./page.client";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  return <PageClient />;
}
