import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },

    username: { type: String, required: true, unique: true, index: true },

    displayName: { type: String, trim: true },

    email: { type: String, required: true, unique: true, index: true },

    passwordHash: { type: String, required: true },

    avatarUrl: { type: String, default: null },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },

    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: true }
);

export const User = models.User || mongoose.model("User", UserSchema);

export type UserDoc = mongoose.InferSchemaType<typeof UserSchema>;
