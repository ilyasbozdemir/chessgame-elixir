"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";
import { hashPassword, verifyPassword } from "@/utils/password";
import { signToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { Logger } from "@/lib/utils";

const logger = new Logger("ChessGame-AuthActions");

export async function registerAction(data: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  await connectToDatabase();

  const { name, username, email, password } = data;

  const existingEmail = await User.findOne({ email });
  if (existingEmail) throw new Error("Bu e-posta zaten kayıtlı");

  const existingUsername = await User.findOne({ username });
  if (existingUsername) throw new Error("Bu kullanıcı adı zaten alınmış");

  const passwordHash = await hashPassword(password);

  const newUser = await User.create({
    username,
    displayName: name,
    email,
    passwordHash,
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

  logger.success("✅ Kayıt başarılı:", newUser.username);

  return { user: JSON.parse(JSON.stringify(newUser)), token };
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
