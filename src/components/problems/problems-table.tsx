"use client";

import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { routerConfig } from "@/router-config";

type ProblemsTableItem = {
  id: string;
  title: string;
  tags: string[];
};

type ProblemsTableProps = {
  problems: ProblemsTableItem[];
};

export function ProblemsTable({ problems }: ProblemsTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Tags</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {problems.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={2}
              className="text-muted-foreground py-6 text-center"
            >
              No problems found.
            </TableCell>
          </TableRow>
        ) : (
          problems.map((problem) => (
            <TableRow
              key={problem.id}
              data-cy="problem-item"
              className="cursor-pointer"
              onClick={() =>
                router.push(routerConfig.problems.execute({ id: problem.id }))
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  router.push(
                    routerConfig.problems.execute({ id: problem.id }),
                  );
                }
              }}
              role="button"
              tabIndex={0}
            >
              <TableCell className="font-medium">{problem.title}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.length === 0 ? (
                    <span className="text-muted-foreground">-</span>
                  ) : (
                    problem.tags.map((tag) => (
                      <span
                        key={`${problem.id}-${tag}`}
                        className="bg-muted inline-flex rounded-md px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
