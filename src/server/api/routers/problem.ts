import { z } from "zod";

import { getProblemsPageable } from "@/server/services/problem-service";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const problemRouter = createTRPCRouter({
  getProblemsPageable: publicProcedure
    .input(
      z.object({
        page: z.number().int().min(1),
        pageSize: z.number().int().min(1).max(100),
      }),
    )
    .query(async ({ ctx, input }) => {
      return getProblemsPageable(ctx.db, input);
    }),
});
