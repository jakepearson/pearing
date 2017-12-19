import * as fs from 'fs'

function spin(programs: string[], distance: number) {
  for (var i = 0; i < distance; i++) {
    programs.unshift(programs.pop())
  }
}

function exchange(programs: string[], positionA: number, positionB: number) {
  const temp = programs[positionA]
  programs[positionA] = programs[positionB]
  programs[positionB] = temp
}

function partner(program: string[], programA: string, programB: string) {
  exchange(program, program.indexOf(programA), program.indexOf(programB))
}

function process(program: string[], instruction: string) {
  const operands = instruction.substring(1).split('/')
  switch(instruction[0]) {
    case 's': return spin(program, parseInt(operands[0]))
    case 'x': return exchange(program, parseInt(operands[0]), parseInt(operands[1]))
    case 'p': return partner(program, operands[0], operands[1])
    default: throw new Error("Unknown Instruction")
  }
}

function execute(instructions: string): string {
  const programs = "abcdefghijklmnop".split('')
  instructions.split(',').forEach(instruction => process(programs, instruction))
  return programs.join('')
}

const littleInput = "s1,x3/4,pe/b"
const bigInput = fs.readFileSync('advent/advent-16.txt', 'utf8')

export function main() {
  console.log(execute(bigInput))
}