import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://admin:secret@localhost:27017/chess";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "chess",
      bufferCommands: false,
      authSource: "admin",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
