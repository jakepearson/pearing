/* eslint-disable no-continue */

interface Point {
  x: number
  y: number
}

function getKey(x: number, y: number): string {
  return `${x}:${y}`;
}

function visitIsland(grid: string[][], visited: Set<string>, startX: number, startY: number) {
  const queue: Point[] = [];
  queue.unshift({ x: startX, y: startY });
  while (queue.length > 0) {
    const point = queue.pop();
    const key = getKey(point.x, point.y);
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);
    if (grid[point.y][point.x] === '0') {
      continue;
    }
    if (point.x - 1 >= 0) {
      queue.unshift({ x: point.x - 1, y: point.y });
    }
    if (point.x + 1 < grid[0].length) {
      queue.unshift({ x: point.x + 1, y: point.y });
    }
    if (point.y - 1 >= 0) {
      queue.unshift({ x: point.x, y: point.y - 1 });
    }
    if (point.y + 1 < grid.length) {
      queue.unshift({ x: point.x, y: point.y + 1 });
    }
  }
}

function numIslands(grid: string[][]): number {
  const visited = new Set<string>();
  let islands = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (!visited.has(getKey(x, y)) && grid[y][x] === '1') {
        visitIsland(grid, visited, x, y);
        islands++;
      }
    }
  }
  return islands;
}

function parseGrid(grid: string): string[][] {
  return grid
    .trim()
    .split('\n')
    .map((s) => s.trim())
    .map((s) => s.split(''));
}

export function main() {
  const grid = `
    11000
    11000
    00100
    00011`;
  console.log(`Islands: ${numIslands(parseGrid(grid))}`);
}
