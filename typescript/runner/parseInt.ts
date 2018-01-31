function isDigit(c: string): boolean {
  const regex = /\d/
  return regex.test(c)
}

function charToDigit(c: string): number {
  return c.charCodeAt(0) - 48
}

function myAtoi(s: string): number {
  s = s.trim()
  var result = 0
  var sign = 1;
  var index = 0
  if(s[0] === "-") {
    sign = -1
    index++
  }
  if(s[0] === "+") {
    index++
  }
  while(isDigit(s[index]) && index<s.length) {
    result = result*10 + charToDigit(s[index])
    index++
  }
  return result * sign
}

function test(s: string) {
  console.log(`${s}: '${myAtoi(s)}'`)
}

export function main() {
  test("  +123")
  test("-1")
}