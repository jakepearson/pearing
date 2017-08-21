function cellValue(row: number, column: number, matrix: number[][]): number {
  for (let i = row; i >= 0; i--) {
    if(matrix[i][column] === 0) {
      return 0;
    }
  }
  return matrix[row][column];
}

function matrixElementsSum(matrix: number[][]): number {
  let result = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[row].length; column++) {
      result += cellValue(row, column, matrix);
    }
  }
  return result;
}

//console.log(almostIncreasingSequence([1, 3, 2]));
//console.log(almostIncreasingSequence([1, 2, 1, 2]));
//console.log(almostIncreasingSequence([1, 3, 2, 1]));
//console.log(almostIncreasingSequence([5, 1, 2, 3]));
//console.log(almostIncreasingSequence([1, 1, 1, 2, 3]));
console.log(matrixElementsSum([[0,1,1,2], 
 [0,5,0,0], 
 [2,0,3,3]]));