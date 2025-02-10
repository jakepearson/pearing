import { parse } from "path";
import * as util from "../util";

const sample = util.read(`${__dirname}/advent-1-sample.txt`);
const real = util.read(`${__dirname}/advent-1.txt`);

interface Data {
  left: number[];
  right: number[];
  sum: number;
}

function read(useSample: boolean): Data {
  const left: number[] = [];
  const right: number[] = [];

  const file = useSample ? sample : real;
  file.split("\n").forEach((line) => {
    const parts = line.split(" ");
    left.push(parseInt(parts[0], 10));
    right.push(parseInt(parts[parts.length - 1], 10));
  });
  left.sort();
  right.sort();
  var sum = 0;
  for (var i = 0; i < left.length; i++) {
    const diff = right[i] - left[i];
    sum += Math.abs(diff);
  }
  return {
    left,
    right,
    sum,
  };
}

export function main() {
  const data = read(false);
  console.log(data.sum);
}
