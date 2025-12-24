import { createDb } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
type UserType = {
  name: string;
  email: string;
  password: string;
};

export async function CreateUser(data: UserType, databaseUrl: string) {
  const db = createDb(databaseUrl);
  const [user] = await db
    .insert(users)
    .values({ name: data.name, email: data.email, password: data.password })
    .returning({ id: users.id });
  return user;
}

export async function findUserByEmail(email: string, databaseUrl: string) {
  const db = createDb(databaseUrl);
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return result[0] ?? null;
}
