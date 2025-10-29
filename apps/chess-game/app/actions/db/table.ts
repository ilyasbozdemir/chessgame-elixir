"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Table } from "@/models/table";

export async function createTable(data: {
  id: string;
  name: string;
  ownerId?: string;
  ownerName?: string;
}) {
  await connectToDatabase();
  const doc = await Table.create({
    id: data.id,
    name: data.name.trim(),
    ownerId: data.ownerId,
    ownerName: data.ownerName,
    status: "waiting",
    players: [],
  });
  return JSON.parse(JSON.stringify(doc));
}

export async function listTables() {
  await connectToDatabase();
  const docs = await Table.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function joinTable(
  tableId: string,
  player: { id: string; name: string }
) {
  await connectToDatabase();
  await Table.updateOne(
    { id: tableId, $expr: { $lt: [{ $size: "$players" }, 2] } },
    { $addToSet: { players: { ...player, color: null, isReady: false } } }
  );
  return { ok: true };
}

export async function leaveTable(tableId: string, playerId: string) {
  await connectToDatabase();
  await Table.updateOne(
    { id: tableId },
    { $pull: { players: { id: playerId } } }
  );
  return { ok: true };
}

export async function setPlayerReady(
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

export async function setStatus(
  tableId: string,
  status: "waiting" | "playing" | "finished"
) {
  await connectToDatabase();
  await Table.updateOne({ id: tableId }, { $set: { status } });
  return { ok: true };
}
