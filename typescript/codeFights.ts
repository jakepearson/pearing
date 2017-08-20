import { assert } from 'chai';

function makeArrayConsecutive2(statues: number[]): number {
  let keys: { [id: number]: boolean } = {};
  let max = statues[0];
  let min = statues[0];
  statues.forEach(size => {
    if (size > max) max = size;
    if (size < min) min = size;
    keys[size] = true;
  });
  let result = 0;
  for (let i = min; i <= max; i++) {
    if (!keys[i]) {
      result++;
    }
  }
  return result;
}

// function almostIncreasingSequence(sequence: number[]): boolean {
//   console.log("Starting")
//   let errors = 0;
//   let current = sequence[0];
//   for (let i = 0; i < sequence.length - 1; i++) {
//     console.log(sequence[i] + " " + sequence[i + 1] + " " + sequence[i + 2] + ":" + current);
//     if (sequence[i] < sequence[i + 1]) {
//       console.log("Good");
//       current = sequence[i+1];
//     } else if (i === sequence.length - 2 && sequence[i] < sequence[i + 1] - 1) {
//       console.log("Last");
//       errors++;
//     } else if (current < (sequence[i + 2] - 1)) {
//       console.log("C");
//       errors++;
//       if(i === 0 && errors === 1) {
//         console.log("2nd chance");
//         current = sequence[i+1];
//         //continue;
//       } else {
//         return false;
//       }
//     } else {
//       errors++;
//       console.log("F");
//     }
//   }

//   return errors <= 1;
// }

// function strictlyIncreasingSequence(sequence: number[], skipIndex: number): boolean {
//   let current = 0;
//   let next = 1;
//   if (skipIndex === 0) {
//     current = 1;
//     next = 2;
//   } else if (skipIndex === 1) {
//     next = 2;
//   }

//   while (current < sequence.length - 1) {
//     if (sequence[current] >= sequence[next]) {
//       return false;
//     }
//     current++;
//     next++;
//     if (skipIndex === current) {
//       current++;
//       next++;
//     } else if (skipIndex === 1) {
//       next = 2;
//     }
//   }
//   return true;
// }

// function almostIncreasingSequence(sequence: number[]): boolean {
//   for (let i = 0; i < sequence.length; i++) {
//     if (strictlyIncreasingSequence(sequence, i)) {
//       return true;
//     }
//   }
//   return false;
// }

// function almostIncreasingSequence(sequence: number[]): boolean {
//   let foundProblem = false;
//   for (let i = 0; i < sequence.length - 1; i++) {
//     if (sequence[i] >= sequence[i + 1]) {
//       if (sequence[i] < sequence[i + 2]) {
//         if (foundProblem) {
//           return false;
//         }
//         foundProblem = true;
//       } else {
//         return false;
//       }
//     }
//   }
//   return true;
// }

function almostIncreasingSequence(sequence: number[]): boolean {
  let strikes = 0;
  let max = -100000000;
  let secondMax = -100000000;

  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] > max) {
      secondMax = max;
      max = sequence[i];
    }
    else if (sequence[i] > secondMax) {
      max = sequence[i];
      strikes++;
    }
    else {
      strikes++;
    }
  }

  return strikes < 2;
}

function cellValue(row: number, column: number, matrix: number[][]): number {
  for (let i = row; i >= 0; i--) {
    if(matrix[row][i] === 0) {
      return 0;
    }
  }
  return matrix[row][column];
}

function matrixElementsSum(matrix: number[][]): number {
  let result = 0;
  for (let column = 0; column < matrix.length; column++) {
    for (let row = 0; row < matrix[column].length; row++) {
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