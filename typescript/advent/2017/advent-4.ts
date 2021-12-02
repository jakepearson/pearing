import * as util from '../util';

type Case = {
  input: string;
  expected: boolean;
}

const cases: Case[] = [
  { input: 'aa bb cc dd ee', expected: true },
  { input: 'aa bb cc dd aa', expected: false },
];

const bigInput = util.read('advent/advent-4.txt');

function valid(input: string): boolean {
  const words = input.split(' ');
  const holder = new Set<string>();

  for (let word of words) {
    word = word.split('').sort().join('');
    if (holder.has(word)) {
      return false;
    }
    holder.add(word);
  }
  return true;
}

export function main() {
  // cases.forEach(c => {
  //   const result = valid(c.input);
  //   const success = result === c.expected ? "Good" : "Bad ";
  //   console.log(success + ": " + c.input + ", wanted: " + c.expected + " but was: " + result)
  // })
  const result = bigInput.split(util.delimiter).filter((line) => valid(line)).length;
  console.log(`Length: ${result}`);
}
