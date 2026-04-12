import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import { pgTableCreator } from "drizzle-orm/pg-core";
import postgres from "postgres";

const createTable = pgTableCreator((name) => `ai-madlib-generator-v2_${name}`);

export const featureToggles = createTable("feature_toggles", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  name: d.varchar({ length: 255 }).notNull(),
  isEnabled: d.boolean().notNull().default(false),
  createdAt: d
    .timestamp({ withTimezone: true })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
}));

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("DATABASE_URL not found on .env");

const main = async () => {
  // const client = postgres(connectionString);
  // const db = drizzle(client);
  // const data: (typeof featureToggles.$inferInsert)[] = [
  //   {
  //     name: "pg_moderation",
  //     isEnabled: true,
  //   },
  // ];

  console.log("Seed start");
  // await db
  //   .insert(featureToggles)
  //   .values(data)
  //   .onConflictDoUpdate({
  //     target: featureToggles.name,
  //     set: { isEnabled: sql`excluded."isEnabled"` },
  //   });
  console.log("Seed completed");
  // await client.end();
};

void main();
