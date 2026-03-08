import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyToken } from "@/utils/jwt";
import { User } from "@/models/user";
import { Player, PlayerDoc } from "@/models/player";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie.match(/token=([^;]+)/)?.[1];

  if (!token) return NextResponse.json({ user: null, player: null });

  const decoded = verifyToken<{ userId: string }>(token);
  if (!decoded) return NextResponse.json({ user: null, player: null });

  await connectToDatabase();

  try {
    const user = await User.findById(decoded.userId)
    if (!user) return NextResponse.json({ user: null, player: null });

   const player = await Player.findOne({ userId: user._id }).lean<PlayerDoc>().exec();

    return NextResponse.json({
      user,
      player: player ?? null,
    });
  } catch (err: any) {
    console.error("❌ /api/me error:", err.message);
    return NextResponse.json(
      { user: null, player: null },
      { status: 500 }
    );
  }
}
