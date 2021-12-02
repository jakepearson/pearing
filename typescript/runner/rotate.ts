/* eslint-disable no-param-reassign */
function rotateDigit(input: number): number {
  switch (input) {
    case 0:
    case 1:
    case 8: return 0;
    case 2:
    case 5:
    case 6:
    case 9: return 1;
    default: return -1;
  }
}

function canRotate(input: number): boolean {
  let total = 0;
  while (input > 0) {
    const next = rotateDigit(input % 10);
    if (next < 0) {
      return false;
    }
    total += next;
    input = Math.floor(input / 10);
  }
  return total > 0;
}

function rotatedDigits(input: number): number {
  let result = 0;
  for (let i = 1; i <= input; i++) {
    if (canRotate(i)) {
      result++;
    }
  }
  return result;
}

export function main() {
  console.log(rotatedDigits(10));
}
