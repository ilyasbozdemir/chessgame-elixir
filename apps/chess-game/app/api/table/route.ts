import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Table } from "@/models/table";

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const { id, name, ownerId, ownerName, maxPlayers } = body;

    if (!name || !ownerId) {
      return NextResponse.json(
        { error: "Eksik bilgi: name ve ownerId zorunludur." },
        { status: 400 }
      );
    }

    // 🔹 Yeni masa oluştur
    const newTable = await Table.create({
      id,
      name: name.trim(),
      ownerId,
      ownerName,
      maxPlayers,
      players: [
        {
          id: ownerId,
          name: ownerName,
          isReady: false,
          color: null,
        },
      ],
      status: "waiting",
      createdAt: new Date(),
    });

    const tableObj = JSON.parse(JSON.stringify(newTable));

    return NextResponse.json(tableObj, { status: 201 });
  } catch (err: any) {
    console.error("❌ /api/table error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
