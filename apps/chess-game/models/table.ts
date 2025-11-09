import mongoose, { Schema, models, Types } from "mongoose";
import { PlayerDoc } from "./player";
import { TablePlayerSchema } from "./table-player";

export type TablePlayer = PlayerDoc & {
  isReady: boolean;
};

const TableSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    players: { type: [TablePlayerSchema], default: [] },
    status: {
      type: String,
      enum: ["waiting", "playing", "finished"],
      default: "waiting",
    },
    createdAt: { type: Date, default: Date.now },
    ownerId: { type: Schema.Types.ObjectId, ref: "Player", required: false },
    ownerName: { type: String, required: false },
  },
  { versionKey: false, timestamps: true }
);

export const Table = models.Table || mongoose.model("Table", TableSchema);

type InferTable = mongoose.InferSchemaType<typeof TableSchema>;

export type TableDoc = Omit<
  InferTable,
  "players" | "_id" | "ownerId" | "ownerName"
> & {
  _id?: Types.ObjectId | null;
  name: string;
  ownerId?: Types.ObjectId | null;
  ownerName?: string | null;
  players?: {
    id: Types.ObjectId | null;
    name: string;
    color: "white" | "black" | null;
    isReady: boolean;
  }[];
};
