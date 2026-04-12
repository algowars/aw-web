ALTER TABLE "aw-web_account" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "aw-web_session" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "aw-web_verification_token" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "aw-web_account" CASCADE;--> statement-breakpoint
DROP TABLE "aw-web_session" CASCADE;--> statement-breakpoint
DROP TABLE "aw-web_verification_token" CASCADE;--> statement-breakpoint
ALTER TABLE "aw-web_user" ADD COLUMN "sub" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "aw-web_user" DROP COLUMN "emailVerified";--> statement-breakpoint
ALTER TABLE "aw-web_user" ADD CONSTRAINT "aw-web_user_sub_unique" UNIQUE("sub");