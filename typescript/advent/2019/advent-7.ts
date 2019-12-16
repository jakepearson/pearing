import * as util from '../util'
import * as readline from 'readline-sync'

const smallInput = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0"
const small2 = "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0"
const small3 = "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0"
const bigInput = util.read(`${__dirname}/advent-7.txt`)

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
  const input = globalInputs.shift().toString()//readline.question("Input please\n")
  data[operand1] = Number.parseInt(input)
}

function output(operation: string, offset: number, data: number[]) {
  const operand1 = get(offset + 1, operation[2], data)
  globalOutput = operand1
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

function getAllPermutations(input: string): string[] {
  var results: string[] = [];

  if (input.length === 1) {
    results.push(input);
    return results;
  }

  for (var i = 0; i < input.length; i++) {
    var firstChar = input[i];
    var charsLeft = input.substring(0, i) + input.substring(i + 1);
    var innerPermutations = getAllPermutations(charsLeft);
    for (var j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

let globalInputs: number[] = []
let globalOutput: number

function amplify(program: string, phases: string): number {
  let inputs = [...phases].map(l => Number.parseInt(l))
  let secondInput = 0
  inputs.forEach(input => {
    globalInputs = [input, secondInput]
    run(program.split(",").map(n => Number.parseInt(n)))
    secondInput = globalOutput
  })
  return secondInput
}

export function main() {
  let max = 0
  getAllPermutations("01234").forEach(p => {
    let result = amplify(bigInput, p)
    if (result > max) {
      max = result
    }
  })
  console.log(max)

  //console.log(amplify(small3, "10432"))
}
