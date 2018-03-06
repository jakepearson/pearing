import * as Collections from 'typescript-collections';

function maxProfit(quotes: number[]): number {
  let maxProfit = 0
  let minPrice = quotes[0]
  for (let i = 0; i < quotes.length; i++) {
    if (quotes[i] < minPrice) {
      minPrice = quotes[i]
    }
    const profit = quotes[i] - minPrice
    if (profit > maxProfit) {
      maxProfit = profit
    }
  }
  return maxProfit
}

export function main() {
  const input = [7, 1, 5, 3, 6, 4]
  console.log(maxProfit(input))
}