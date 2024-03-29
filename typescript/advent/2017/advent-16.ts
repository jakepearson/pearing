/* eslint-disable no-param-reassign */
import * as util from '../util';

function spin(programs: string[], distance: number) {
  for (let i = 0; i < distance; i++) {
    programs.unshift(programs.pop());
  }
}

function exchange(programs: string[], positionA: number, positionB: number) {
  const temp = programs[positionA];
  programs[positionA] = programs[positionB];
  programs[positionB] = temp;
}

function partner(program: string[], programA: string, programB: string) {
  exchange(program, program.indexOf(programA), program.indexOf(programB));
}

function process(program: string[], instruction: string) {
  const operands = instruction.substring(1).split('/');
  switch (instruction[0]) {
    case 's': return spin(program, parseInt(operands[0], 10));
    case 'x': return exchange(program, parseInt(operands[0], 10), parseInt(operands[1], 10));
    case 'p': return partner(program, operands[0], operands[1]);
    default: throw new Error('Unknown Instruction');
  }
}

function execute(state: string, instructions: string): string {
  const programs = state.split('');
  instructions.split(',').forEach((instruction) => process(programs, instruction));
  return programs.join('');
}

type Test = {
  input: string;
  defaultState: string;
}

const littleInput: Test = {
  input: 's1,x3/4,pe/b',
  defaultState: 'abdce',
};
const bigInput: Test = {
  input: util.read('advent/advent-16.txt'),
  defaultState: 'abcdefghijklmnop',
};

export function main() {
  let state = bigInput.defaultState;
  const oldValues = new Map<string, number>();
  for (let i = 0; i < 28; i++) {
    state = execute(state, bigInput.input);
    if (oldValues.has(state)) {
      console.log(`Found a loop: ${state},${i},${oldValues.get(state)}`);
      break;
    }
    oldValues.set(state, i);
  }
  console.log(state);
  console.log((1000 ** 3) % 36);
}
