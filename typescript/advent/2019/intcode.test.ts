import * as intcode from './intcode'

function validate(program: string, input: number[], expectedOutput: number[]): number[] {
  const data = intcode.parse(program)
  const output = intcode.run(data, input)
  expect(output).toStrictEqual(expectedOutput)
  return data
}

test('add (position mode)', () => {
  const data = validate("1,0,0,0,4,0,99", [], [2])
})

test('add (position mode 2)', () => {
  validate("1,1,1,4,99,5,6,0,4,0,4,4,99", [], [30, 2])
})

test("multiply (position mode)", () => {
  validate("2,6,6,7,4,7,99,0", [], [9801])
})