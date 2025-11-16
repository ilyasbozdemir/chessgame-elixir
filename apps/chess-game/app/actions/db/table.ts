"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Player } from "@/models/player";
import { Table } from "@/models/table";
import { User } from "@/models/user";

export async function createTableAction(data: {
  name: string;
  ownerId?: string;
}) {
  await connectToDatabase();
  const doc = await Table.create({
    name: data.name.trim(),
    ownerId: data.ownerId,
    status: "waiting",
    players: [],
  });

  return {
    id: doc._id.toString(),
    _id: doc._id.toString(),
    name: doc.name,
    ownerId: doc.ownerId.toString(),
    status: doc.status,
    players: doc.players,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export async function listTablesAction() {
  await connectToDatabase();
  const docs = await Table.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function joinTableAction(tableId: string, ownerId: string) {
  await connectToDatabase();

  // 🎯 1) Masayı bul
  const table = await Table.findById(tableId);
  if (!table) {
    return null;
  }

  // 🎯 2) Player dokümanını bul
  const user = await User.findById(ownerId);

  let player = await Player.findOne({ userId: ownerId });

  if (!player) {
    return null;
  }

  const already = table.players.some(
    (p: any) => p.id?.toString() === ownerId.toString()
  );
  if (already) {
    console.log(
      "⚠️ [joinTableAction] Oyuncu zaten masada, eklenmedi:",
      ownerId
    );
    return JSON.parse(JSON.stringify(table));
  }

  // 🎨 3) Renk ata
  let color: "white" | "black" | null = null;
  if (table.players.length === 0) color = "white";
  else if (table.players.length === 1) color = "black";

  // 🧩 4) Table formatına uygun push et
  const playerEntry = {
    id: player._id.toString(),
    name: user.displayName,
    color,
    isReady: false,
  };

  table.players.push(playerEntry);

  // 💾 Kaydet
  await table.save();

  // 🔄 JSON-safe response
  const safe = JSON.parse(JSON.stringify(table));
  return safe;
}

export async function leaveTableAction(tableId: string, playerId: string) {
  await connectToDatabase();
  await Table.updateOne(
    { id: tableId },
    { $pull: { players: { id: playerId } } }
  );
  return { ok: true };
}

export async function setPlayerReadyAction(
  tableId: string,
  playerId: string,
  isReady: boolean
) {
  await connectToDatabase();
  await Table.updateOne(
    { id: tableId, "players.id": playerId },
    { $set: { "players.$.isReady": isReady } }
  );
  return { ok: true };
}

export async function setStatusAction(
  tableId: string,
  status: "waiting" | "playing" | "finished"
) {
  await connectToDatabase();
  await Table.updateOne({ id: tableId }, { $set: { status } });
  return { ok: true };
}
