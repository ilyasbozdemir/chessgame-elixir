import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Table } from "@/models/table";

export async function GET() {
  try {
    await connectToDatabase();
    const tables = await Table.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(tables, { status: 200 });
  } catch (err: any) {
    console.error("❌ /api/tables error:", err.message);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
