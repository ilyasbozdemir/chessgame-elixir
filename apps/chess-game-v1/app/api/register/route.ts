import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";
import { Player } from "@/models/player";
import { Table } from "@/models/table";
import { hashPassword } from "@/utils/password";
import { Logger } from "@/lib/utils";
import { signToken } from "@/utils/jwt";

const logger = new Logger("ChessGame-register-api-route");

export async function POST(req: Request) {
  const body = await req.json();

  console.log("📩 /api/register body:", body);

  const { name, username, email, password } = body;
  await connectToDatabase();

  // 1️⃣ Alan kontrolü
  if (!name || !username || !email || !password) {
    return NextResponse.json(
      { error: "Eksik alanlar mevcut" },
      { status: 400 }
    );
  }

  try {
    // 2️⃣ Email kontrolü
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      logger.warn("⚠️ REGISTER BLOCKED: email already exists:", email);
      return NextResponse.json(
        { error: "Bu e-posta zaten kayıtlı" },
        { status: 400 }
      );
    }

    // 3️⃣ Username kontrolü
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      logger.warn("⚠️ REGISTER BLOCKED: username already taken:", username);
      return NextResponse.json(
        { error: "Bu kullanıcı adı zaten alınmış" },
        { status: 400 }
      );
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
      color: null,
      createdAt: new Date(),
    });

    const token = signToken({ userId: newUser._id });

    const res = NextResponse.json(
      {
        success: true,
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
        token,
      },
      { status: 201 }
    );

    res.headers.append(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Max-Age=${
        60 * 60 * 24 * 30
      }; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`
    );

    return res;
  } catch (err: any) {
    console.error("❌ /api/register error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
