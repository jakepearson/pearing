interface Route {
  route: number[]
  value: number
  weight: number
}

function optimizeBackpack(cache: Map<number, Route>, weights: number[], values: number[], weightLimit: number, index: number = 0): Route {
  if (cache.has(index)) {
    return cache.get(index);
  }
  if (index >= weights.length || weightLimit <= 0) {
    return {
      route: [],
      value: 0,
      weight: 0,
    };
  }

  const weightWithCurrent = optimizeBackpack(cache, weights, values, weightLimit - weights[index], index + 1);
  weightWithCurrent.value += values[index];
  weightWithCurrent.weight += weights[index];
  weightWithCurrent.route.unshift(index);

  const weightWithoutCurrent = optimizeBackpack(cache, weights, values, weightLimit, index + 1);

  let result: Route;
  if (weightWithCurrent.value > weightWithoutCurrent.value || weightWithCurrent.weight > weightLimit) {
    result = weightWithCurrent;
  } else {
    result = weightWithoutCurrent;
  }
  console.log(`${index}:${JSON.stringify(weightWithCurrent)}`);
  cache.set(index, result);
  return result;
}

export function main() {
  const result = optimizeBackpack(
    new Map<number, Route>(),
    [4, 8, 3, 5, 2],
    [5, 10, 3, 2, 3],
    10,
  );
  console.log(result);
}
