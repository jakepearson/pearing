function isOffByOne(input: string) {
  const map = new Map<string, number>()
  for (let c of input) {
    const currentCount = map.get(c) || 0
    map.set(c, currentCount + 1)
  }
  let totalDoubles = 0
  for (let key of map.keys()) {
    const count = map.get(key)
    if (count === 2) {
      totalDoubles++
    }
  }
  return totalDoubles === 1
}

function offByOne(input: string, n: number): string[] {
  const result: string[] = []
  for (let i = 0; i < input.length - n + 1; i++) {
    const sub = input.substr(i, n)
    if (isOffByOne(sub)) {
      result.push(sub)
    }
  }
  return result
}

export function main() {
  console.log(offByOne('democracy', 5))
}