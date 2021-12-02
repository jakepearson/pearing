/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
// Consider a "word" as any sequence of capital letters A-Z (not limited to just "dictionary words").
// For any word with at least two different letters, there are other words composed of the same letters
// but in a different order (for instance, STATIONARILY/ANTIROYALIST, which happen to both be dictionary words;
// for our purposes "AAIILNORSTTY" is also a "word" composed of the same letters as these two).
// We can then assign a number to every word, based on where it falls in an alphabetically sorted list of
// all words made up of the same set of letters. One way to do this would be to generate the entire list of words and find the desired one, but this would be slow if the word is long.
// Write a program which takes a word as a command line argument and prints to standard output its number.
// Do not use the method above of generating the entire list.
// Your program should be able to accept any word 25 letters or less in length (possibly with some letters repeated),
// and should use no more than 1 GB of memory and take no more than 500 milliseconds to run. Any answer we check will fit in a 64-bit integer.
// Sample words, with their rank:
// ABAB = 2
// AAAB = 1
// BAAA = 4
// QUESTION = 24572
// BOOKKEEPER = 10743
function toLetterMap(input: string) {
  const letterMap: { [id: string]: number } = {};
  for (let i = 0; i < input.length; i++) {
    const letter = input[i];
    if (!letterMap[letter]) {
      letterMap[letter] = 0;
    }
    letterMap[letter]++;
  }
  return letterMap;
}
function getLetterPosition(letter: string, letters: { [id: string]: number }): number {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let result = 0;
  for (let i = 0; i < alphabet.length; i++) {
    const current = alphabet[i];
    if (letters[current]) {
      result++;
    }
    if (current === letter) {
      break;
    }
  }
  return result - 1;
}
function removeLetter(letter: string, letters: { [id: string]: number }) {
  letters[letter]--;
  if (letters[letter] === 0) {
    delete letters[letter];
  }
}
function stringToNumber(input: string): number {
  const letters = toLetterMap(input);
  console.log(letters);
  let result = 0;
  for (let i = input.length - 1; i >= 0; i--) {
    const uniqueLetters = Object.keys(letters).length;
    const place = input.length - i;
    const letter = input[i];
    const letterPosition = getLetterPosition(letter, letters);
    const value = letterPosition * place ** uniqueLetters;
    console.log(`${letter}, ${letterPosition}:${uniqueLetters}, ${value}, ${place}`);
    result += value;
    // removeLetter(letter, letters);
  }
  return result;
}
function validate(input: string, expected: number) {
  const actual = stringToNumber(input);
  const correct = expected === actual;
  console.log(`${input}=${correct} actual=${actual} expected=${expected}`);
}
validate('ABAB', 2);
validate('AAAB', 1);
validate('BAAA', 4);
