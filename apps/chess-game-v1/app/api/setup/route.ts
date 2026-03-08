import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";
import { hashPassword } from "@/utils/password";

export async function POST(req: Request) {
  await connectToDatabase();

  const body = await req.json();
  const { username, email, password } = body;

  if (!username || !email || !password)
    return NextResponse.json({ error: "Eksik alanlar var" }, { status: 400 });

  const adminExists = await User.findOne({ role: "admin" });
  if (adminExists)
    return NextResponse.json(
      { error: "Zaten bir admin mevcut" },
      { status: 403 }
    );

  const passwordHash = await hashPassword(password);

  const newAdmin = await User.create({
    username,
    email,
    passwordHash,
    role: "admin",
  });

  return NextResponse.json({
    success: true,
    message: "İlk admin başarıyla oluşturuldu",
    user: {
      id: newAdmin._id,
      username: newAdmin.username,
      email: newAdmin.email,
    },
  });
}
