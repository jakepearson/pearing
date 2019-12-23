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

test("equal (position mode)", () => {
  validate("3,9,8,9,10,9,4,9,99,-1,8", [8], [1])
  validate("3,9,8,9,10,9,4,9,99,-1,8", [2], [0])
})

test("less than (position mode)", () => {
  validate("3,9,7,9,10,9,4,9,99,-1,8", [7], [1])
  validate("3,9,7,9,10,9,4,9,99,-1,8", [8], [0])
})

test("equals (immediate mode)", () => {
  validate("3,3,1108,-1,8,3,4,3,99", [8], [1])
  validate("3,3,1108,-1,8,3,4,3,99", [2], [0])
})

test("less than (immediate mode)", () => {
  validate("3,3,1107,-1,8,3,4,3,99", [7], [1])
  validate("3,3,1107,-1,8,3,4,3,99", [8], [0])
})