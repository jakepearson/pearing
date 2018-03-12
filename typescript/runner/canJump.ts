function jump(input: number[], index: number = 0, cache: Map<number, number> = new Map<number, number>()): number {
  if (cache.has(index)) {
    return cache.get(index)
  }
  if (index === input.length - 1) {
    cache.set(index, 0)
    return 0
  }
  let result = Number.MAX_SAFE_INTEGER

  for (let i = 1; i <= input[index]; i++) {
    const jumpDistance = jump(input, index + i, cache)
    if (jumpDistance < result) {
      result = jumpDistance
    }
  }
  result++
  cache.set(index, result)
  return result
}

export function main() {
  console.log(jump([1, 1, 1, 1, 1]))
  console.log(jump([2, 3, 1, 1, 4]))
  console.log(jump([3, 2, 1, 0, 4]))
}