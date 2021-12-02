/* eslint-disable linebreak-style */
function doMath(operator: String, operand1: number, operand2: number): number {
  switch (operator) {
    case '+': return operand1 + operand2;
    case '-': return operand1 - operand2;
    case '*': return operand1 * operand2;
    case '/': return operand1 / operand2;
    default: throw new Error(`Undefined operator: ${operator}`);
  }
}

function evaluate(input: String): number {
  const tokens = input.split(' ');
  const stack: number[] = [];
  tokens.forEach((token) => {
    const parsedNumber = Number.parseInt(token, 10);
    if (Number.isInteger(parsedNumber)) {
      stack.push(parsedNumber);
    } else {
      if (stack.length < 2) {
        throw new Error('Stack does must have at least 2 values');
      }
      const operator = token;
      stack.push(doMath(operator, stack.pop(), stack.pop()));
    }
  });
  return stack.pop();
}

console.log(evaluate('1 2 + 4 *'));
