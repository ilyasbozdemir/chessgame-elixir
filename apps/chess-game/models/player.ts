import mongoose, { Schema, models } from "mongoose";

const PlayerSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, default: null },
    isReady: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const Player =
  models.Player || mongoose.model("Player", PlayerSchema);
