"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";
import { hashPassword, verifyPassword } from "@/utils/password";
import { signToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { Logger } from "@/lib/utils";
import { Player } from "@/models/player";

const logger = new Logger("ChessGame-AuthActions");

export interface RegisterResult {
  success: boolean;
  user: {
    id: string;
    username: string;
    displayName: string;
    email: string;
  } | null;
  player: {
    id: string;
    userId: string;
  } | null;
  token: string | null;
  error?: string;
}

export async function registerAction(data: {
  name: string;
  username: string;
  email: string;
  password: string;
}): Promise<RegisterResult> {
  await connectToDatabase();

  const { name, username, email, password } = data;

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    return {
      success: false,
      user: null,
      player: null,
      token: null,
      error: "Bu e-posta zaten kayıtlı",
    };
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return {
      success: false,
      user: null,
      player: null,
      token: null,
      error: "Bu kullanıcı adı zaten alınmış",
    };
  }

  const passwordHash = await hashPassword(password);

  const newUser = await User.create({
    username,
    displayName: name,
    email,
    passwordHash,
  });

  const newPlayer = await Player.create({
    userId: newUser._id,
    rating: 1200,
    status: "idle",
    tableId: null,
  });

  const token = signToken({ userId: newUser._id });

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  logger.success("👤 Yeni kullanıcı oluşturuldu:", {
    id: newUser._id.toString(),
    username: newUser.username,
    email: newUser.email,
  });

  logger.success("🎮 Oyuncu profili oluşturuldu:", {
    playerId: newPlayer._id.toString(),
    userId: newPlayer.userId.toString(),
  });

  return {
    success: true,
    user: {
      id: newUser._id.toString(),
      username: newUser.username,
      displayName: newUser.displayName,
      email: newUser.email,
    },
    player: {
      id: newPlayer._id.toString(),
      userId: newUser._id.toString(),
    },
    token,
  };
}

export async function loginAction(email: string, password: string) {
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) throw new Error("Kullanıcı bulunamadı");

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) throw new Error("Hatalı şifre");

  const token = signToken({ userId: user._id });

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  logger.success("✅ Giriş başarılı:", user.username);

  return { user, token };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  logger.info("🔐 Çıkış yapıldı");
  return { ok: true };
}
