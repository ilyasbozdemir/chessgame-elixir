import { Schema, Types } from "mongoose";
import { PlayerDoc } from "./player";

// TypeScript tipi (senin dediğin)
export type TablePlayer = PlayerDoc & {
  isReady: boolean;
};

// Mongoose subschema
export const TablePlayerSchema = new Schema(
  {
    id: { type: Types.ObjectId, ref: "Player" },
    name: { type: String, required: true },
    color: { type: String, enum: ["white", "black", null], default: null },
    isReady: { type: Boolean, default: false },
  },
  { _id: false,
    versionKey: false ,timestamps: true

   } // her oyuncuya ekstra _id verme
);
