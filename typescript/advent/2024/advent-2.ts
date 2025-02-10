/*
--- Day 2: Red-Nosed Reports ---

Fortunately the first location The Historians want to search isn't a long walk from the Chief Historian's office.

While the Red-Nosed Reindeer nuclear fusion/fission plant appears to contain no sign of the Chief Historian the engineers there run up to you as soon as they see you. Apparently they still talk about the time Rudolph was saved through molecular synthesis from a single electron.

They're quick to add that - since you're already here - they'd really appreciate your help analyzing some unusual data from the Red-Nosed reactor. You turn to check if The Historians are waiting for you but they seem to have already divided into groups that are currently searching every corner of the facility. You offer to help with the unusual data.

The unusual data (your puzzle input) consists of many reports one report per line. Each report is a list of numbers called levels that are separated by spaces. For example:

7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9

This example data contains six reports each containing five levels.

The engineers are trying to figure out which reports are safe. The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing or gradually decreasing. So a report only counts as safe if both of the following are true:

- The levels are either all increasing or all decreasing.
- Any two adjacent levels differ by at least one and at most three.

In the example above the reports can be found safe or unsafe by checking those rules:

- 7 6 4 2 1: Safe because the levels are all decreasing by 1 or 2.
- 1 2 7 8 9: Unsafe because 2 7 is an increase of 5.
- 9 7 6 2 1: Unsafe because 6 2 is a decrease of 4.
- 1 3 2 4 5: Unsafe because 1 3 is increasing but 3 2 is decreasing.
- 8 6 4 4 1: Unsafe because 4 4 is neither an increase or a decrease.
- 1 3 6 7 9: Safe because the levels are all increasing by 1 2 or 3.

So in this example 2 reports are safe.

Analyze the unusual data from the engineers. How many reports are safe?
*/

export function solve(input: string): number {
  const lines = input.trim().split("\n");
  let safeCount = 0;

  for (const line of lines) {
    const levels = line.split(" ").map(Number);
    if (isSafe(levels)) {
      safeCount++;
    }
  }

  return safeCount;
}

function isSafe(levels: number[]): boolean {
  if (levels.length <= 1) {
    return true; // A report with 0 or 1 level is considered safe
  }

  let increasing = true;
  let decreasing = true;

  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];

    if (diff > 3 || diff < -3) {
      return false; // Difference is too large or too small
    }

    if (diff >= 0) {
      decreasing = false; // Not decreasing
    }

    if (diff <= 0) {
      increasing = false; // Not increasing
    }
  }

  return (
    (increasing || decreasing) &&
    !levels.every((val, i, arr) => i === 0 || val === arr[i - 1])
  );
}

// Read the input file
const input: string = await Bun.file("advent/2024/advent-2-sample.txt").text();

// Solve the problem
const solution = solve(input);

// Print the solution
console.log("Solution:", solution);
