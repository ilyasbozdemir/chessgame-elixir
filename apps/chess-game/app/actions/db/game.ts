"use server";
import { Types } from "mongoose";

import { connectToDatabase } from "@/lib/mongodb";

import { Game } from "@/models/game";
import { Table } from "@/models/table";

export async function createGameAction(
  tableId: string,
  timeControl: string = "10+0"
) {
  await connectToDatabase();

  // 1️⃣ Table'ı bul
  const table = await Table.findById(tableId);
  if (!table) {
    return { ok: false, error: "Table not found" };
  }

  if (table.players.length < 2) {
    return { ok: false, error: "Not enough players" };
  }

  // 2️⃣ Oyuncuları al (snapshot)
  const white = table.players.find((p: any) => p.color === "white");
  const black = table.players.find((p: any) => p.color === "black");

  if (!white || !black) {
    return { ok: false, error: "White/Black players are not assigned" };
  }

  // 3️⃣ Başlangıç FEN
  const initialFen = "startpos";

  // 4️⃣ Süre hesapla (örneğin 10+0 ise 10 dakika)
  const baseMinutes = parseInt(timeControl.split("+")[0]);
  const baseMs = baseMinutes * 60 * 1000;

  // 5️⃣ Game oluştur
  const gameDoc = await Game.create({
    tableId: table._id,

    white: {
      ...white,
      remainingTime: baseMs,
    },

    black: {
      ...black,
      remainingTime: baseMs,
    },

    status: "playing",
    fen: initialFen,

    timeControl,
    increment: parseInt(timeControl.split("+")[1] || "0"),

    moves: [],

    startedAt: new Date(),
    finishedAt: null,
  });

  return {
    ok: true,
    gameId: gameDoc._id.toString(),
    game: JSON.parse(JSON.stringify(gameDoc)),
  };
}

export async function getGameByIdAction(gameId: string) {
  await connectToDatabase();


  const game = await Game.findById(new Types.ObjectId(gameId)); 


  if (!game) {
    return { ok: false, error: "Game not found" };
  }

  return { ok: true, game: JSON.parse(JSON.stringify(game)) };
}

export async function getAllGamesAction() {
  await connectToDatabase();

  const games = await Game.find().sort({ startedAt: -1 });
  return {
    ok: true,
    games: games.map((g) => JSON.parse(JSON.stringify(g))),
  };
}
