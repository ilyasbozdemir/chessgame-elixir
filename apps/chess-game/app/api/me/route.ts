import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Player } from "@/models/player";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/playerId=([^;]+)/);
  const playerId = match ? decodeURIComponent(match[1]) : null;

  if (!playerId) return NextResponse.json({ player: null });

  await connectToDatabase();

  try {
    const player = await Player.findById(playerId).lean();
    return NextResponse.json({ player: player ?? null });
  } catch (err: any) {
    console.error("❌ /api/me error:", err.message);
    return NextResponse.json({ player: null }, { status: 500 });
  }
}
