import * as util from '../util'
import * as readline from 'readline-sync'

const smallInput = "1,1,1,4,99,5,6,0,99"
const reallySmall = "1,0,0,0,99"
const bigInput = util.read(`${__dirname}/advent-5.txt`)

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
  const operand1 = data[offset + 1]//get(offset + 1, operation[2], data)
  const input = "1"
  data[operand1] = Number.parseInt(input)
}

function output(operation: string, offset: number, data: number[]) {
  const operand1 = get(offset + 1, operation[2], data)
  console.log(operand1)
}

function processOperation(offset: number, data: number[]): number {
  const operation = data[offset].toString().padStart(5, "0")
  const code = operation[3] + operation[4]
  switch (code) {
    case "01":
      add(operation, offset, data)
      return 4
    case "02":
      multiply(operation, offset, data)
      return 4
    case "03":
      input(operation, offset, data)
      return 2
    case "04":
      output(operation, offset, data)
      return 2
    case "99":
      return -1
    default: throw `Unknown opcode: ${operation}`
  }
}

function run(data: number[]): number[] {
  let offset = 0
  do {
    const valuesHandled = processOperation(offset, data)
    if (valuesHandled == -1) {
      break;
    }
    offset += valuesHandled
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
