import * as util from "../util";

const sample = util.read(`${__dirname}/advent-1-sample.txt`);
const real = util.read(`${__dirname}/advent-1.txt`);

export function main() {
  const lines = sample.split("\n");
  const numbers = lines.map((line) => {
    const lineCleaned = line
      .replace("zero", "0")
      .replace("one", "1")
      .replace("two", "2")
      .replace("three", "3")
      .replace("four", "4")
      .replace("five", "5")
      .replace("six", "6")
      .replace("seven", "7")
      .replace("eight", "8")
      .replace("nine", "9");

    const digits = lineCleaned.split("").filter((c) => c >= "0" && c <= "9");
    const first = parseInt(digits[0]) * 10;
    const last = parseInt(digits[digits.length - 1]);
    const result = first + last;
    console.log(`${line} -> ${lineCleaned} -> ${result}`);
    return result;
  });
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  console.log(sum);
}
