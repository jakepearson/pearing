function findPonds(input: string): number[] {
  const land = parseLand(input)
  const cache = new Set<string>()
  const result: number[] = []
  for (var y = 0; y < land.Width; y++) {
    const row = land.Land[y]
    for (var x = 0; x < row.length; x++) {
      const size = pondRecurse(land, x, y, cache)
      if (size > 0) {
        result.push(size)
      }
    }
  }
  return result
}

function pondRecurse(land: Land, x: number, y: number, cache: Set<string>): number {
  const key = `(${x},${y})`
  if (cache.has(key)) {
    return 0;
  }
  cache.add(key)
  let count = 0
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      const nextX = x+i
      const nextY = y+i
      if(nextX >= 0 && nextX < land.Width && nextY >= 0 && nextY < land.Height) {
        count += pondRecurse(land, nextX, nextY, cache)
      }
    }
  }
  return count
}

interface Land {
  Land: number[][]
  Width: number
  Height: number
}

function parseLand(input: string): Land {
  const rows = input.trim().split('\n')
  const result: number[][] = []
  rows.forEach(r => result
    .push(r.trim().split(' ')
      .map(s => parseInt(s))))
  return {
    Land: result,
    Width: rows[0].length,
    Height: rows.length
  }
}

export function main() {
  const input = `
    0 2 1 0
    0 1 0 1
    1 1 0 1
    0 1 0 1`
  console.log(parseLand(input))
  console.log(findPonds(input))
}