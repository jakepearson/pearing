import * as util from '../util'

const bigInput = util.read(`${__dirname}/advent-8.txt`)
const smallInput = "112230111222999990"

function count(input: string, match: string): number {
  return input.split(match).length - 1
}

function findColorAtPosition(data: string, x: number, y: number, width: number, height: number): string {
  let color = "2"
  let offset = y * width + x
  do {
    color = data[offset]
    offset += width * height
  }
  while (color === "2")
  return color
}

export function main() {
  const width = 25
  const height = 6
  for (let y = 0; y < height; y++) {
    let line = ""
    for (let x = 0; x < width; x++) {
      line += findColorAtPosition(bigInput, x, y, width, height)
    }
    console.log(line)
  }
}
