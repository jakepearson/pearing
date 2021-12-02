function largestRectangleArea(input: number[]): number {
  let maxArea = 0;
  for (let i = 0; i < input.length; i++) {
    const height = input[i];
    let lookahead = i;
    let lookback = i;
    while (lookahead < (input.length - 1) && input[lookahead + 1] >= height) {
      lookahead++;
    }
    while (lookback > 0 && input[lookback - 1] >= height) {
      lookback--;
    }
    const area = height * (lookahead - lookback + 1);
    // console.log(lookback + ":" + lookahead + ":" + height + ":" + area)
    if (area > maxArea) {
      maxArea = area;
    }
  }
  return maxArea;
}

export function main() {
  console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]));
  console.log(largestRectangleArea([2, 1, 2]));
}
