function isValid(s: string): boolean {
  const stack: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const isLeft = c === '(' || c === '{' || c === '[';
    if (isLeft) {
      stack.push(c);
    } else {
      const right = stack.pop();
      if (c === ')' && right !== '(') { return false; }
      if (c === '}' && right !== '{') { return false; }
      if (c === ']' && right !== '[') { return false; }
    }
  }
  return true;
}

function test(s: string) {
  console.log(`${s}: ${isValid(s)}`);
}

export function main() {
  test('({[][]})');
  test('([)]');
}
