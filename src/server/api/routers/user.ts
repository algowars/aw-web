import { users } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  syncFromLogin: protectedProcedure.mutation(async ({ ctx }) => {
    const { sub, email, name, image } = ctx.session.user;

    const [user] = await ctx.db
      .insert(users)
      .values({
        sub,
        email: email ?? "",
        name,
        image,
      })
      .onConflictDoUpdate({
        target: users.sub,
        set: {
          email: email ?? "",
          name,
          image,
        },
      })
      .returning();

    return user;
  }),

  getBySub: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.sub, ctx.session.user.sub),
    });
  }),
});
