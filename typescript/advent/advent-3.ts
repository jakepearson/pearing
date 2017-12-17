type Case = {
  input: number;
  expected: number;
}

const cases: Case[] = [
  { input: 1, expected: 0 },
  { input: 12, expected: 3 },
  { input: 23, expected: 2 },
  { input: 29, expected: 4 },
  { input: 1024, expected: 31 },
  { input: 347991, expected: 480 }
]

function getMiddles(radius: number): number[] {
  const result: number[] = [];
  const edge = radius * 2;
  const start = Math.pow(edge + 1, 2) - radius;
  for (var i = 0; i < 4; i++) {
    result.push(start - i * edge);
  }
  return result;
}

function distance(input: number): number {
  const distanceToRing = Math.floor(Math.ceil(Math.sqrt(input)) / 2);
  const middles = getMiddles(distanceToRing);
  console.log("Distance for: " + input)
  console.log("  to middle: " + distanceToRing)
  console.log("  " + middles);
  var distanceToMiddle = Number.MAX_SAFE_INTEGER;
  middles.forEach(middle => {
    const difference = Math.abs(middle - input);
    if(difference < distanceToMiddle) {
      distanceToMiddle = difference;
      //console.log("  " + middle + "," + distanceToMiddle)
    }
  })
  return distanceToRing + distanceToMiddle;
}

export function main() {
  cases.forEach(c => {
    const result = distance(c.input);
    const success = result === c.expected ? "Good" : "Bad ";
    console.log(success + ": " + c.input + ", wanted: " + c.expected + " but was: " + result)
  })

}