import * as util from '../util'

const bigInput = util.read(`${__dirname}/advent-1.txt`)

function calculateFuelRequirements(mass: number): number {
  return Math.floor(mass / 3) - 2
}

function calculateFuelRequirementsFancy(mass: number): number {
  let total = 0
  let next = calculateFuelRequirements(mass)
  while (next > 0) {
    total += next
    next = calculateFuelRequirements(next)
  }
  return total
}

export function main() {
  let total = 0
  bigInput.split(util.delimiter).forEach(l => {
    let mass = Number.parseInt(l)
    total += calculateFuelRequirements(mass)
  })
  console.log(total)

  total = 0
  bigInput.split(util.delimiter).forEach(l => {
    let mass = Number.parseInt(l)
    total += calculateFuelRequirementsFancy(mass)
  })
  console.log(total)

}
