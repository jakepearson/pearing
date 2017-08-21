function toLetters(input: string) {
  let letterMap: { [id: string]: number } = {};
  for (let i = 0; i < input.length; i++) {
    const letter = input[i];
    if (!letterMap[letter]) {
      letterMap[letter] = 0;
    }
    letterMap[letter]++;
  }
  return letterMap;
}

function commonCharacterCount(s1: string, s2: string): number {
  let letters = toLetters(s1);
  let result = 0;
  for(let i=0; i<s2.length; i++) {
    let letter = s2[i];
    if(letters[letter]) {
      letters[letter]--;
      result++;
      if(letters[letter] === 0) {
        delete letters[letter];
      }
    }
  }
  return result;
}

console.log(commonCharacterCount("zzz", "zzzzz"));