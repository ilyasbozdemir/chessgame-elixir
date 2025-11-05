import PageClient from "./page.client";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  
  return <PageClient id={params.id} />;
}
