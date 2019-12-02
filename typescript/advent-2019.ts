const advent2019Id = process.argv[2]
eval(`const advent = require("./advent/2019/advent-${advent2019Id}");advent.main()`)