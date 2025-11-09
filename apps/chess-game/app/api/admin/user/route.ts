// app/api/admin/user/route.ts
import { NextResponse } from "next/server";
import { User } from "@/models/user";
import { hashPassword } from "@/utils/password";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectToDatabase();

  const body = await req.json();
  const { username, email, password } = body;

  if (!username || !email || !password) {
    return NextResponse.json({ error: "Eksik alanlar var" }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { error: "Bu e-posta zaten kayıtlı" },
      { status: 400 }
    );
  }

  const passwordHash = await hashPassword(password);

  const newAdmin = await User.create({
    username,
    email,
    passwordHash,
    role: "admin",
  });

  return NextResponse.json({
    success: true,
    message: "Yeni admin oluşturuldu",
    user: {
      id: newAdmin._id,
      username: newAdmin.username,
      email: newAdmin.email,
      role: newAdmin.role,
    },
  });
}

export async function GET() {
  await connectToDatabase();

  const users = await User.find().select("-passwordHash");
  return NextResponse.json({ users });
}
