/* eslint-disable linebreak-style */
function total(input: string): number {
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    result += parseInt(input[i], 10);
  }
  return result;
}

function isLucky(n: number): boolean {
  const nString = n.toString();
  return total(nString.substr(0, nString.length / 2)) === total(nString.substr(nString.length / 2));
}

console.log(isLucky(1230));
