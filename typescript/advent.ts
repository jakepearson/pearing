import * as advent1 from './advent/advent-1';
import * as advent2 from './advent/advent-2';

function main() {
  switch (process.argv[2]) {
    case "1": return advent1.main();
    case "2": return advent2.main();
    default: throw new Error("You're not on the list")
  }
}

main();
