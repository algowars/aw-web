import { notFound } from "next/navigation";

import { api } from "@/trpc/server";

import { ProblemEditorPoc } from "./problem-editor-poc";

type ProblemDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProblemDetailsPage({
  params,
}: ProblemDetailsPageProps) {
  const { id } = await params;
  const problem = await api.problem.getProblemById({ id });

  if (!problem) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="bg-muted inline-flex rounded-md px-2 py-0.5 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 data-cy="problem-title" className="mb-6 text-2xl font-semibold">
        {problem.title}
      </h1>

      <article
        data-cy="problem-question"
        className="prose prose-neutral max-w-none whitespace-pre-wrap"
      >
        {problem.question}
      </article>

      <section className="mt-8 h-[520px]" data-cy="problem-editor-poc">
        <ProblemEditorPoc />
      </section>
    </main>
  );
}
