function allLongestStrings(inputArray: string[]): string[] {
  let result: string[];
  let maxLength = -1;
  for(let i=0; i<inputArray.length; i++) {
    let current = inputArray[i];
    if(current.length > maxLength) {
      result = [];
      maxLength = current.length;
    }
    if(current.length === maxLength) {
      result.push(current);
    }
  }
  return result;
}
