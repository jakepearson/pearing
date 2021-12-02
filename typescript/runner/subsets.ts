function subsets(input: number[], index: number = 0): number[][] {
  if (index >= input.length) {
    return [[]];
  }

  const children = subsets(input, index + 1);
  const result = children.slice();
  const current = input[index];

  for (const child of children) {
    const childWithCurrent = child.slice();
    childWithCurrent.unshift(current);
    result.push(childWithCurrent);
  }

  return result;
}

export function main() {
  console.log(subsets([1, 2, 3, 4]));
}
