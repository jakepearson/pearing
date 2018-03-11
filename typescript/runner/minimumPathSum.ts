function minPathSum(
  grid: number[][],
  x: number = 0,
  y: number = 0,
  cache: Map<string, number> = new Map<string, number>()): number {
  const key = x + ":" + y
  const maxX = grid[0].length
  const maxY = grid.length
  if (cache.has(key)) {
    return cache.get(key)
  }

  let down = Number.MAX_SAFE_INTEGER
  let right = Number.MAX_SAFE_INTEGER

  if (x + 1 < maxX) {
    right = minPathSum(grid, x + 1, y, cache)
  }
  if (y + 1 < maxY) {
    down = minPathSum(grid, x, y + 1, cache)
  }
  let result = grid[y][x]
  const min = Math.min(right, down)
  if (min != Number.MAX_SAFE_INTEGER) {
    result += min
  }
  cache.set(key, result)
  return result
}

function test(grid: number[][], expected: number) {
  const result = minPathSum(grid)
  console.log((result === expected) + ":" + result + ":" + expected)
}

export function main() {
  const grid1 =
    [[1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]]

  const grid2 =
    [[1, 3],
    [5, 7]]

  test(grid2, 11)
  test(grid1, 7)
}