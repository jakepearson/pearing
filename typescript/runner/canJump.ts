function canJump(input: number[], index: number = 0, cache: Map<number, boolean> = new Map<number, boolean>()): boolean {
  if (cache.has(index)) {
    return cache.get(index)
  }
  if (index === input.length - 1) {
    cache.set(index, true)
    return true
  }
  let result = false

  for (let i = 1; i <= input[index]; i++) {
    if (canJump(input, index + i, cache)) {
      result = true
      break
    }
  }
  cache.set(index, result)
  return result
}

export function main() {
  console.log(canJump([2, 3, 1, 1, 4]))
  console.log(canJump([3, 2, 1, 0, 4]))
}