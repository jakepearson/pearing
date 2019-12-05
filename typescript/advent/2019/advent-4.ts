function isNotDecreasing(input: string): boolean {
  for (let i = 1; i < input.length; i++) {
    if (input[i - 1] > input[i]) {
      return false
    }
  }
  return true
}

function hasRepeatingDigits(input: string): boolean {

  for (let i = 1; i < input.length; i++) {
    if (input[i - 1] === input[i]) {
      let extraDigits = 0
      while (i !== input.length - 1 && input[i] === input[i + 1]) {
        i++
        extraDigits++
      }
      if (extraDigits === 0) {
        return true
      }
    }
  }
  return false
}

function valid(input: number): boolean {
  const inputString = input.toString()
  return isNotDecreasing(inputString) &&
    hasRepeatingDigits(inputString)
}

function totalMatches(start: number, end: number): number {
  let count = 0
  for (let i = start; i <= end; i++) {
    if (valid(i)) {
      count++
    }
  }
  return count
}

export function main() {
  console.log(totalMatches(284639, 748759))

  console.log(valid(112233))
  console.log(valid(123444))
  console.log(valid(111122))
}
