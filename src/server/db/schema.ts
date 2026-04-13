import { relations } from "drizzle-orm";
import { pgTableCreator, primaryKey } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `aw-web_${name}`);

export const users = createTable("users", (d) => ({
  id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  sub: d.varchar({ length: 255 }).notNull().unique(),
  name: d.varchar({ length: 255 }),
  email: d.varchar({ length: 255 }).notNull(),
  image: d.varchar({ length: 255 }),
}));

export const problemStatuses = createTable("problem_statuses", (d) => ({
  id: d.integer().notNull().primaryKey(),
  name: d.varchar({ length: 100 }).notNull().unique(),
}));

export const problems = createTable("problems", (d) => ({
  id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: d.varchar({ length: 255 }).notNull().unique(),
  question: d.text().notNull(),
  statusId: d
    .integer()
    .notNull()
    .references(() => problemStatuses.id),
}));

export const problemRelations = relations(problems, ({ one }) => ({
  status: one(problemStatuses, {
    fields: [problems.statusId],
    references: [problemStatuses.id],
  }),
}));

export const tags = createTable("tags", (d) => ({
  id: d.integer().notNull().primaryKey(),
  value: d.varchar({ length: 50 }).notNull().unique(),
}));

export const problemTags = createTable(
  "problem_tags",
  (d) => ({
    problemId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => problems.id),
    tagId: d
      .integer()
      .notNull()
      .references(() => tags.id),
  }),
  (t) => [primaryKey({ columns: [t.problemId, t.tagId] })],
);

export const problemsToTagsRelations = relations(problemTags, ({ one }) => ({
  problem: one(problems, {
    fields: [problemTags.problemId],
    references: [problems.id],
  }),
  tag: one(tags, {
    fields: [problemTags.tagId],
    references: [tags.id],
  }),
}));
