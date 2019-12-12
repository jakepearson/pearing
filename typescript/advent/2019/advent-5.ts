import * as util from '../util'
import * as readline from 'readline-sync'

const smallInput = "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9"
const bigInput = util.read(`${__dirname}/advent-5-2.txt`)

function get(offset: number, mode: string, data: number[]): number {
  if (mode === "0") {
    return data[data[offset]]
  }
  return data[offset]
}

function math(operation: string, offset: number, data: number[], f: (x: number, y: number) => number) {
  const operand1 = get(offset + 1, operation[2], data)
  const operand2 = get(offset + 2, operation[1], data)

  if (operation[0] === "1") {
    throw `Write parameter cannot be immediate mode: ${operation}`
  }

  let output = f(operand1, operand2)
  let outputIndex = data[offset + 3]

  data[outputIndex] = output
}

function add(operation: string, offset: number, data: number[]) {
  return math(operation, offset, data, (x, y) => x + y)
}

function multiply(operation: string, offset: number, data: number[]) {
  return math(operation, offset, data, (x, y) => x * y)
}

function input(operation: string, offset: number, data: number[]) {
  const operand1 = data[offset + 1]
  const input = readline.question("Input please\n")
  data[operand1] = Number.parseInt(input)
}

function output(operation: string, offset: number, data: number[]) {
  const operand1 = get(offset + 1, operation[2], data)
  console.log(operand1)
}

function jumpIfTrue(operation: string, offset: number, data: number[]): number | null {
  const operand1 = get(offset + 1, operation[2], data)
  if (operand1 === 0) {
    return null
  }
  return get(offset + 2, operation[1], data)
}

function jumpIfFalse(operation: string, offset: number, data: number[]) {
  const operand1 = get(offset + 1, operation[2], data)
  if (operand1 !== 0) {
    return null
  }
  return get(offset + 2, operation[1], data)
}

function lessThan(operation: string, offset: number, data: number[]) {
  math(operation, offset, data, (x, y) => x < y ? 1 : 0)
}

function equal(operation: string, offset: number, data: number[]) {
  math(operation, offset, data, (x, y) => x === y ? 1 : 0)
}

function processOperation(offset: number, data: number[]): (number | null) {
  const operation = data[offset].toString().padStart(5, "0")
  const code = operation[3] + operation[4]
  switch (code) {
    case "01":
      add(operation, offset, data)
      return offset + 4
    case "02":
      multiply(operation, offset, data)
      return offset + 4
    case "03":
      input(operation, offset, data)
      return offset + 2
    case "04":
      output(operation, offset, data)
      return offset + 2
    case "05":
      const trueOffset = jumpIfTrue(operation, offset, data)
      if (trueOffset === null) {
        return offset + 3
      }
      return trueOffset
    case "06":
      const falseOffset = jumpIfFalse(operation, offset, data)
      if (falseOffset === null) {
        return offset + 3
      }
      return falseOffset
    case "07":
      lessThan(operation, offset, data)
      return offset + 4
    case "08":
      equal(operation, offset, data)
      return offset + 4
    case "99":
      return null
    default: throw `Unknown opcode: ${operation}`
  }
}

function run(data: number[]): number[] {
  let offset = 0
  do {
    const valuesHandled = processOperation(offset, data)
    if (valuesHandled == null) {
      break;
    }
    offset = valuesHandled
  }
  while (offset < data.length)
  return data
}

function parse(input: string): number[] {
  return input.split(',').map(s => Number.parseInt(s))
}

export function main() {
  const data = parse(bigInput)
  run(data)
}
