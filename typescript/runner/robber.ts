function robRecurse(input: number[], lastIndex: number): number {
  if (lastIndex >= input.length) {
    return 0;
  }

  const skipOneValue = robRecurse(input, lastIndex + 2);
  const skipTwoValue = robRecurse(input, lastIndex + 3);

  return input[lastIndex] + Math.max(skipOneValue, skipTwoValue);
}

function rob(input: number[]): number {
  return Math.max(robRecurse(input, 0), robRecurse(input, 1));
}

function test(input: number[]) {
  console.log(`Result:${input}:${rob(input)}`);
}

export function main() {
  // test([])
  // test([1])
  test([1, 2, 3, 22, 5, 6, 7, 0]);
}
