import { match } from 'assert';
import * as util from '../util';

const sample = '1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc';
const real = util.read(`${__dirname}/advent-2.txt`);

function validPassword(entry: string): boolean {
  try {
    const entryParts = entry.split(' ');
    const countParts = entryParts[0].split('-');
    const index1 = parseInt(countParts[0], 10) - 1;
    const index2 = parseInt(countParts[1], 10) - 1;
    const letter = entryParts[1][0];
    const password = entryParts[2];

    const match1 = password[index1] === letter ? 1 : 0;
    const match2 = password[index2] === letter ? 1 : 0;
    return match1 + match2 === 1;
  } catch (e) {
    console.log(`Entry: ${entry}`);
    throw e;
  }
}

export function main() {
  const numbers = real.split('\n').filter((l) => l.length > 0).filter(validPassword);
  console.log(numbers.length);
}
