import * as util from '../util';

const sample = '1721\n979\n366\n299\n675\n1456';
const real = util.read(`${__dirname}/advent-1.txt`);

function find(numbers: number[]): number {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i; j < numbers.length; j++) {
      for (let k = j; k < numbers.length; k++) {
        if (numbers[i] + numbers[j] + numbers[k] === 2020) {
          return numbers[i] * numbers[j] * numbers[k];
        }
      }
    }
  }
  throw new Error('Never get here');
}

export function main() {
  const numbers = real.split('\n').map((l) => parseInt(l, 10));
  console.log(find(numbers));
}
