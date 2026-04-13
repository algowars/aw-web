export enum ProblemStatus {
  Accepted = 1,
  Attempted = 2,
  Draft = 3,
}

const problemStatusMap: Record<number, ProblemStatus> = {
  1: ProblemStatus.Accepted,
  2: ProblemStatus.Attempted,
  3: ProblemStatus.Draft,
};

export function toProblemStatus(statusId: number): ProblemStatus {
  const status = problemStatusMap[statusId];

  if (!status) {
    throw new Error(`Unsupported problem status id: ${statusId}`);
  }

  return status;
}
