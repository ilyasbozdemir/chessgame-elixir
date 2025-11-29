import mongoose, { Schema, models, Types } from "mongoose";

const PoolPlayerSchema = new Schema({
  playerId: { type: Schema.Types.ObjectId, ref: "Player", required: true },
  name: { type: String, required: true },
  desiredMode: { type: String, default: "blitz" },
  joinedAt: { type: Date, default: Date.now },
});

const PoolSchema = new Schema({
  players: { type: [PoolPlayerSchema], default: [] },
});

export const Pool = models.Pool || mongoose.model("Pool", PoolSchema);
export type PoolDoc = mongoose.InferSchemaType<typeof PoolSchema>;
export type PoolPlayer = mongoose.InferSchemaType<typeof PoolPlayerSchema>;