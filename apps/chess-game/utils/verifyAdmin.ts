import { verifyToken } from "@/utils/jwt";
import { User } from "@/models/user";
import { connectToDatabase } from "@/lib/mongodb";

export async function verifyAdmin(req: Request) {
  await connectToDatabase();

  const cookieHeader = req.headers.get("cookie");
  const token = cookieHeader
    ?.split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    if (!decoded?.userId) return null;

    const user = await User.findById(decoded.userId);
    if (!user || user.role !== "admin") return null;

    return user;
  } catch (err) {
    console.error("verifyAdmin error:", err);
    return null;
  }
}
