import PageClient from "./page.client";
import { RealtimeListener } from "@/components/realtime-listener";

export default async function Page() {
  return (
    <>
      <RealtimeListener />
      <PageClient />
    </>
  );
}
