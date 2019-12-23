import * as intcode from './intcode'

test('add', () => {
  const program = intcode.parse("1,0,0,0,99")
  intcode.run(program)
  expect(program[0]).toEqual(2)
})

test("x", () => {
  expect(0).toEqual(0)
})