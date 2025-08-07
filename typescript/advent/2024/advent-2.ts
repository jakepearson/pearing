import * as util from "../util";

const sample = util.read(`${__dirname}/advent-2-sample.txt`);
const real = util.read(`${__dirname}/advent-2.txt`);

function parse(file: string): number[][] {
  return file.split("\n").map(line => {
    const trimmed = line.trim();
    if (trimmed === "") {
      return [];
    }
    const parts = trimmed.split(/\s+/);
    return parts.map(s => parseInt(s, 10));
  }).filter(report => {
    return report.length > 0 && !report.some(isNaN);
  });
}

function isSafe(levels: number[]): boolean {
  if (levels.length < 2) {
    return true;
  }

  const firstDiff = levels[1] - levels[0];
  if (firstDiff === 0) {
    return false;
  }
  const isIncreasing = firstDiff > 0;

  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];

    if (isIncreasing) {
      if (diff <= 0) return false; // Must be increasing
    } else {
      if (diff >= 0) return false; // Must be decreasing
    }

    const absDiff = Math.abs(diff);
    if (absDiff < 1 || absDiff > 3) {
      return false; // Difference out of range
    }
  }

  return true;
}

function part1(useSample: boolean): number {
  const reports = parse(useSample ? sample : real);
  return reports.filter(isSafe).length;
}

function part2(useSample: boolean): number {
  const reports = parse(useSample ? sample : real);
  let safeCount = 0;

  for (const report of reports) {
    if (isSafe(report)) {
      safeCount++;
      continue;
    }

    let foundSafeWithDampener = false;
    for (let i = 0; i < report.length; i++) {
      const dampenedReport = [...report.slice(0, i), ...report.slice(i + 1)];
      if (isSafe(dampenedReport)) {
        foundSafeWithDampener = true;
        break;
      }
    }

    if (foundSafeWithDampener) {
      safeCount++;
    }
  }

  return safeCount;
}

export function main() {
  console.log("Part 1 (sample):", part1(true));
  console.log("Part 1 (real):", part1(false));
  console.log("Part 2 (sample):", part2(true));
  console.log("Part 2 (real):", part2(false));
}
