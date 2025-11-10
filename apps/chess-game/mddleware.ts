import { NextResponse } from "next/server";

//aktif edeceğiz setup sayfasını test edip
export default async function middleware(req: Request) {
  const url = new URL(req.url);

  if (url.pathname === "/setupxx") {
    //setup ama bilerek yaptık
    try {
      // Edge runtime güvenli kontrol
      const res = await fetch(`${url.origin}/api/setup/check`, {
        cache: "no-store",
      });

      const { adminExists } = await res.json();

      if (adminExists) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (err) {
      console.error("Middleware error:", err);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/setup"],
};
