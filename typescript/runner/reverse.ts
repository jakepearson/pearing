function reverse(x: number): number {
  var sign = x < 0 ? -1 : 1
  const maxInteger =  2147483647

  x *= sign

  if (x > maxInteger) {
    return 0
  }

  var result = 0;
  while(x > 0) {
    result = result * 10 + x % 10
    x = Math.floor(x/10)
  }

  if (result > maxInteger) {
    return 0
  }

  return result * sign;
}

export function main() {
  console.log(123, reverse(123))
  console.log(-123, reverse(-123))
  console.log(1534236469, reverse(1534236469))
}