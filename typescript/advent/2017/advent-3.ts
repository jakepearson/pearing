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
  { input: 347991, expected: 480 },
];

function getMiddles(radius: number): number[] {
  const result: number[] = [];
  const edge = radius * 2;
  const start = (edge + 1) ** 2 - radius;
  for (let i = 0; i < 4; i++) {
    result.push(start - i * edge);
  }
  return result;
}

function getCorners(radius: number): number[] {
  const result: number[] = [];
  const edge = radius * 2;
  const start = (edge + 1) ** 2;
  for (let i = 0; i < 4; i++) {
    result.push(start - i * edge);
  }
  return result;
}

function getRadius(input: number) {
  return Math.floor(Math.ceil(Math.sqrt(input)) / 2);
}

function distance(input: number): number {
  const distanceToRing = getRadius(input);
  const middles = getMiddles(distanceToRing);
  let distanceToMiddle = Number.MAX_SAFE_INTEGER;
  middles.forEach((middle) => {
    const difference = Math.abs(middle - input);
    if (difference < distanceToMiddle) {
      distanceToMiddle = difference;
    }
  });
  return distanceToRing + distanceToMiddle;
}

function coordinatesAt(input: number): number[] {
  const radius = getRadius(input);
  const corners = getCorners(radius);
  if (input > corners[1]) {
    return [radius - corners[0] + input, -radius];
  }
  if (input > corners[2]) {
    return [-radius, -radius + corners[1] - input];
  }
  if (input > corners[3]) {
    return [-radius + corners[2] - input, radius];
  }
  return [radius, radius - corners[3] + input];
}

function part1() {
  cases.forEach((c) => {
    const result = distance(c.input);
    const success = result === c.expected ? 'Good' : 'Bad ';
    console.log(`${success}: ${c.input}, wanted: ${c.expected} but was: ${result}`);
  });
}

function test(input: number) {
  console.log(`${input} ${coordinatesAt(input)}`);
}

function getAt(state: Map<string, number>, x: number, y: number): number {
  const key = `${x}-${y}`;
  const result = state.get(key) || 0;
  return result;
}

function sumAt(state: Map<string, number>, x: number, y: number) {
  const sum = getAt(state, x + 1, y)
    + getAt(state, x + 1, y + 1)
    + getAt(state, x, y + 1)
    + getAt(state, x - 1, y + 1)
    + getAt(state, x - 1, y)
    + getAt(state, x - 1, y - 1)
    + getAt(state, x, y - 1)
    + getAt(state, x + 1, y - 1);
  return sum;
}

function part2(input: number) {
  const state = new Map<string, number>();
  state.set('0-0', 1);
  let sum = 1;
  let counter = 2;
  while (sum <= input) {
    const coordinates = coordinatesAt(counter);
    const x = coordinates[0];
    const y = coordinates[1];
    sum = sumAt(state, x, y);
    state.set(`${x}-${y}`, sum);
    counter++;
  }
  console.log(sum);
}

export function main() {
  // part1();
  part2(347991);
}
