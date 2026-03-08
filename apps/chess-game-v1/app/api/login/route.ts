import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";
import { hashPassword } from "@/utils/password";

export async function POST(req: Request) {
  await connectToDatabase();

  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json(
      { error: "Eksik alanlar var" },
      { status: 400 }
    );
  }

  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) {
    return NextResponse.json(
      { error: "Bu email veya kullanıcı adı zaten kayıtlı" },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);

  const user = await User.create({
    username,
    email,
    passwordHash,
  });

  const jsonUser = JSON.parse(JSON.stringify(user));

  const res = NextResponse.json(
    { user: { _id: jsonUser._id, username, email } },
    { status: 201 }
  );

  // ✅ Session cookie
  res.headers.append(
    "Set-Cookie",
    `userId=${jsonUser._id}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`
  );

  return res;
}
