import { cookies } from "next/headers";
import PageClient from "./page.client";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/lobby");
  }

  return <PageClient />;
}
