import * as util from '../util';

const sample = '1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc';
const real = util.read(`${__dirname}/advent-2.txt`);

function countLetter(letter: string, password: string): number {
  return password.split(letter).length - 1;
}

function validPassword(entry: string): boolean {
  try {
    const entryParts = entry.split(' ');
    const countParts = entryParts[0].split('-');
    const minCount = parseInt(countParts[0], 10);
    const maxCount = parseInt(countParts[1], 10);
    const letter = entryParts[1][0];
    const password = entryParts[2];
    const count = countLetter(letter, password);

    return count >= minCount && count <= maxCount;
  } catch (e) {
    console.log(`Entry: ${entry}`);
    throw e;
  }
}

export function main() {
  const numbers = real.split('\n').filter((l) => l.length > 0).filter(validPassword);
  console.log(numbers.length);
}
