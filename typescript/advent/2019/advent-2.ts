import * as util from '../util'

const smallInput = "1,1,1,4,99,5,6,0,99"
const reallySmall = "1,0,0,0,99"
const bigInput = util.read(`${__dirname}/advent-2.txt`)

function process(offset: number, data: number[]): boolean {
  let operation = data[offset]
  if (operation === 99) {
    return true
  }

  let operand1 = data[data[offset + 1]]
  let operand2 = data[data[offset + 2]]
  let output = 0
  if (operation === 1) {
    output = operand1 + operand2
  } else {
    output = operand1 * operand2
  }
  let outputIndex = data[offset + 3]
  data[outputIndex] = output

  return false
}

function run(data: number[]): number[] {
  let offset = 0
  while (!process(offset, data)) {
    offset += 4
  }
  return data
}

export function main() {
  let data = bigInput.split(',').map(s => Number.parseInt(s))

  for (let noun = 0; noun <= 100; noun++) {
    for (let verb = 0; verb <= 100; verb++) {
      let dataCopy = data.slice()

      dataCopy[1] = noun
      dataCopy[2] = verb

      run(dataCopy)
      if (dataCopy[0] === 19690720) {
        console.log(`noun:${noun}, verb:${verb}`)
        break
      }
    }
  }
}
