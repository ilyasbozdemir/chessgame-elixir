// utils/jwt.ts
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret_key_change_me";

export function signToken(
  payload: any,
  expiresIn: string | number = "30d"
): string {
  return jwt.sign(payload, SECRET as string, {
    expiresIn: expiresIn as any, 
  });
}

export function verifyToken<T = any>(token: string): T | null {
  try {
    return jwt.verify(token, SECRET as string) as T;
  } catch {
    return null;
  }
}
