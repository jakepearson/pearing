import * as fs from 'fs';

type Case = {
  input: string;
  expected: boolean;
}

const cases: Case[] = [
  { input: "aa bb cc dd ee", expected: true },
  { input: "aa bb cc dd aa", expected: false },
]

console.log(process.cwd())
const bigInput = fs.readFileSync('advent/advent-4.txt', 'utf8')

function valid(input: string): boolean {
  const words = input.split(' ');
  const holder = new Set<string>();

  for(var word of words) {
    word = word.split('').sort().join('')
    if(holder.has(word)) {
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
  const result = bigInput.split('\n').filter(line => valid(line)).length
  console.log("Length: " + result)
}