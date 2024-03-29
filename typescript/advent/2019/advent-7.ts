import * as util from '../util';
import * as intcode from './intcode';

const smallInput = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0';
const small2 = '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0';
const small3 = '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0';
const bigInput = util.read(`${__dirname}/advent-2.txt`);

function getAllPermutations(input: string): string[] {
  const results: string[] = [];

  if (input.length === 1) {
    results.push(input);
    return results;
  }

  for (let i = 0; i < input.length; i++) {
    const firstChar = input[i];
    const charsLeft = input.substring(0, i) + input.substring(i + 1);
    const innerPermutations = getAllPermutations(charsLeft);
    for (let j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

export function amplify(program: string, phases: string): number {
  const phaseNumbers = [...phases].map((l) => Number.parseInt(l, 10));
  let secondInput = 0;
  phaseNumbers.forEach((input) => {
    const io = new intcode.SimpleInputOutput();
    io.inputData = [input, secondInput];
    const output = intcode.run(program.split(',').map((n) => Number.parseInt(n, 10)), io);
    [secondInput] = io.outputData;
  });
  return secondInput;
}

export function superAmplify(program: string, phases: string): number {
  const phaseNumbers = [...phases].map((l) => Number.parseInt(l, 10));
  const secondInput = 0;
  const halts = 0;

  while (halts < phaseNumbers.length) {
    // const io = new intcode.SimpleInputOutput()
    // io.inputData = [input, secondInput]
    // const output = intcode.run(program.split(",").map(n => Number.parseInt(n)), io)
    // secondInput = io.outputData[0]
  }

  return secondInput;
}

export function main() {
  let max = 0;
  getAllPermutations('01234').forEach((p) => {
    const result = amplify(bigInput, p);
    if (result > max) {
      max = result;
    }
  });
  console.log(max);
}
