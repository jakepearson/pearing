import * as util from '../util';

const sample = util.read(`${__dirname}/advent-1-sample.txt`);
const real = util.read(`${__dirname}/advent-1.txt`);

interface Group {
  numbers: number[];
  total: number;
}

export function main() {
  const groups: Group[] = [];
  let group: Group = { numbers: [], total: 0 };
  real.split('\n').forEach((line) => {
    if (line === '') {
      groups.push(group);
      group = { numbers: [], total: 0 };
    } else {
      const calories = parseInt(line, 10);
      group.numbers.push(calories);
      group.total += calories;
    }
  });
  groups.push(group);

  let total = 0;
  groups.map((g) => g.total).sort((a, b) => b - a).slice(0, 3).forEach((g) => { total += g; });
  console.log(total);
}
