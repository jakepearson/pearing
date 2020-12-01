import * as fs from 'fs';
import * as util from '../util';

const sample = "1721\n979\n366\n299\n675\n1456";
const real = util.read(`${__dirname}/advent-1.txt`);

function find(numbers: number[]): number {
  for(let i = 0; i<numbers.length; i++) {
    for (let j = i; j<numbers.length; j++) {
      if(numbers[i] + numbers[j] === 2020) {
        return numbers[i] * numbers[j];
      }
    }
  }
}

export function main() {
  const numbers = real.split('\n').map(l => parseInt(l, 10));
  console.log(find(numbers));
}
