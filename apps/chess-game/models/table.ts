import mongoose, { Schema, models } from "mongoose";

const TableSchema = new Schema(
  {
    id: { type: String, required: true }, // app içi masa id'si
    name: { type: String, required: true },
    players: {
      type: [
        {
          id: String,
          name: String,
          color: { type: String, enum: ["white", "black", null], default: null },
          isReady: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
    maxPlayers: { type: Number, default: 2 },
    status: { type: String, enum: ["waiting", "playing", "finished"], default: "waiting" },
    createdAt: { type: Date, default: Date.now },
    ownerId: { type: String, required: false },
    ownerName: { type: String, required: false },
  },
  { versionKey: false }
);

export const Table = models.Table || mongoose.model("Table", TableSchema);
