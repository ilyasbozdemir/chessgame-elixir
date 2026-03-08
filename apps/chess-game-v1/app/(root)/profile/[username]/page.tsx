import { Suspense } from "react";
import ProfilePageClient from "./page.client";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Yükleniyor...
        </div>
      }
    >
      <ProfilePageClient username={username} />
    </Suspense>
  );
}
