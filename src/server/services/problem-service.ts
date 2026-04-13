import { eq, inArray, sql } from "drizzle-orm";

import type { PageRequest, PageResult } from "@/common/pagination/page-request";
import {
  type ProblemStatus,
  toProblemStatus,
} from "@/common/problem/problem-status";
import { type db as database } from "@/server/db";
import { problemTags, problems, tags } from "@/server/db/schema";

type PageableProblem = typeof problems.$inferSelect & {
  status: ProblemStatus;
  tags: string[];
};

type ProblemDetails = typeof problems.$inferSelect & {
  status: ProblemStatus;
  tags: string[];
};

export async function getProblemsPageable(
  db: typeof database,
  pageRequest: PageRequest,
): Promise<PageResult<PageableProblem>> {
  const offset = (pageRequest.page - 1) * pageRequest.pageSize;

  const problemRows = await db.query.problems.findMany({
    offset,
    limit: pageRequest.pageSize,
    orderBy: (problems, { asc }) => [asc(problems.title)],
  });

  const problemIds = problemRows.map((problem) => problem.id);
  const tagsByProblemId = new Map<string, string[]>();

  if (problemIds.length > 0) {
    const problemTagRows = await db
      .select({
        problemId: problemTags.problemId,
        tagValue: tags.value,
      })
      .from(problemTags)
      .innerJoin(tags, eq(problemTags.tagId, tags.id))
      .where(inArray(problemTags.problemId, problemIds));

    for (const row of problemTagRows) {
      const currentTags = tagsByProblemId.get(row.problemId) ?? [];
      currentTags.push(row.tagValue);
      tagsByProblemId.set(row.problemId, currentTags);
    }
  }

  const items = problemRows.map((problem) => ({
    ...problem,
    status: toProblemStatus(problem.statusId),
    tags: tagsByProblemId.get(problem.id) ?? [],
  }));

  const [countResult] = await db
    .select({ totalItems: sql<number>`count(*)::int` })
    .from(problems);

  return {
    items,
    page: pageRequest.page,
    pageSize: pageRequest.pageSize,
    totalItems: countResult?.totalItems ?? 0,
  };
}

export async function executeProblem(
  db: typeof database,
  id: string,
): Promise<ProblemDetails | null> {
  const problem = await db.query.problems.findFirst({
    where: (problems, { eq }) => eq(problems.id, id),
  });

  if (!problem) {
    return null;
  }

  const problemTagRows = await db
    .select({
      tagValue: tags.value,
    })
    .from(problemTags)
    .innerJoin(tags, eq(problemTags.tagId, tags.id))
    .where(eq(problemTags.problemId, id));

  return {
    ...problem,
    status: toProblemStatus(problem.statusId),
    tags: problemTagRows.map((row) => row.tagValue),
  };
}
