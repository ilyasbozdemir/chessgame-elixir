import mongoose, { Schema, models } from "mongoose";

const RatingSchema = new Schema(
  {
    // FIDE
    fideClassical: { type: Number, default: null },
    fideRapid: { type: Number, default: null },
    fideBlitz: { type: Number, default: null },

    // National (TSF UKD vs.)
    nationalRating: { type: Number, default: null },

    // Chess.com
    chessComBlitz: { type: Number, default: null },
    chessComRapid: { type: Number, default: null },
    chessComBullet: { type: Number, default: null },
    chessComDaily: { type: Number, default: null },

    // Lichess
    lichessBlitz: { type: Number, default: null },
    lichessRapid: { type: Number, default: null },
    lichessClassical: { type: Number, default: null },
    lichessBullet: { type: Number, default: null },

    // Peak & Performance
    peakRating: { type: Number, default: null },
    performanceRating: { type: Number, default: null },

    // Title
    title: {
      type: String,
      enum: ["GM", "IM", "FM", "CM", "WGM", "WIM", "WFM", "WCM", null],
      default: null,
    },
  },
  { _id: false }
);

const PlayerSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },

    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    rating: { type: RatingSchema, default: {} },

    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: true }
);

export const Player = models.Player || mongoose.model("Player", PlayerSchema);

export type PlayerDoc = mongoose.InferSchemaType<typeof PlayerSchema>;
