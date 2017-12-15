function almostIncreasingSequence(sequence: number[]): boolean {
  let errors = 0;
  for(let i=0; i<sequence.length - 2; i++) {
    const current = sequence[i];
    const next = sequence
    if(sequence[i] === sequence[i+1] + 1) {
      console.log("A");
      //good
    } else if(sequence[i] === sequence[i+1] + 1) {
      console.log("B");
      errors++;
    } else {
      console.log("C");
      return false;
    }
  }
  return errors <= 1;
}
  
const test = [1, 2, 3];
console.log(almostIncreasingSequence(test));