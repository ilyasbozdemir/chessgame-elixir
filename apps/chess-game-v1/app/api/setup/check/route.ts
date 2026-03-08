import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";

export async function GET() {
  try {
    await connectToDatabase();
    const adminExists = await User.exists({ role: "admin" });

    return NextResponse.json({ adminExists: !!adminExists });
  } catch (err) {
    console.error("❌ /api/setup/check error:", err);
    return NextResponse.json({ adminExists: false });
  }
}
