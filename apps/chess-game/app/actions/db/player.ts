"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Player } from "@/models/player";

export async function createPlayer(data: { id: string; name: string }) {
  await connectToDatabase();
  const doc = await Player.create({
    id: data.id,
    name: data.name.trim(),
    color: null,
  });
  return JSON.parse(JSON.stringify(doc));
}

export async function listPlayers() {
  await connectToDatabase();
  const docs = await Player.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function updatePlayerName(id: string, name: string) {
  await connectToDatabase();
  await Player.updateOne({ id }, { $set: { name: name.trim() } });
  return { ok: true };
}

export async function deletePlayer(id: string) {
  await connectToDatabase();
  await Player.deleteOne({ id });
  return { ok: true };
}
