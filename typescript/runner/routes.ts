function uniquePathsRecurse(m: number, n: number, cache: Map<string, number>): number {
  const key = `${m}:${n}`;
  if (cache.has(key)) {
    return cache.get(key);
  }
  let result = 0;
  if (m > 1) {
    result += uniquePathsRecurse(m - 1, n, cache);
  }
  if (n > 1) {
    result += uniquePathsRecurse(m, n - 1, cache);
  }
  if (m > 1 && n > 1) {
    result++;
  }
  cache.set(key, result);
  return result;
}

function uniquePaths(m: number, n: number): number {
  return uniquePathsRecurse(m, n, new Map<string, number>()) + 1;
}

export function main() {
  console.log(uniquePaths(1, 2));
}
