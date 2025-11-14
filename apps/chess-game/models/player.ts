import mongoose, { Schema, models } from "mongoose";

const PlayerSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },

    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: true }
);

export const Player = models.Player || mongoose.model("Player", PlayerSchema);

export type PlayerDoc = mongoose.InferSchemaType<typeof PlayerSchema> 