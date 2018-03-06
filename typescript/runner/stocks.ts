//import * as Collections from 'typescript-collections';

function maxProfit(maxTrades: number, quotes: number[]): number {
  const trades: number[] = []

  let maxProfit = 0
  let peakIndex = 0
  let valleyIndex = 0
  for (let i = 0; i < quotes.length; i++) {
    while (i < quotes.length - 1 && quotes[i + 1] < quotes[i]) {
      i++
    }
    valleyIndex = i
    peakIndex = i

    while (i < quotes.length - 1 && quotes[i + 1] > quotes[i]) {
      i++
    }
    peakIndex = i
    const profit = quotes[peakIndex] - quotes[valleyIndex]
    trades.push(profit)
    peakIndex = i
    valleyIndex = i
  }
  trades.sort((t1, t2) => t2 - t1)
  for (let i = 0; i < 2; i++) {
    maxProfit += trades[i]
  }
  return maxProfit
}

export function main() {
  const input = [5, 2, 3, 4, 2, 5, 1, 5]
  console.log(maxProfit(2, input))
}