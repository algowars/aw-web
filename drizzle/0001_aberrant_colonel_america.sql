CREATE TABLE "aw-web_problem_statuses" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "aw-web_problem_statuses_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "aw-web_problem_tags" (
	"problemId" varchar(255) NOT NULL,
	"tagId" integer NOT NULL,
	CONSTRAINT "aw-web_problem_tags_problemId_tagId_pk" PRIMARY KEY("problemId","tagId")
);
--> statement-breakpoint
CREATE TABLE "aw-web_problems" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"question" text NOT NULL,
	"statusId" integer NOT NULL,
	CONSTRAINT "aw-web_problems_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "aw-web_tags" (
	"id" integer PRIMARY KEY NOT NULL,
	"value" varchar(50) NOT NULL,
	CONSTRAINT "aw-web_tags_value_unique" UNIQUE("value")
);
--> statement-breakpoint
CREATE TABLE "aw-web_users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"sub" varchar(255) NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"image" varchar(255),
	CONSTRAINT "aw-web_users_sub_unique" UNIQUE("sub")
);
--> statement-breakpoint
DROP TABLE "aw-web_post" CASCADE;--> statement-breakpoint
DROP TABLE "aw-web_user" CASCADE;--> statement-breakpoint
ALTER TABLE "aw-web_problem_tags" ADD CONSTRAINT "aw-web_problem_tags_problemId_aw-web_problems_id_fk" FOREIGN KEY ("problemId") REFERENCES "public"."aw-web_problems"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "aw-web_problem_tags" ADD CONSTRAINT "aw-web_problem_tags_tagId_aw-web_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."aw-web_tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "aw-web_problems" ADD CONSTRAINT "aw-web_problems_statusId_aw-web_problem_statuses_id_fk" FOREIGN KEY ("statusId") REFERENCES "public"."aw-web_problem_statuses"("id") ON DELETE no action ON UPDATE no action;