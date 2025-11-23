import { Schema, model, Types, models } from "mongoose";
import { TablePlayerSchema } from "./table-player";

const MoveSchema = new Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    piece: { type: String, required: true },
    fen: { type: String, required: true },
    playedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const GameSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },

    tableId: { type: Schema.Types.ObjectId, ref: "Table", required: true },

    white: { type: TablePlayerSchema, required: true },
    black: { type: TablePlayerSchema, required: true },

    status: {
      type: String,
      enum: ["playing", "finished"],
      default: "playing",
    },

    winner: {
      type: String,
      enum: ["white", "black", "draw", null],
      default: null,
    },

    whiteScore: { type: Number, default: null },
    blackScore: { type: Number, default: null },

    endReason: {
      type: String,
      enum: [
        "checkmate",
        "resign",
        "timeout",
        "draw-agreement",
        "abort",
        "disconnect",
        null,
      ],
      default: null,
    },

    currentTurn: {
      type: String,
      enum: ["white", "black"],
      default: "white",
    },

    moves: { type: [MoveSchema], default: [] },

    currentFEN: {
      type: String,
      required: true,
      default: "startpos",
    },

    whiteTimeMs: {
      type: Number,
      default: null,
    },

    blackTimeMs: {
      type: Number,
      default: null,
    },

    gameType: {
      type: String,
      enum: ["bullet", "blitz", "rapid", "classical"],
      default: "blitz",
    },

    incrementMs: {
      type: Number,
      default: 0,
    },

    startedAt: { type: Date, default: Date.now },
    finishedAt: { type: Date, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Game = models.Game || model("Game", GameSchema);
