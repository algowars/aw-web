import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getUserBySub, upsertUser } from "@/server/services/user-service";

export const userRouter = createTRPCRouter({
  syncFromLogin: protectedProcedure.mutation(async ({ ctx }) => {
    const { sub, email, name, image } = ctx.session.user;

    if (!email) {
      throw new Error("Email is required to sync user data");
    }

    return upsertUser(ctx.db, {
      sub,
      email,
      name,
      image,
    });
  }),

  getBySub: protectedProcedure.query(async ({ ctx }) => {
    return getUserBySub(ctx.db, ctx.session.user.sub);
  }),
});
