import mongoose from "mongoose";

const MONGODB_URI = "mongodb://admin:secret@localhost:27017/chess_db";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log("🟢 [MongoDB] Mevcut bağlantı kullanılıyor");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🟡 [MongoDB] Yeni bağlantı başlatılıyor:", MONGODB_URI);

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "chess_db",
        bufferCommands: false,
        authSource: "admin",
      })
      .then((mongooseInstance) => {
        console.log("✅ [MongoDB] Bağlantı başarılı!");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ [MongoDB] Bağlantı hatası:", err.message);
        throw err; // önemli: hatayı fırlatmazsak route catch edemez
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
