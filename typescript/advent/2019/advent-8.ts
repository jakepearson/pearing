import * as util from '../util'

const bigInput = util.read(`${__dirname}/advent-8.txt`)
const smallInput = "112230111222999990"

function count(input: string, match: string): number {
  return input.split(match).length - 1
}

function findColorAtPosition(data: string, x: number, y: number): number {
  do {

  }
}

export function main() {
  const pageSize = 25 * 6
  let offset = 0
  let lowest = Number.MAX_SAFE_INTEGER
  let result = 0
  while (offset < bigInput.length) {
    const page = bigInput.substring(offset, offset + pageSize)
    const zeroes = count(page, "0")
    if (zeroes < lowest) {
      result = count(page, "1") * count(page, "2")
      lowest = zeroes
    }
    offset += pageSize
  }
  console.log(result)
}
