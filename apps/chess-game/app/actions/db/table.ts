"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Table } from "@/models/table";

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

  return JSON.parse(JSON.stringify(doc));
}

export async function listTablesAction() {
  await connectToDatabase();
  const docs = await Table.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function joinTableAction(
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
