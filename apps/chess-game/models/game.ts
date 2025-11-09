import { Schema, model, Types, models } from "mongoose";

const MoveSchema = new Schema(
  {
    from: { type: String, required: true }, // "e2"
    to: { type: String, required: true }, // "e4"
    piece: { type: String, required: true }, // "pawn", "knight" vs
    fen: { type: String, required: true }, // position after move
    playedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const GameSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },

    tableId: { type: Schema.Types.ObjectId, ref: "Table", required: true },

    whiteId: { type: Schema.Types.ObjectId, ref: "Player", required: true },
    blackId: { type: Schema.Types.ObjectId, ref: "Player", required: true },

    status: {
      type: String,
      enum: ["playing", "finished"],
      default: "playing",
    },

    winner: {
      type: Schema.Types.ObjectId,
      ref: "Player",
      default: null,
    },

    moves: { type: [MoveSchema], default: [] },

    startedAt: { type: Date, default: Date.now },
    finishedAt: { type: Date, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Game = models.Game || model("Game", GameSchema);

export type GameDoc = typeof Game extends infer M
  ? M extends { prototype: infer T }
    ? T
    : never
  : never;
