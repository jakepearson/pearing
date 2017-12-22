import * as advent1 from './advent/advent-1';
import * as advent2 from './advent/advent-2';
import * as advent3 from './advent/advent-3';
import * as advent4 from './advent/advent-4';
import * as advent5 from './advent/advent-5';
import * as advent6 from './advent/advent-6';
import * as advent8 from './advent/advent-8';
import * as advent16 from './advent/advent-16';
import * as advent17 from './advent/advent-17';

function main() {
  switch (process.argv[2]) {
    case "1": return advent1.main();
    case "2": return advent2.main();
    case "3": return advent3.main();
    case "4": return advent4.main();
    case "5": return advent5.main();
    case "6": return advent6.main();
    case "8": return advent8.main();
    case "16": return advent16.main();
    case "17": return advent17.main();
    default: throw new Error("You're not on the list")
  }
}

main();
