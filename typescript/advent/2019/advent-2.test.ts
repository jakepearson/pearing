import * as intcode from './intcode'



function validate(program: string, input: number[], expectedOutput: number[]): number[] {
  const io = new intcode.SimpleInputOutput()
  io.inputData = input

  const data = intcode.parse(program)
  const output = intcode.run(data, io)
  expect(io.outputData).toStrictEqual(expectedOutput)
  return data
}

test('add (position mode)', () => {
  const data = "1,0,0,0,4,0,99"
  validate(data, [], [2])
})

test('add (position mode 2)', () => {
  const data = "1,1,1,4,99,5,6,0,4,0,4,4,99"
  validate(data, [], [30, 2])
})

test("multiply (position mode)", () => {
  const data = "2,6,6,7,4,7,99,0"
  validate(data, [], [9801])
})

test("equal (position mode)", () => {
  const data = "3,9,8,9,10,9,4,9,99,-1,8"
  validate(data, [8], [1])
  validate(data, [2], [0])
})

test("less than (position mode)", () => {
  const data = "3,9,7,9,10,9,4,9,99,-1,8"
  validate(data, [7], [1])
  validate(data, [8], [0])
})

test("equals (immediate mode)", () => {
  const data = "3,3,1108,-1,8,3,4,3,99"
  validate(data, [8], [1])
  validate(data, [2], [0])
})

test("less than (immediate mode)", () => {
  const data = "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9"
  validate(data, [0], [0])
  validate(data, [12], [1])
})

test("jump (immediate mode)", () => {
  const data = "3,3,1105,-1,9,1101,0,0,12,4,12,99,1"
  validate(data, [0], [0])
  validate(data, [12], [1])
})
