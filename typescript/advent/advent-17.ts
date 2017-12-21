function spin(step: number): number {
  const buffer: number[] = []
  buffer.push(0)
  var currentIndex = 0
  for (var i = 1; i <= 10; i++) {
    currentIndex = (currentIndex + step) % (buffer.length + 1)
    buffer.splice(currentIndex, 0, i)
    console.log(currentIndex + ": " + buffer)
  }
  return buffer[(currentIndex + 1) % buffer.length]
}

export function main() {
  spin(3)
}