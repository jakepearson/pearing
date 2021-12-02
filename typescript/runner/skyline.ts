interface Building {
  left: number
  right: number
  height: number
}

interface Point {
  x: number
  y: number
}

function heightAtX(buildings: Building[], x: number): number {
  let result = 0;
  for (const building of buildings) {
    if (building.left <= x && building.right > x && building.height > result) {
      result = building.height;
    }
  }
  return result;
}

function criticalPoints(buildings: Building[]): number[] {
  const result = new Set<number>();
  for (const building of buildings) {
    result.add(building.left);
    result.add(building.right);
  }
  return Array.from(result).sort((a, b) => a - b);
}

function getSkylineWithBuildings(buildings: Building[]): Point[] {
  const allPoints: Point[] = [];
  for (const x of criticalPoints(buildings)) {
    const y = heightAtX(buildings, x);
    if (allPoints.length === 0 || y !== allPoints[allPoints.length - 1].y) {
      allPoints.push({ x, y });
    }
  }
  return allPoints;
}

function toBuilding(input: number[]) {
  return {
    left: input[0],
    right: input[1],
    height: input[2],
  };
}

function getSkyline(data: number[][]): Point[] {
  const buildings = data.map(toBuilding);
  return getSkylineWithBuildings(buildings);
}

export function main() {
  const data = [[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]];
  console.log(getSkyline(data));
}
