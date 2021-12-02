/* eslint-disable no-param-reassign */
const smallInput = '0-2-7-0';
const bigInput = '4-10-4-1-8-4-9-14-5-1-14-15-0-15-3-5';

function largestBank(input: number[]): number {
  let result = 0;
  let biggest = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < input.length; i++) {
    if (input[i] > biggest) {
      biggest = input[i];
      result = i;
    }
  }
  return result;
}

function redistribute(input: number[]): number[] {
  const biggestBank = largestBank(input);
  const bankSize = input[biggestBank];
  input[biggestBank] = 0;
  for (let i = 0; i < bankSize; i++) {
    const currentBank = (i + 1 + biggestBank) % input.length;
    input[currentBank]++;
  }
  return input;
}

export function main() {
  let input = bigInput.split('-').map((s) => parseInt(s));
  const previousResults = new Map<string, number>();
  let nextValue = input.join('-');
  let counter = 0;
  while (!previousResults.has(nextValue)) {
    // console.log(input)
    input = redistribute(input);
    if (!previousResults.has(nextValue)) {
      previousResults.set(nextValue, counter);
    }
    nextValue = input.join('-');
    counter++;
  }
  console.log(counter);
  console.log(counter - previousResults.get(nextValue));
}
