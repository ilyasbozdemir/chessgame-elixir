import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json(
      { message: "Çıkış yapıldı" },
      { status: 200 }
    );

    res.headers.append(
      "Set-Cookie",
      `playerId=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`
    );

    return res;
  } catch (err: any) {
    console.error("❌ /api/logout error:", err.message);
    return NextResponse.json({ error: "Çıkış yapılamadı" }, { status: 500 });
  }
}
