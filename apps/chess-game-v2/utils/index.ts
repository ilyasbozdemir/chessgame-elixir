import { Sensitive, UserBackend } from "./types/security";

export function maskSensitive<T extends Record<string, any>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const isSensitive =
        value && typeof value === "object" && "__sensitive" in value;

      if (isSensitive) {
        return [key, "***MASKED***"];
      }

      return [key, value];
    })
  ) as T;
}


export function stripSensitive<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      return !(value && typeof value === "object" && "__sensitive" in value);
    })
  ) as Partial<T>;
}


export const user: UserBackend = {
  id: "u_123",
  name: "İlyas",
  email: "ilyas@example.com" as Sensitive<string>,
  token: "secret-jwt-token-abc123" as Sensitive<string>,
};

console.log("User (safe log) =>", maskSensitive(user));
