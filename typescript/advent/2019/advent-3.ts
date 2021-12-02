import * as util from '../util';

const tinyInput = 'R8,U5,L5,D3\nU7,R6,D4,L4';
const mediumInput = 'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83';
const bigInput = util.read(`${__dirname}/advent-3.txt`);

function getKey(x: number, y: number): string {
  return `${x}:${y}`;
}

function traceRoute(input: string): Map<string, number> {
  const result = new Map<string, number>();
  let x = 0;
  let y = 0;
  let counter = 0;
  input.split(',').forEach((action) => {
    const direction = action[0];
    const distance = Number.parseInt(action.slice(1));
    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case 'U': y++; break;
        case 'D': y--; break;
        case 'R': x++; break;
        case 'L': x--; break;
      }
      counter++;
      result.set(getKey(x, y), counter);
    }
  });

  return result;
}

function findIntersections(left: Map<string, number>, right: Map<string, number>): Map<string, number> {
  const result = new Map<string, number>();
  left.forEach((value, key) => {
    if (right.has(key)) {
      result.set(key, value + right.get(key));
    }
  });
  return result;
}

function distanceToOrigin(key: string): number {
  const parts = key.split(':');
  const x = Number.parseInt(parts[0]);
  const y = Number.parseInt(parts[1]);

  return Math.abs(x) + Math.abs(y);
}

function shortestDistance(intersections: Map<string, number>): number {
  let result = Number.MAX_SAFE_INTEGER;
  intersections.forEach((value, key) => {
    const distance = value;
    if (distance < result) {
      result = distance;
    }
  });
  return result;
}

function solve(input: string): number {
  const parts = input.split('\n');
  const left = traceRoute(parts[0]);
  const right = traceRoute(parts[1]);
  const intersections = findIntersections(left, right);
  return shortestDistance(intersections);
}

export function main() {
  console.log(solve(tinyInput));
  console.log(solve(mediumInput));
  console.log(solve(bigInput));
}
