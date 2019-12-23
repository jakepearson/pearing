import * as util from '../util'
import * as readline from 'readline-sync'

function get(offset: number, mode: string, data: number[]): number {
  //console.log(offset, mode)
  switch (mode) {
    case "0":
      return data[data[offset]]
    case "1":
      return data[offset]
    case "2":
      return data[data[offset + globalOffset]]
    default:
      throw "Unknown addressing mode"
  }
}

function set(value: number, offset: number, data: number[]) {
  console.log("set: " + value)
  data[offset] = value
}

function math(operation: string, offset: number, data: number[], f: (x: number, y: number) => number) {
  const operand1 = get(offset + 1, operation[2], data)
  const operand2 = get(offset + 2, operation[1], data)

  if (operation[0] === "1") {
    throw `Write parameter cannot be immediate mode: ${operation}`
  }

  let output = f(operand1, operand2)
  let outputIndex = get(offset + 3, "1", data)

  set(output, outputIndex, data)
}

function add(operation: string, offset: number, data: number[]) {
  return math(operation, offset, data, (x, y) => x + y)
}

function multiply(operation: string, offset: number, data: number[]) {
  return math(operation, offset, data, (x, y) => x * y)
}

function input(operation: string, offset: number, data: number[]) {
  const operand1 = get(offset + 1, "1", data)
  const input = globalInputs.shift().toString()//readline.question("Input please\n")
  set(Number.parseInt(input), operand1, data)
}

function output(operation: string, offset: number, data: number[]) {
  const operand1 = get(offset + 1, operation[2], data)
  globalOutput = operand1
  console.log(operand1)
}

function setOffset(operation: string, offset: number, data: number[]) {
  globalOffset = get(offset + 1, operation[2], data)
  console.log("setOffset: " + globalOffset)
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
  const operation = get(offset, "1", data).toString().padStart(5, "0")
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
    case "09":
      setOffset(operation, offset, data)
      return offset + 2
    case "99":
      return null
    default: throw `Unknown opcode: ${operation}`
  }
}

export function run(data: number[]): number[] {
  let offset = 0
  do {
    const newOffset = processOperation(offset, data)
    if (newOffset == null) {
      break;
    }
    offset = newOffset

  }
  while (offset < data.length)
  return data
}

export function parse(input: string): number[] {
  return input.split(',').map(s => Number.parseInt(s))
}

const smallInput = "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99"
const small2 = "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0"
const small3 = "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0"
const bigInput = util.read(`${__dirname}/advent-7.txt`)

let globalInputs: number[] = []
let globalOutput: number
let globalOffset: number

export function main() {
  run(parse(smallInput))
}
