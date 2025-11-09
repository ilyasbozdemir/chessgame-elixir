import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Player } from "@/models/player";
import { Table } from "@/models/table";

export async function POST(req: Request) {
  const { name } = await req.json();
  await connectToDatabase();

  let player: any = null;

  try {
    if (player) {
      const res = NextResponse.json(player, { status: 200 });
      res.headers.append(
        "Set-Cookie",
        `playerId=${player._id.toString()}; Path=/; HttpOnly; Max-Age=${
          60 * 60 * 24 * 30
        }; SameSite=Lax${
          process.env.NODE_ENV === "production" ? "; Secure" : ""
        }`
      );
      return res;
    }

    // 🔹 Yeni oyuncu oluştur
    const newPlayer = await Player.create({
      name: name.trim(),
      color: null,
      createdAt: new Date(),
    });

    const playerObj = JSON.parse(JSON.stringify(newPlayer));
    const res = NextResponse.json(playerObj, { status: 201 });
    res.headers.append(
      "Set-Cookie",
      `playerId=${playerObj._id}; Path=/; HttpOnly; Max-Age=${
        60 * 60 * 24 * 30
      }; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`
    );
    return res;
  } catch (err: any) {
    console.error("❌ /api/player error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await connectToDatabase();

  try {
    if (!id) {
      return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });
    }

    const deleted = await Table.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Masa bulunamadı veya zaten silinmiş." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Masa başarıyla silindi." },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("❌ /api/table DELETE hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
