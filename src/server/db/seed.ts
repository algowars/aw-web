import "dotenv/config";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import { z } from "zod";
import { problemStatuses, problemTags, problems, tags } from "./schema";

const problemSeedSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  statusId: z.number().int().positive(),
  markdownFile: z.string().min(1),
  tagIds: z.array(z.number().int().positive()),
});

const problemSeedManifestSchema = z.array(problemSeedSchema);
type ProblemSeed = z.infer<typeof problemSeedSchema>;

const statusSeeds = [
  { id: 1, name: "Accepted" },
  { id: 2, name: "Attempted" },
  { id: 3, name: "Draft" },
];

const tagSeeds = [
  { id: 1, value: "arrays" },
  { id: 2, value: "hash-map" },
  { id: 3, value: "binary-search" },
  { id: 4, value: "sorting" },
];

const currentDir = dirname(fileURLToPath(import.meta.url));
const seedsDir = join(currentDir, "seeds");
const questionsDir = join(currentDir, "seeds", "questions");
const problemsManifestPath = join(seedsDir, "problems.json");

async function readProblemSeeds(): Promise<ProblemSeed[]> {
  const manifestContents = await readFile(problemsManifestPath, "utf8");
  const parsedManifest: unknown = JSON.parse(manifestContents);
  return problemSeedManifestSchema.parse(parsedManifest);
}

async function readQuestionMarkdown(markdownFile: string) {
  const questionPath = join(questionsDir, markdownFile);
  return readFile(questionPath, "utf8");
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("DATABASE_URL not found on .env");

const main = async () => {
  const client = postgres(connectionString);
  const db = drizzle(client);
  const problemSeeds = await readProblemSeeds();

  const problemValues = await Promise.all(
    problemSeeds.map(async (problem) => ({
      id: problem.id,
      title: problem.title,
      statusId: problem.statusId,
      question: await readQuestionMarkdown(problem.markdownFile),
    })),
  );

  const problemTagValues = problemSeeds.flatMap((problem) =>
    problem.tagIds.map((tagId) => ({
      problemId: problem.id,
      tagId,
    })),
  );

  console.log("Seed start");

  await db
    .insert(problemStatuses)
    .values(statusSeeds)
    .onConflictDoUpdate({
      target: problemStatuses.id,
      set: {
        name: sql`excluded.name`,
      },
    });

  await db
    .insert(tags)
    .values(tagSeeds)
    .onConflictDoUpdate({
      target: tags.id,
      set: {
        value: sql`excluded.value`,
      },
    });

  await db
    .insert(problems)
    .values(problemValues)
    .onConflictDoUpdate({
      target: problems.id,
      set: {
        title: sql`excluded.title`,
        question: sql`excluded.question`,
        statusId: sql`excluded."statusId"`,
      },
    });

  if (problemTagValues.length > 0) {
    await db.insert(problemTags).values(problemTagValues).onConflictDoNothing();
  }

  console.log(`Seeded ${statusSeeds.length} statuses`);
  console.log(`Seeded ${tagSeeds.length} tags`);
  console.log(`Seeded ${problemValues.length} problems`);
  console.log(`Seeded ${problemTagValues.length} problem tag links`);
  console.log("Seed completed");

  await client.end();
};

void main();
