import * as fs from 'fs'

const HIGHEST = "HIGHEST_EVER"

function evaluate(left: number, operator: string, right: number): boolean {
  switch (operator) {
    case "<": return left < right
    case ">": return left > right
    case ">=": return left >= right
    case "<=": return left <= right
    case "==": return left === right
    case "!=": return left !== right
    default: throw new Error("Unknown operator: " + operator)
  }
}

function setupRegister(register: string, memory: { [key: string]: number }) {
  if (memory[register] === undefined) {
    memory[register] = 0
  }
}

function processInstruction(instruction: string, memory: { [key: string]: number }) {
  const parts = instruction.split(' ')
  const testRegister = parts[4]
  setupRegister(testRegister, memory)
  const operator = parts[5]
  const testValue = parts[6]
  if (evaluate(memory[testRegister], operator, parseInt(testValue))) {
    const registerToChange = parts[0]
    var value = parseInt(parts[2])
    if (parts[1] === "dec") {
      value *= -1
    }
    setupRegister(registerToChange, memory)
    memory[registerToChange] += value
    const newValue = memory[registerToChange]
    if(newValue > memory[HIGHEST]) {
      memory[HIGHEST] = newValue
    }
  }
}

function largestValue(memory: { [key: string]: number }): number {
  const keys = Object.keys(memory)
  var max = Number.MIN_SAFE_INTEGER
  for (let key of keys) {
    if (memory[key] > max && key !== HIGHEST) {
      max = memory[key]
    }
  }
  return max
}

const littleInput = "b inc 5 if a > 1\n\
a inc 1 if b < 5\n\
c dec -10 if a >= 1\n\
c inc -20 if c == 10"

const bigInput = fs.readFileSync('advent/advent-8.txt', 'utf8')

export function main() {
  const input = bigInput.split('\n');
  const memory: { [key: string]: number } = {}
  memory[HIGHEST] = Number.MIN_SAFE_INTEGER
  input.forEach(instruction => processInstruction(instruction, memory))
  console.log(largestValue(memory))
  console.log(memory[HIGHEST])

}