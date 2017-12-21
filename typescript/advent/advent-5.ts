import * as fs from 'fs';

function jumper(input: number[]): number {
  var index = 0
  var jumps = 0
  while (index >= 0 && index < input.length) {
    var lastIndex = index;
    //console.log(index + " [" + input + "]")
    index += input[index];
    jumps++
    if (input[lastIndex] >= 3) {
      input[lastIndex]--
    } else {
      input[lastIndex]++
    }
  }
  return jumps
}

const bigInput = fs.readFileSync('advent/advent-5.txt', 'utf8').split('\n').map(line => parseInt(line))

export function main() {
  const input = [0, 3, 0, 1, -3]
  console.log("Result: " + jumper(bigInput))
  //console.log("Result: " + jumper(input))
}