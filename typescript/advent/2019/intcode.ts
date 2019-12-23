function get(operationPointer: number, parameterOffset: number, mode: string, data: number[]): number {
  switch (mode) {
    case "0":
      return data[data[operationPointer + parameterOffset]]
    case "1":
      return data[operationPointer + parameterOffset]
    default:
      throw "Unknown addressing mode"
  }
}

function set(value: number, offset: number, data: number[]) {
  data[offset] = value
}

function math(operation: string, offset: number, data: number[], f: (x: number, y: number) => number) {
  const operand1 = get(offset, 1, operation[2], data)
  const operand2 = get(offset, 2, operation[1], data)

  if (operation[0] === "1") {
    throw `Write parameter cannot be immediate mode: ${operation}`
  }

  let output = f(operand1, operand2)
  let outputIndex = get(offset, 3, "1", data)

  set(output, outputIndex, data)
}

function add(operation: string, offset: number, data: number[]) {
  return math(operation, offset, data, (x, y) => x + y)
}

function multiply(operation: string, offset: number, data: number[]) {
  return math(operation, offset, data, (x, y) => x * y)
}

function input(operation: string, offset: number, data: number[], inputData: number[]) {
  const operand1 = get(offset, 1, "1", data)
  const input = inputData.shift().toString()
  set(Number.parseInt(input), operand1, data)
}

function output(operation: string, offset: number, data: number[], outputData: number[]) {
  const operand1 = get(offset, 1, operation[2], data)
  outputData.push(operand1)
}

function setOffset(operation: string, offset: number, data: number[]): number {
  return get(offset, 1, operation[2], data)
}

function jumpIfTrue(operation: string, offset: number, data: number[]): number | null {
  const operand1 = get(offset, 1, operation[2], data)
  if (operand1 === 0) {
    return null
  }
  return get(offset, 2, operation[1], data)
}

function jumpIfFalse(operation: string, offset: number, data: number[]) {
  const operand1 = get(offset, 1, operation[2], data)
  if (operand1 !== 0) {
    return null
  }
  return get(offset, 2, operation[1], data)
}

function lessThan(operation: string, offset: number, data: number[]) {
  math(operation, offset, data, (x, y) => x < y ? 1 : 0)
}

function equal(operation: string, offset: number, data: number[]) {
  math(operation, offset, data, (x, y) => x === y ? 1 : 0)
}

function processOperation(offset: number, data: number[], inputData: number[], outputData: number[]): (number | null) {
  const operation = get(offset, 0, "1", data).toString().padStart(5, "0")
  const code = operation[3] + operation[4]
  switch (code) {
    case "01":
      add(operation, offset, data)
      return offset + 4
    case "02":
      multiply(operation, offset, data)
      return offset + 4
    case "03":
      input(operation, offset, data, inputData)
      return offset + 2
    case "04":
      output(operation, offset, data, outputData)
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

export function run(data: number[], input: number[]): number[] {
  let offset = 0
  let output: number[] = []
  do {
    const newOffset = processOperation(offset, data, input, output)
    if (newOffset == null) {
      break;
    }
    offset = newOffset

  }
  while (offset < data.length)

  return output
}

export function parse(input: string): number[] {
  return input.split(',').map(s => Number.parseInt(s))
}
