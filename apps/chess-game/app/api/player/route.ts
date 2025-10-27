import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Player } from "@/models/player";

export async function POST(req: Request) {
  const { name, id } = await req.json();
  await connectToDatabase();

  let player: any = null;

  try {
    // 🔹 ID varsa ama geçerli formatta değilse, Mongo’ya sorma
    if (id && mongoose.isValidObjectId(id)) {
      player = await Player.findById(id).lean();
    }

    if (player) {
      const res = NextResponse.json(player, { status: 200 });
      res.headers.append(
        "Set-Cookie",
        `playerId=${player._id.toString()}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax${
          process.env.NODE_ENV === "production" ? "; Secure" : ""
        }`
      );
      return res;
    }

    // 🔹 Yeni oyuncu oluştur
    const newPlayer = await Player.create({
      name: name.trim(),
      color: null,
      isReady: false,
    });

    const playerObj = JSON.parse(JSON.stringify(newPlayer));
    const res = NextResponse.json(playerObj, { status: 201 });
    res.headers.append(
      "Set-Cookie",
      `playerId=${playerObj._id}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`
    );
    return res;
  } catch (err: any) {
    console.error("❌ /api/player error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
