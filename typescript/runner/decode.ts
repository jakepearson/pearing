function isDigit(input: string, index: number): boolean {
  const code = input.charCodeAt(index)
  return code >= "0".charCodeAt(0) && code <= "9".charCodeAt(0)
}

function isLetter(input: string, index: number): boolean {
  const code = input.charCodeAt(index)
  return code >= "a".charCodeAt(0) && code <= "z".charCodeAt(0)
}

function decodeString(input: string, index: number = 0): string {
  let result = ""
  while (index < input.length && input[index] != "]") {
    let numberString = ""
    while (isDigit(input, index)) {
      numberString += input[index]
      index++
    }
    if (numberString.length === 0) {
      result += input[index]
      index++
    } else {
      const number = parseInt(numberString)
      index++ // skip left bracket
      result += decodeString(input, index).repeat(number)
    }
  }
  return result
}

export function main() {
  console.log(decodeString("3[a]2[bc]"))
} 