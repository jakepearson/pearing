import * as util from "../util";
import * as intcode from "./intcode";

const smallInput = "1,1,1,4,99,5,6,0,99";
const reallySmall = "1,0,0,0,99";
const bigInput = util.read(`${__dirname}/advent-2.txt`);

export function main() {
  const data = intcode.parse(bigInput);

  for (let noun = 0; noun <= 100; noun++) {
    for (let verb = 0; verb <= 100; verb++) {
      const dataCopy = data.slice();

      dataCopy[1] = noun;
      dataCopy[2] = verb;

      // intcode.run(dataCopy, {});
      if (dataCopy[0] === 19690720) {
        console.log(`noun:${noun}, verb:${verb}`);
        break;
      }
    }
  }
}
