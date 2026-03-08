"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";

export async function getUserByIdAction(userId: string) {
  await connectToDatabase();
  const user = await User.findById(userId);
  if (!user) return null;
  return {
    id: user._id.toString(),
    username: user.username,
    displayName: user.displayName,
  };
}
