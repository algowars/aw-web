import { type db as database } from "@/server/db";
import { users } from "../db/schema";

export async function upsertUser(
  db: typeof database,
  userProps: Partial<typeof users.$inferSelect> & {
    sub: string;
    email: string;
  },
) {
  const [user] = await db
    .insert(users)
    .values({
      ...userProps,
      email: userProps.email,
    })
    .onConflictDoUpdate({
      target: users.sub,
      set: {
        email: userProps.email,
        name: userProps.name,
        image: userProps.image,
      },
    })
    .returning();

  return user;
}

export async function getUserBySub(db: typeof database, sub: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.sub, sub),
  });
}
